/**
 * Voxel Light Baking Utility
 * 
 * Bakes the editor's lighting setup into the voxel model
 * so the game can use pre-lit colors without runtime lighting calculations.
 */

import * as THREE from "three"
import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

// Editor lighting configuration (matches voxel-preview.tsx)
const EDITOR_LIGHTS = {
  ambient: {
    intensity: 0.4,
    color: new THREE.Color(0xffffff)
  },
  main: {
    position: new THREE.Vector3(5, 10, 5).normalize(),
    intensity: 0.8,
    color: new THREE.Color(0xffffff)
  },
  fill: {
    position: new THREE.Vector3(-5, 5, -5).normalize(),
    intensity: 0.3,
    color: new THREE.Color(0xffffff)
  },
  point: {
    position: new THREE.Vector3(0, 3, 0),
    intensity: 0.3,
    color: new THREE.Color(0x00ffff),
    decay: 2,
    distance: 10
  }
}

export interface BakeOptions {
  /** Include ambient occlusion approximation */
  includeAO?: boolean
  /** Strength of ambient occlusion (0-1) */
  aoStrength?: number
  /** Include emissive contribution in baked color */
  bakeEmissive?: boolean
  /** Gamma correction factor */
  gamma?: number
  /** Output format */
  outputFormat?: "hex" | "rgb" | "normalized"
}

export interface BakedVoxel extends VoxelBox {
  /** The baked color as hex string */
  bakedColor: string
  /** The baked color as RGB array [0-255] */
  bakedColorRGB: [number, number, number]
  /** Original color before baking */
  originalColor: string
}

export interface BakedVoxelModel {
  boxes: BakedVoxel[]
  groups: string[]
  /** Metadata about the baking process */
  bakingInfo: {
    timestamp: number
    lightingSetup: string
    options: BakeOptions
  }
}

/**
 * Calculate the base color for a voxel box
 */
function resolveBaseColor(
  box: VoxelBox,
  primaryColor: string,
  secondaryColor: string,
  glowColor: string
): THREE.Color {
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
}

/**
 * Calculate directional light contribution
 */
function calculateDirectionalLight(
  position: THREE.Vector3,
  lightDir: THREE.Vector3,
  lightColor: THREE.Color,
  lightIntensity: number,
  surfaceColor: THREE.Color
): THREE.Color {
  // Calculate normal facing outward (simplified - assume top-facing for voxels)
  // For each face, we'd calculate differently, but we'll use an average
  const normals = [
    new THREE.Vector3(0, 1, 0),   // top
    new THREE.Vector3(0, -1, 0),  // bottom
    new THREE.Vector3(1, 0, 0),   // right
    new THREE.Vector3(-1, 0, 0),  // left
    new THREE.Vector3(0, 0, 1),   // front
    new THREE.Vector3(0, 0, -1),  // back
  ]
  
  // Average light contribution across all faces
  let totalContribution = 0
  for (const normal of normals) {
    const dot = Math.max(0, normal.dot(lightDir))
    totalContribution += dot
  }
  totalContribution /= normals.length
  
  // Calculate light contribution
  const contribution = new THREE.Color(lightColor)
    .multiplyScalar(lightIntensity * totalContribution)
  
  return new THREE.Color(
    surfaceColor.r * contribution.r,
    surfaceColor.g * contribution.g,
    surfaceColor.b * contribution.b
  )
}

/**
 * Calculate point light contribution
 */
function calculatePointLight(
  voxelPosition: THREE.Vector3,
  lightPosition: THREE.Vector3,
  lightColor: THREE.Color,
  lightIntensity: number,
  lightDistance: number,
  lightDecay: number,
  surfaceColor: THREE.Color
): THREE.Color {
  const direction = new THREE.Vector3().subVectors(lightPosition, voxelPosition)
  const distance = direction.length()
  
  if (distance > lightDistance) {
    return new THREE.Color(0, 0, 0)
  }
  
  direction.normalize()
  
  // Calculate attenuation
  const attenuation = Math.pow(Math.max(1 - distance / lightDistance, 0), lightDecay)
  
  // Average contribution across faces
  const normals = [
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, -1, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, -1),
  ]
  
  let totalContribution = 0
  for (const normal of normals) {
    const dot = Math.max(0, normal.dot(direction))
    totalContribution += dot
  }
  totalContribution /= normals.length
  
  const contribution = new THREE.Color(lightColor)
    .multiplyScalar(lightIntensity * attenuation * totalContribution)
  
  return new THREE.Color(
    surfaceColor.r * contribution.r,
    surfaceColor.g * contribution.g,
    surfaceColor.b * contribution.b
  )
}

