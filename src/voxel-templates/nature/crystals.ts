import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Crystal Cluster - Group of tapered crystals
 */
export function createCrystalClusterModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2
    const dist = scale * 0.5
    const height = scale * (1 + Math.random() * 2)

    for (let y = 0; y < height; y += 0.3) {
      const taper = 1 - (y / height) * 0.8
      boxes.push({
        id: `crystal-cluster-${id++}`,
        name: `crystal_${i}_seg_${Math.floor(y * 3)}`,
        position: [Math.cos(angle) * dist, y, Math.sin(angle) * dist],
        scale: [scale * 0.2 * taper, 0.3, scale * 0.2 * taper],
        colorType: "glow",
        customColor: "#aa66ff",
        colorMultiplier: 1 + y * 0.3,
        emissive: true,
        emissiveIntensity: 0.8,
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
 * Crystal Spire - Single tall tapered crystal
 */
export function createCrystalSpireModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  const height = scale * 4
  for (let y = 0; y < height; y += 0.25) {
    const taper = 1 - (y / height) * 0.9
    boxes.push({
      id: `crystal-spire-${id++}`,
      name: `spire_seg_${Math.floor(y * 4)}`,
      position: [0, y, 0],
      scale: [scale * 0.4 * taper, 0.25, scale * 0.4 * taper],
      colorType: "glow",
      customColor: "#ff66ff",
      colorMultiplier: 1 + y * 0.2,
      emissive: true,
      emissiveIntensity: 0.9,
      group: "spire",
    })
  }

  return {
    boxes,
    groups: ["spire"],
  }
}

/**
 * Floating Crystal - Diamond-shaped floating gem
 */
export function createFloatingCrystalModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  for (let y = 0; y < scale * 2; y += 0.2) {
    const mid = scale
    const dist = 1 - Math.abs(y - mid) / mid
    boxes.push({
      id: `floating-crystal-${id++}`,
      name: `float_seg_${Math.floor(y * 5)}`,
      position: [0, y, 0],
      scale: [scale * 0.3 * dist, 0.2, scale * 0.3 * dist],
      colorType: "glow",
      customColor: "#6666ff",
      colorMultiplier: 1 + dist,
      emissive: true,
      emissiveIntensity: 1,
      group: "gem",
    })
  }

  return {
    boxes,
    groups: ["gem"],
  }
}

/**
 * Data Shard - Digital data crystal with scan lines
 */
export function createDataShardModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  for (let y = 0; y < scale * 2; y += 0.2) {
    const mid = scale
    const dist = 1 - Math.abs(y - mid) / mid
    const isScanLine = y % 0.4 < 0.2
    boxes.push({
      id: `data-shard-${id++}`,
      name: `shard_seg_${Math.floor(y * 5)}`,
      position: [0, y, 0],
      scale: [scale * 0.3 * dist, 0.2, scale * 0.3 * dist],
      colorType: "glow",
      customColor: isScanLine ? "#ffff00" : "#00ffaa",
      colorMultiplier: isScanLine ? 2 : 1,
      emissive: true,
      emissiveIntensity: 1,
      group: "shard",
    })
  }

  return {
    boxes,
    groups: ["shard"],
  }
}

export const CRYSTAL_HEIGHT = 4 // Approximate height
