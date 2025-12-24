"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Grid, Html } from "@react-three/drei"
import * as THREE from "three"
import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

interface VoxelPreviewProps {
  voxelModel: VoxelModel | null
  primaryColor: string
  secondaryColor: string
  glowColor: string
  size?: number
  selectedVoxelId: string | null
  onVoxelClick?: (id: string) => void
  showGrid?: boolean
  showAxes?: boolean
  autoRotate?: boolean
  flatLighting?: boolean
}

// Single voxel box mesh
function VoxelMesh({ 
  box, 
  primaryColor, 
  secondaryColor, 
  glowColor,
  isSelected,
  onClick,
  flatLighting = false
}: { 
  box: VoxelBox
  primaryColor: string
  secondaryColor: string
  glowColor: string
  isSelected: boolean
  onClick: () => void
  flatLighting?: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
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
    
    // Apply color multiplier
    if (box.colorMultiplier !== 1) {
      baseColor.multiplyScalar(box.colorMultiplier)
    }
    
    return baseColor
  }, [box.colorType, box.customColor, box.colorMultiplier, primaryColor, secondaryColor, glowColor])
  
  const emissiveColor = useMemo(() => {
    if (!box.emissive) return new THREE.Color(0x000000)
    return color.clone()
  }, [box.emissive, color])

  return (
    <group position={box.position as [number, number, number]}>
      <mesh
        ref={meshRef}
        scale={box.scale as [number, number, number]}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = "default"
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        {flatLighting ? (
          <meshBasicMaterial color={color} />
        ) : (
          <meshStandardMaterial 
            color={color} 
            emissive={emissiveColor}
            emissiveIntensity={box.emissiveIntensity || 0}
            metalness={0.3}
            roughness={0.7}
          />
        )}
      </mesh>
      
      {/* Selection/hover outline */}
      {(isSelected || hovered) && (
        <lineSegments scale={box.scale as [number, number, number]}>
          <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
          <lineBasicMaterial 
            color={isSelected ? "#00ffff" : "#ffffff"} 
            linewidth={2} 
          />
        </lineSegments>
      )}
      
      {/* Selection label */}
      {isSelected && (
        <Html
          position={[0, (box.scale[1] / 2) + 0.1, 0]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="bg-cyan-500/90 text-black text-xs px-2 py-0.5 rounded whitespace-nowrap font-mono">
            {box.name}
          </div>
        </Html>
      )}
    </group>
  )
}

// Auto-rotate camera component
function AutoRotate({ enabled }: { enabled: boolean }) {
  const { camera } = useThree()
  const angleRef = useRef(0)
  
  useFrame((_, delta) => {
    if (!enabled) return
    angleRef.current += delta * 0.5
    const radius = 5
    camera.position.x = Math.sin(angleRef.current) * radius
    camera.position.z = Math.cos(angleRef.current) * radius
    camera.lookAt(0, 1, 0)
  })
  
  return null
}

// 3D Scene contents
function VoxelScene({ 
  voxelModel, 
  primaryColor, 
  secondaryColor, 
  glowColor,
  selectedVoxelId,
  onVoxelClick,
  showGrid,
  showAxes,
  autoRotate,
  flatLighting
}: VoxelPreviewProps) {
  return (
    <>
      {/* Lighting - only needed for standard materials */}
      {!flatLighting && (
        <>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
          <directionalLight position={[-5, 5, -5]} intensity={0.3} />
          <pointLight position={[0, 3, 0]} intensity={0.3} color="#00ffff" />
        </>
      )}
      
      {/* Grid and axes */}
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
      
      {showAxes && <axesHelper args={[2]} />}
      
      {/* Render all voxels */}
      {voxelModel?.boxes.map((box) => (
        <VoxelMesh
          key={box.id}
          box={box}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          glowColor={glowColor}
          isSelected={box.id === selectedVoxelId}
          onClick={() => onVoxelClick?.(box.id)}
          flatLighting={flatLighting}
        />
      ))}
      
      {/* Camera controls */}
      <OrbitControls 
        target={[0, 1, 0]}
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={15}
      />
      
      <AutoRotate enabled={autoRotate || false} />
    </>
  )
}

export function VoxelPreview3D({
  voxelModel,
  primaryColor,
  secondaryColor,
  glowColor,
  selectedVoxelId,
  onVoxelClick,
  showGrid = true,
  showAxes = true,
  autoRotate = false,
  flatLighting = false
}: VoxelPreviewProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-900 to-gray-950 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [3, 3, 3], fov: 50 }}
        shadows
        dpr={[1, 2]}
      >
        <VoxelScene
          voxelModel={voxelModel}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          glowColor={glowColor}
          selectedVoxelId={selectedVoxelId}
          onVoxelClick={onVoxelClick}
          showGrid={showGrid}
          showAxes={showAxes}
          autoRotate={autoRotate}
          flatLighting={flatLighting}
        />
      </Canvas>
    </div>
  )
}
