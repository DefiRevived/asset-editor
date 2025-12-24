/**
 * Baked Voxel Model Loader
 * 
 * Loads pre-baked voxel models exported from the asset editor.
 * These models have lighting pre-computed, so they use MeshBasicMaterial
 * for efficient rendering without needing scene lights.
 * 
 * Copy this file to your game's lib/rendering/ folder.
 */

import * as THREE from "three"

export interface BakedVoxelData {
  version: string
  type: "baked-voxel-model"
  boxes: Array<{
    id: string
    name: string
    position: [number, number, number]
    scale: [number, number, number]
    color: string
    colorRGB: [number, number, number]
    originalColor: string
    group: string
    emissive: boolean
    emissiveIntensity: number
  }>
  groups: string[]
  bakingInfo: {
    timestamp: number
    lightingSetup: string
    options: Record<string, unknown>
  }
}

export interface LoaderOptions {
  /** Scale multiplier for the entire model */
  scale?: number
  /** Add emissive glow to boxes that were marked as emissive */
  addEmissiveGlow?: boolean
  /** Emissive intensity multiplier */
  emissiveMultiplier?: number
  /** Use instanced meshes for better performance (for many voxels) */
  useInstancing?: boolean
  /** Cast shadows (only works if not using basic material) */
  castShadow?: boolean
  /** Receive shadows */
  receiveShadow?: boolean
}

/**
 * Load a baked voxel model from JSON
 */
export function loadBakedVoxelModel(
  jsonData: BakedVoxelData | string,
  options: LoaderOptions = {}
): THREE.Group {
  const data: BakedVoxelData = typeof jsonData === "string" 
    ? JSON.parse(jsonData) 
    : jsonData
  
  const {
    scale = 1,
    addEmissiveGlow = false,
    emissiveMultiplier = 0.5,
    castShadow = false,
    receiveShadow = false
  } = options
  
  const group = new THREE.Group()
  group.name = "BakedVoxelModel"
  
  // Create sub-groups for organization
  const subGroups: Record<string, THREE.Group> = {}
  
  for (const box of data.boxes) {
    // Get or create sub-group
    if (!subGroups[box.group]) {
      subGroups[box.group] = new THREE.Group()
      subGroups[box.group].name = box.group
      group.add(subGroups[box.group])
    }
    
    // Create geometry
    const geometry = new THREE.BoxGeometry(
      box.scale[0] * scale,
      box.scale[1] * scale,
      box.scale[2] * scale
    )
    
    // Create material - use BasicMaterial since lighting is baked
    let material: THREE.Material
    
    if (addEmissiveGlow && box.emissive && box.emissiveIntensity > 0) {
      // Use standard material for emissive boxes (for bloom/glow effects)
      material = new THREE.MeshStandardMaterial({
        color: box.color,
        emissive: box.color,
        emissiveIntensity: box.emissiveIntensity * emissiveMultiplier,
        metalness: 0,
        roughness: 1
      })
    } else {
      // Use basic material for non-emissive boxes (no lighting needed)
      material = new THREE.MeshBasicMaterial({
        color: box.color
      })
    }
    
    // Create mesh
    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = box.name
    mesh.position.set(
      box.position[0] * scale,
      box.position[1] * scale,
      box.position[2] * scale
    )
    
    mesh.castShadow = castShadow
    mesh.receiveShadow = receiveShadow
    
    // Store original data for reference
    mesh.userData = {
      bakedColor: box.color,
      originalColor: box.originalColor,
      isEmissive: box.emissive,
      emissiveIntensity: box.emissiveIntensity
    }
    
    subGroups[box.group].add(mesh)
  }
  
  return group
}

/**
 * Create an optimized merged mesh from baked data
 * Better for static objects - merges all boxes into a single mesh
 */