/**
 * Simple ambient occlusion approximation based on voxel neighbors
 */
function calculateAO(
  box: VoxelBox,
  allBoxes: VoxelBox[],
  aoStrength: number
): number {
  const pos = new THREE.Vector3(...box.position)
  let occlusionCount = 0
  const checkRadius = 0.3
  
  for (const other of allBoxes) {
    if (other.id === box.id) continue
    
    const otherPos = new THREE.Vector3(...other.position)
    const distance = pos.distanceTo(otherPos)
    
    // Check if other voxel is nearby and above
    if (distance < checkRadius && otherPos.y > pos.y) {
      occlusionCount++
    }
  }
  
  // Return occlusion factor (1 = no occlusion, lower = more occluded)
  return Math.max(0, 1 - (occlusionCount * aoStrength * 0.2))
}

/**
 * Bake lighting for a single voxel
 */
function bakeVoxelLighting(
  box: VoxelBox,
  allBoxes: VoxelBox[],
  primaryColor: string,
  secondaryColor: string,
  glowColor: string,
  options: BakeOptions
): BakedVoxel {
  const baseColor = resolveBaseColor(box, primaryColor, secondaryColor, glowColor)
  const originalHex = "#" + baseColor.getHexString()
  
  const voxelPos = new THREE.Vector3(...box.position)
  
  // Start with ambient light
  const finalColor = new THREE.Color(baseColor)
    .multiplyScalar(EDITOR_LIGHTS.ambient.intensity)
  
  // Add main directional light
  const mainLight = calculateDirectionalLight(
    voxelPos,
    EDITOR_LIGHTS.main.position,
    EDITOR_LIGHTS.main.color,
    EDITOR_LIGHTS.main.intensity,
    baseColor
  )
  finalColor.add(mainLight)
  
  // Add fill directional light
  const fillLight = calculateDirectionalLight(
    voxelPos,
    EDITOR_LIGHTS.fill.position,
    EDITOR_LIGHTS.fill.color,
    EDITOR_LIGHTS.fill.intensity,
    baseColor
  )
  finalColor.add(fillLight)
  
  // Add point light
  const pointLight = calculatePointLight(
    voxelPos,
    EDITOR_LIGHTS.point.position,
    EDITOR_LIGHTS.point.color,
    EDITOR_LIGHTS.point.intensity,
    EDITOR_LIGHTS.point.distance,
    EDITOR_LIGHTS.point.decay,
    baseColor
  )
  finalColor.add(pointLight)
  
  // Apply ambient occlusion
  if (options.includeAO) {
    const ao = calculateAO(box, allBoxes, options.aoStrength || 0.5)
    finalColor.multiplyScalar(ao)
  }
  
  // Add emissive contribution
  if (options.bakeEmissive && box.emissive && box.emissiveIntensity > 0) {
    const emissive = baseColor.clone().multiplyScalar(box.emissiveIntensity * 0.5)
    finalColor.add(emissive)
  }
  
  // Apply gamma correction
  const gamma = options.gamma || 2.2
  finalColor.r = Math.pow(Math.min(1, finalColor.r), 1 / gamma)
  finalColor.g = Math.pow(Math.min(1, finalColor.g), 1 / gamma)
  finalColor.b = Math.pow(Math.min(1, finalColor.b), 1 / gamma)
  
  // Clamp to valid range
  finalColor.r = Math.min(1, Math.max(0, finalColor.r))
  finalColor.g = Math.min(1, Math.max(0, finalColor.g))
  finalColor.b = Math.min(1, Math.max(0, finalColor.b))
  
  const bakedHex = "#" + finalColor.getHexString()
  const bakedRGB: [number, number, number] = [
    Math.round(finalColor.r * 255),
    Math.round(finalColor.g * 255),
    Math.round(finalColor.b * 255)
  ]
  
  return {
    ...box,
    // Convert to custom color with baked value
    colorType: "custom",
    customColor: bakedHex,
    bakedColor: bakedHex,
    bakedColorRGB: bakedRGB,
    originalColor: originalHex,
    // Keep emissive for additional glow in game if desired
    emissive: box.emissive,
    emissiveIntensity: box.emissiveIntensity
  }
}

