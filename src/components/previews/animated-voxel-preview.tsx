"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Grid } from "@react-three/drei"
import * as THREE from "three"
import { VoxelModel, VoxelBox } from "@/components/voxel-editor"
import { AnimationClip, getTransformAtTime, Transform } from "@/lib/animation"

interface AnimatedVoxelPreviewProps {
  voxelModel: VoxelModel | null
  primaryColor: string
  secondaryColor: string
  glowColor: string
  animation: AnimationClip | null
  isPlaying: boolean
  playbackSpeed?: number
  showGrid?: boolean
}

// Single animated voxel mesh with pivot-based rotation and per-voxel phase offset
function AnimatedVoxelMesh({ 
  box, 
  primaryColor, 
  secondaryColor, 
  glowColor,
  animation,
  time,
  pivot
}: { 
  box: VoxelBox
  primaryColor: string
  secondaryColor: string
  glowColor: string
  animation: AnimationClip | null
  time: number
  pivot: [number, number, number]
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const outerGroupRef = useRef<THREE.Group>(null)
  const pivotGroupRef = useRef<THREE.Group>(null)
  const innerGroupRef = useRef<THREE.Group>(null)
  
  // Determine color based on colorType
  const color = useMemo(() => {
    let baseColor: THREE.Color
    switch (box.colorType) {
      case "primary":
        baseColor = new THREE.Color(primaryColor)
        break
      case "secondary":
        baseColor = new THREE.Color(secondaryColor)
        break
      case "glow":
        baseColor = new THREE.Color(glowColor)
        break
      case "custom":
        baseColor = new THREE.Color(box.customColor || "#888888")
        break
      default:
        baseColor = new THREE.Color(primaryColor)
    }
    
    if (box.colorMultiplier !== 1) {
      baseColor.multiplyScalar(box.colorMultiplier)
    }
    
    return baseColor
  }, [box.colorType, box.customColor, box.colorMultiplier, primaryColor, secondaryColor, glowColor])
  
  const emissiveColor = useMemo(() => {
    if (!box.emissive) return new THREE.Color(0x000000)
    return color.clone()
  }, [box.emissive, color])

  // Calculate transform with per-voxel phase offset based on X position
  const groupTransform = useMemo(() => {
    if (!animation) return {}
    
    const groupName = box.group.toLowerCase()
    const isLimb = /leg|arm|hand|foot|paw|claw|wing/i.test(groupName)
    
    let phaseOffset = 0
    
    if (isLimb && animation.loop) {
      // Determine side based on this voxel's X position
      const voxelX = box.position[0]
      const threshold = 0.1
      const isRightSide = voxelX > threshold
      
      // Right side limbs are 180 degrees out of phase
      if (isRightSide) {
        phaseOffset = animation.duration * 0.5
      }
      
      // Arms swing opposite to legs on the same side
      if (/arm|hand/i.test(groupName) && !/wing/i.test(groupName)) {
        phaseOffset += animation.duration * 0.5
      }
    }
    
    // Sample the animation at the phase-offset time
    const effectiveTime = animation.loop 
      ? (time + phaseOffset) % animation.duration 
      : Math.min(time, animation.duration)
    
    return getTransformAtTime(animation, box.group, effectiveTime)
  }, [animation, time, box.group, box.position])

  // Apply group transform with pivot-based rotation
  // Structure: outerGroup(translation) -> pivotGroup(at pivot, rotation) -> innerGroup(offset from pivot)
  useEffect(() => {
    if (!outerGroupRef.current || !pivotGroupRef.current || !innerGroupRef.current) return
    
    // Reset transforms
    outerGroupRef.current.position.set(0, 0, 0)
    pivotGroupRef.current.position.set(0, 0, 0)
    pivotGroupRef.current.rotation.set(0, 0, 0)
    pivotGroupRef.current.scale.set(1, 1, 1)
    innerGroupRef.current.position.set(0, 0, 0)
    
    // Apply translation from animation (moves whole group)
    if (groupTransform.position) {
      outerGroupRef.current.position.set(...groupTransform.position)
    }
    
    // Move pivot group to the pivot point
    pivotGroupRef.current.position.set(...pivot)
    
    // Apply rotation at pivot
    if (groupTransform.rotation) {
      pivotGroupRef.current.rotation.set(...groupTransform.rotation)
    }
    
    // Apply scale at pivot
    if (groupTransform.scale) {
      pivotGroupRef.current.scale.set(...groupTransform.scale)
    }
    
    // Offset inner group back from pivot so mesh ends up in correct position
    innerGroupRef.current.position.set(-pivot[0], -pivot[1], -pivot[2])
    
  }, [groupTransform, pivot])

  return (
    <group ref={outerGroupRef}>
      <group ref={pivotGroupRef}>
        <group ref={innerGroupRef}>
          <group position={box.position as [number, number, number]}>
            <mesh
              ref={meshRef}
              scale={box.scale as [number, number, number]}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial 
                color={color} 
                emissive={emissiveColor}
                emissiveIntensity={box.emissiveIntensity || 0}
                metalness={0.3}
                roughness={0.7}
              />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

// Animated scene
function AnimatedScene({ 
  voxelModel, 
  primaryColor, 
  secondaryColor, 
  glowColor,
  animation,
  isPlaying,
  playbackSpeed = 1,
  showGrid
}: AnimatedVoxelPreviewProps) {
  const [time, setTime] = useState(0)
  
  // Calculate pivot points for each group (the point closest to body/origin where limb attaches)
  // Also calculate which side each group is on based on X position
  const { groupPivots, groupSides } = useMemo(() => {
    if (!voxelModel) return { groupPivots: {}, groupSides: {} }
    
    const pivots: Record<string, [number, number, number]> = {}
    const sides: Record<string, 'left' | 'right' | 'center'> = {}
    const groupBoxes: Record<string, VoxelBox[]> = {}
    
    // Group boxes by their group name
    for (const box of voxelModel.boxes) {
      if (!groupBoxes[box.group]) groupBoxes[box.group] = []
      groupBoxes[box.group].push(box)
    }
    
    // For each group, find the pivot point and determine side
    for (const [groupName, boxes] of Object.entries(groupBoxes)) {
      if (boxes.length === 0) continue
      
      const name = groupName.toLowerCase()
      
      // Calculate bounding box of the group
      let minX = Infinity, minY = Infinity, minZ = Infinity
      let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity
      
      for (const box of boxes) {
        const [x, y, z] = box.position
        const [sx, sy, sz] = box.scale
        minX = Math.min(minX, x - sx/2)
        maxX = Math.max(maxX, x + sx/2)
        minY = Math.min(minY, y - sy/2)
        maxY = Math.max(maxY, y + sy/2)
        minZ = Math.min(minZ, z - sz/2)
        maxZ = Math.max(maxZ, z + sz/2)
      }
      
      const centerX = (minX + maxX) / 2
      const centerY = (minY + maxY) / 2
      const centerZ = (minZ + maxZ) / 2
      
      // Determine side based on X position (negative X = left, positive X = right)
      // Use a threshold to avoid floating point issues
      const threshold = 0.1
      if (centerX < -threshold) {
        sides[groupName] = 'left'
      } else if (centerX > threshold) {
        sides[groupName] = 'right'
      } else {
        sides[groupName] = 'center'
      }
      
      // Also check name for explicit side designation
      if (/left|_l_|_l$/i.test(name)) {
        sides[groupName] = 'left'
      } else if (/right|_r_|_r$/i.test(name)) {
        sides[groupName] = 'right'
      }
      
      // Determine pivot based on limb type
      // Legs: pivot at TOP (hip attachment)
      if (/leg|thigh/i.test(name)) {
        pivots[groupName] = [centerX, maxY, centerZ]
      }
      // Feet: pivot at TOP (ankle attachment)
      else if (/foot|feet|paw|hoof/i.test(name)) {
        pivots[groupName] = [centerX, maxY, centerZ]
      }
      // Arms: pivot at TOP or INNER side (shoulder attachment)
      else if (/arm|bicep|forearm/i.test(name)) {
        pivots[groupName] = [centerX, maxY, centerZ]
      }
      // Hands: pivot at TOP (wrist attachment)
      else if (/hand|claw|fist/i.test(name)) {
        pivots[groupName] = [centerX, maxY, centerZ]
      }
      // Head: pivot at BOTTOM (neck attachment)
      else if (/head|face/i.test(name)) {
        pivots[groupName] = [centerX, minY, centerZ]
      }
      // Neck: pivot at BOTTOM (body attachment)
      else if (/neck/i.test(name)) {
        pivots[groupName] = [centerX, minY, centerZ]
      }
      // Tail: pivot at FRONT/body-side (base attachment)
      else if (/tail/i.test(name)) {
        pivots[groupName] = [centerX, centerY, maxZ]
      }
      // Wings: pivot at INNER side (body attachment)
      else if (/wing/i.test(name)) {
        if (sides[groupName] === 'left') {
          pivots[groupName] = [maxX, centerY, centerZ] // Right edge (towards body)
        } else if (sides[groupName] === 'right') {
          pivots[groupName] = [minX, centerY, centerZ] // Left edge (towards body)
        } else {
          pivots[groupName] = [centerX, centerY, centerZ]
        }
      }
      // Body and others: pivot at center
      else {
        pivots[groupName] = [centerX, centerY, centerZ]
      }
    }
    
    return { groupPivots: pivots, groupSides: sides }
  }, [voxelModel])
  
  // Animation loop
  useFrame((_, delta) => {
    if (!isPlaying || !animation) return
    
    setTime(prev => {
      const newTime = prev + delta * playbackSpeed
      if (animation.loop) {
        return newTime % animation.duration
      }
      return Math.min(newTime, animation.duration)
    })
  })
  
  // Reset time when animation changes
  useEffect(() => {
    setTime(0)
  }, [animation?.id])
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />
      <pointLight position={[0, 3, 0]} intensity={0.3} color="#00ffff" />
      
      {/* Grid */}
      {showGrid && (
        <Grid
          args={[10, 10]}
          position={[0, 0, 0]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#333355"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#4444aa"
          fadeDistance={15}
          infiniteGrid
        />
      )}
      
      {/* Render voxels with animation transforms */}
      {voxelModel?.boxes.map((box) => (
        <AnimatedVoxelMesh
          key={box.id}
          box={box}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          glowColor={glowColor}
          animation={animation}
          time={time}
          pivot={groupPivots[box.group] || [0, 0, 0]}
        />
      ))}
      
      <OrbitControls 
        target={[0, 1, 0]}
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={15}
      />
    </>
  )
}

export function AnimatedVoxelPreview({
  voxelModel,
  primaryColor,
  secondaryColor,
  glowColor,
  animation,
  isPlaying,
  playbackSpeed = 1,
  showGrid = true
}: AnimatedVoxelPreviewProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-900 to-gray-950 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [3, 3, 3], fov: 50 }}
        dpr={[1, 2]}
      >
        <AnimatedScene
          voxelModel={voxelModel}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          glowColor={glowColor}
          animation={animation}
          isPlaying={isPlaying}
          playbackSpeed={playbackSpeed}
          showGrid={showGrid}
        />
      </Canvas>
    </div>
  )
}