export function createMergedBakedMesh(
  jsonData: BakedVoxelData | string,
  options: LoaderOptions = {}
): THREE.Mesh {
  const data: BakedVoxelData = typeof jsonData === "string" 
    ? JSON.parse(jsonData) 
    : jsonData
  
  const { scale = 1 } = options
  
  const geometries: THREE.BufferGeometry[] = []
  const colors: number[] = []
  
  for (const box of data.boxes) {
    const geometry = new THREE.BoxGeometry(
      box.scale[0] * scale,
      box.scale[1] * scale,
      box.scale[2] * scale
    )
    
    // Translate geometry to position
    geometry.translate(
      box.position[0] * scale,
      box.position[1] * scale,
      box.position[2] * scale
    )
    
    // Add vertex colors
    const color = new THREE.Color(box.color)
    const positionCount = geometry.attributes.position.count
    for (let i = 0; i < positionCount; i++) {
      colors.push(color.r, color.g, color.b)
    }
    
    geometries.push(geometry)
  }
  
  // Merge all geometries
  const mergedGeometry = mergeBufferGeometries(geometries)
  if (!mergedGeometry) {
    throw new Error("Failed to merge geometries")
  }
  
  // Add vertex colors
  mergedGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  )
  
  // Create material with vertex colors
  const material = new THREE.MeshBasicMaterial({
    vertexColors: true
  })
  
  const mesh = new THREE.Mesh(mergedGeometry, material)
  mesh.name = "MergedBakedVoxels"
  
  return mesh
}

/**
 * Simple buffer geometry merge utility
 */
function mergeBufferGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry | null {
  if (geometries.length === 0) return null
  
  const positions: number[] = []
  const normals: number[] = []
  const indices: number[] = []
  let indexOffset = 0
  
  for (const geometry of geometries) {
    const posAttr = geometry.attributes.position
    const normAttr = geometry.attributes.normal
    const indexAttr = geometry.index
    
    // Add positions
    for (let i = 0; i < posAttr.count; i++) {
      positions.push(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i))
    }
    
    // Add normals
    if (normAttr) {
      for (let i = 0; i < normAttr.count; i++) {
        normals.push(normAttr.getX(i), normAttr.getY(i), normAttr.getZ(i))
      }
    }
    
    // Add indices
    if (indexAttr) {
      for (let i = 0; i < indexAttr.count; i++) {
        indices.push(indexAttr.getX(i) + indexOffset)
      }
    }
    
    indexOffset += posAttr.count
    geometry.dispose()
  }
  
  const merged = new THREE.BufferGeometry()
  merged.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
  
  if (normals.length > 0) {
    merged.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3))
  }
  
  if (indices.length > 0) {
    merged.setIndex(indices)
  }
  
  return merged
}

/**
 * Load vertex-color format (compact format)
 * Format: [x, y, z, sx, sy, sz, r, g, b, emissive]
 */
export function loadVertexColorFormat(
  jsonData: { voxels: number[][] } | string,
  scale: number = 1
): THREE.Mesh {
  const data = typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData
  
  const geometries: THREE.BufferGeometry[] = []
  const colors: number[] = []
  
  for (const voxel of data.voxels) {
    const [x, y, z, sx, sy, sz, r, g, b] = voxel
    
    const geometry = new THREE.BoxGeometry(sx * scale, sy * scale, sz * scale)
    geometry.translate(x * scale, y * scale, z * scale)
    
    const positionCount = geometry.attributes.position.count
    for (let i = 0; i < positionCount; i++) {
      colors.push(r, g, b)
    }
    
    geometries.push(geometry)
  }
  
  const mergedGeometry = mergeBufferGeometries(geometries)
  if (!mergedGeometry) {
    throw new Error("Failed to merge geometries")
  }
  
  mergedGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))
  
  const material = new THREE.MeshBasicMaterial({ vertexColors: true })
  const mesh = new THREE.Mesh(mergedGeometry, material)
  mesh.name = "VertexColorVoxels"
  
  return mesh
}