/**
 * Bake all lighting for a voxel model
 */
export function bakeVoxelModel(
  model: VoxelModel,
  primaryColor: string,
  secondaryColor: string,
  glowColor: string,
  options: BakeOptions = {}
): BakedVoxelModel {
  const defaultOptions: BakeOptions = {
    includeAO: true,
    aoStrength: 0.5,
    bakeEmissive: true,
    gamma: 2.2,
    ...options
  }
  
  const bakedBoxes = model.boxes.map(box => 
    bakeVoxelLighting(
      box, 
      model.boxes, 
      primaryColor, 
      secondaryColor, 
      glowColor, 
      defaultOptions
    )
  )
  
  return {
    boxes: bakedBoxes,
    groups: [...model.groups],
    bakingInfo: {
      timestamp: Date.now(),
      lightingSetup: "editor-default",
      options: defaultOptions
    }
  }
}

/**
 * Generate game-ready code with baked colors
 */
export function generateBakedGameCode(
  bakedModel: BakedVoxelModel,
  entityName: string = "Entity"
): string {
  const lines: string[] = [
    `// Baked voxel model for ${entityName}`,
    `// Generated: ${new Date(bakedModel.bakingInfo.timestamp).toISOString()}`,
    `// Lighting: ${bakedModel.bakingInfo.lightingSetup}`,
    ``,
    `function create${entityName}Mesh(): THREE.Group {`,
    `  const group = new THREE.Group()`,
    ``
  ]
  
  // Group boxes by their group property
  const groups: Record<string, typeof bakedModel.boxes> = {}
  for (const box of bakedModel.boxes) {
    if (!groups[box.group]) groups[box.group] = []
    groups[box.group].push(box)
  }
  
  for (const [groupName, boxes] of Object.entries(groups)) {
    lines.push(`  // ${groupName}`)
    for (const box of boxes) {
      lines.push(`  {`)
      lines.push(`    const geo = new THREE.BoxGeometry(${box.scale[0]}, ${box.scale[1]}, ${box.scale[2]})`)
      lines.push(`    const mat = new THREE.MeshBasicMaterial({`)
      lines.push(`      color: "${box.bakedColor}",`)
      if (box.emissive && box.emissiveIntensity > 0) {
        lines.push(`      // Original had emissive, consider adding bloom/glow effect`)
      }
      lines.push(`    })`)
      lines.push(`    const mesh = new THREE.Mesh(geo, mat)`)
      lines.push(`    mesh.position.set(${box.position[0]}, ${box.position[1]}, ${box.position[2]})`)
      lines.push(`    group.add(mesh)`)
      lines.push(`  }`)
    }
    lines.push(``)
  }
  
  lines.push(`  return group`)
  lines.push(`}`)
  
  return lines.join("\n")
}

/**
 * Export baked model as JSON for the game to load
 */
export function exportBakedModelJSON(bakedModel: BakedVoxelModel): string {
  return JSON.stringify({
    version: "1.0",
    type: "baked-voxel-model",
    ...bakedModel,
    boxes: bakedModel.boxes.map(box => ({
      id: box.id,
      name: box.name,
      position: box.position,
      scale: box.scale,
      color: box.bakedColor,
      colorRGB: box.bakedColorRGB,
      originalColor: box.originalColor,
      group: box.group,
      emissive: box.emissive,
      emissiveIntensity: box.emissiveIntensity
    }))
  }, null, 2)
}

/**
 * Create a simplified vertex color format for GPU-efficient rendering
 */
export function exportVertexColorFormat(bakedModel: BakedVoxelModel): string {
  const data = {
    version: "1.0",
    type: "vertex-color-voxels",
    count: bakedModel.boxes.length,
    // Packed format: [x, y, z, sx, sy, sz, r, g, b, emissive]
    voxels: bakedModel.boxes.map(box => [
      box.position[0],
      box.position[1],
      box.position[2],
      box.scale[0],
      box.scale[1],
      box.scale[2],
      box.bakedColorRGB[0] / 255,
      box.bakedColorRGB[1] / 255,
      box.bakedColorRGB[2] / 255,
      box.emissive ? box.emissiveIntensity : 0
    ])
  }
  return JSON.stringify(data)
}
