import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Ice Spire - Tall crystalline ice formation
 */
export function createIceSpireModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  const height = scale * 10 + 4
  for (let y = 0; y < height; y += 0.35) {
    const taper = 1 - (y / height) * 0.9
    const facet = Math.sin(y * 2) * 0.1
    const isShimmer = Math.random() > 0.8
    const brightness = 0.5 + (y / height) * 0.5

    boxes.push({
      id: `ice-spire-${id++}`,
      name: `ice_seg_${Math.floor(y * 3)}`,
      position: [facet, y, Math.cos(y * 2) * 0.1],
      scale: [scale * 0.35 * taper, 0.35, scale * 0.35 * taper],
      colorType: isShimmer ? "glow" : "custom",
      customColor: isShimmer ? "#ffffff" : `hsl(200, 60%, ${Math.floor(brightness * 70)}%)`,
      colorMultiplier: isShimmer ? 2 : 1,
      emissive: isShimmer,
      emissiveIntensity: isShimmer ? 0.8 : 0,
      group: "spire",
    })
  }

  return {
    boxes,
    groups: ["spire"],
  }
}

/**
 * Glacier - Large irregular ice mass
 */
export function createGlacierModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  const length = scale * 1.5
  const width = scale
  const height = scale * 0.6

  for (let x = -length / 2; x < length / 2; x += 0.8) {
    for (let z = -width / 2; z < width / 2; z += 0.8) {
      const distFromCenter = Math.sqrt(x * x + z * z) / Math.max(length, width)
      const localHeight = height * (1 - distFromCenter * 0.8) * (0.7 + Math.random() * 0.6)

      for (let y = 0; y < localHeight; y += 0.6) {
        const depth = 0.4 + (y / localHeight) * 0.4
        boxes.push({
          id: `glacier-${id++}`,
          name: `glacier_${Math.floor(x + length)}_${Math.floor(z + width)}_${Math.floor(y)}`,
          position: [x, y, z],
          scale: [0.8, 0.6, 0.8],
          colorType: "custom",
          customColor: `hsl(200, 40%, ${Math.floor((depth + 0.1) * 60)}%)`,
          colorMultiplier: 1,
          emissive: false,
          emissiveIntensity: 0,
          group: "glacier",
        })
      }
    }
  }

  return {
    boxes,
    groups: ["glacier"],
  }
}

/**
 * Snow Mound - Soft rounded snow pile
 */
export function createSnowMoundModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  const layers = Math.floor(scale * 2.5)
  for (let layer = 0; layer < layers; layer++) {
    const layerRadius = scale * (1 - (layer / layers) * 0.7)
    const y = layer * 0.35

    for (let angle = 0; angle < Math.PI * 2; angle += 0.4) {
      const dist = layerRadius * (0.6 + Math.random() * 0.4)
      const white = 0.85 + Math.random() * 0.15
      boxes.push({
        id: `snow-mound-${id++}`,
        name: `snow_${layer}_${Math.floor(angle * 10)}`,
        position: [Math.cos(angle) * dist, y, Math.sin(angle) * dist],
        scale: [0.5, 0.35, 0.5],
        colorType: "custom",
        customColor: `rgb(${Math.floor(white * 255)}, ${Math.floor(white * 255)}, ${Math.floor(white * 255)})`,
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "snow",
      })
    }
  }

  // Snow top
  boxes.push({
    id: `snow-mound-${id++}`,
    name: "snow_top",
    position: [0, layers * 0.35, 0],
    scale: [scale * 0.4, 0.3, scale * 0.4],
    colorType: "custom",
    customColor: "#f2f2ff",
    colorMultiplier: 1,
    emissive: false,
    emissiveIntensity: 0,
    group: "snow",
  })

  return {
    boxes,
    groups: ["snow"],
  }
}

/**
 * Frozen Pillar - Icy column with frozen surface
 */
export function createFrozenPillarModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  const height = scale * 7
  for (let y = 0; y < height; y += 0.4) {
    const bulge = 1 + Math.sin(y * 0.3) * 0.15
    const iceBlue = 0.4 + (y / height) * 0.3 + Math.random() * 0.1

    boxes.push({
      id: `frozen-pillar-${id++}`,
      name: `pillar_seg_${Math.floor(y * 2.5)}`,
      position: [0, y, 0],
      scale: [scale * 0.5 * bulge, 0.4, scale * 0.5 * bulge],
      colorType: "custom",
      customColor: `hsl(200, 50%, ${Math.floor(iceBlue * 60)}%)`,
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "pillar",
    })
  }

  return {
    boxes,
    groups: ["pillar"],
  }
}

/**
 * Ice Crystal - Small multi-faceted ice crystal cluster
 */
export function createIceCrystalModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  const numCrystals = 3 + Math.floor(Math.random() * 4)
  for (let i = 0; i < numCrystals; i++) {
    const angle = (i / numCrystals) * Math.PI * 2 + Math.random() * 0.5
    const dist = scale * 0.3
    const crystalHeight = scale * (1.5 + Math.random() * 2)
    const tilt = Math.random() * 0.3

    for (let y = 0; y < crystalHeight; y += 0.25) {
      const taper = 1 - (y / crystalHeight) * 0.85
      const isShimmer = Math.random() > 0.85

      boxes.push({
        id: `ice-crystal-${id++}`,
        name: `crystal_${i}_seg_${Math.floor(y * 4)}`,
        position: [
          Math.cos(angle) * dist + Math.sin(y * tilt) * 0.1,
          y,
          Math.sin(angle) * dist + Math.cos(y * tilt) * 0.1,
        ],
        scale: [scale * 0.15 * taper, 0.25, scale * 0.15 * taper],
        colorType: isShimmer ? "glow" : "custom",
        customColor: isShimmer ? "#ffffff" : "#aaddff",
        colorMultiplier: isShimmer ? 2 : 0.9,
        emissive: isShimmer,
        emissiveIntensity: isShimmer ? 0.8 : 0,
        group: "crystals",
      })
    }
  }

  return {
    boxes,
    groups: ["crystals"],
  }
}

/**
 * Snowdrift - Wind-sculpted snow bank
 */
export function createSnowdriftModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  const length = scale * 2
  const width = scale * 0.8
  const height = scale * 0.4

  for (let x = -length / 2; x < length / 2; x += 0.5) {
    for (let z = -width / 2; z < width / 2; z += 0.5) {
      const distZ = Math.abs(z) / (width / 2)
      const distX = (x + length / 2) / length
      const localHeight = height * (1 - distZ * 0.7) * (0.3 + distX * 0.7)

      if (localHeight > 0.1) {
        const snowWhite = 0.88 + Math.random() * 0.12
        boxes.push({
          id: `snowdrift-${id++}`,
          name: `drift_${Math.floor(x + length)}_${Math.floor(z + width)}`,
          position: [x, localHeight / 2, z],
          scale: [0.5, localHeight, 0.5],
          colorType: "custom",
          customColor: `rgb(${Math.floor(snowWhite * 255)}, ${Math.floor(snowWhite * 255)}, ${Math.floor((snowWhite + 0.02) * 255)})`,
          colorMultiplier: 1,
          emissive: false,
          emissiveIntensity: 0,
          group: "drift",
        })
      }
    }
  }

  return {
    boxes,
    groups: ["drift"],
  }
}

export const FROZEN_HEIGHT = 14 // Approximate max height
