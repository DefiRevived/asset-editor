import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Oak Tree - Dense layered canopy forest tree
 */
export function createOakTreeModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  // Trunk
  const trunkHeight = scale * 6
  for (let y = 0; y < trunkHeight; y += 0.5) {
    boxes.push({
      id: `oak-${id++}`,
      name: `trunk_${Math.floor(y * 2)}`,
      position: [0, y, 0],
      scale: [0.3 * scale, 0.5, 0.3 * scale],
      colorType: "custom",
      customColor: "#331e0d",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "trunk",
    })
  }

  // Canopy/Leaves - 4 layers
  for (let layer = 0; layer < 4; layer++) {
    const layerY = trunkHeight + layer * scale * 1.2
    const layerSize = (4 - layer) * scale * 1.5

    for (let lx = -layerSize; lx <= layerSize; lx += scale * 0.8) {
      for (let lz = -layerSize; lz <= layerSize; lz += scale * 0.8) {
        if (Math.sqrt(lx * lx + lz * lz) > layerSize) continue

        boxes.push({
          id: `oak-${id++}`,
          name: `canopy_${layer}_${Math.floor(lx)}_${Math.floor(lz)}`,
          position: [lx, layerY, lz],
          scale: [scale * 0.7, scale * 0.5, scale * 0.7],
          colorType: "primary",
          colorMultiplier: 0.7 + Math.random() * 0.3,
          emissive: false,
          emissiveIntensity: 0,
          group: "canopy",
        })
      }
    }
  }

  return {
    boxes,
    groups: ["trunk", "canopy"],
  }
}

/**
 * Pine Tree - Conical evergreen with layered branches
 */
export function createPineTreeModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  // Trunk
  const trunkHeight = scale * 6
  for (let y = 0; y < trunkHeight; y += 0.5) {
    boxes.push({
      id: `pine-${id++}`,
      name: `trunk_${Math.floor(y * 2)}`,
      position: [0, y, 0],
      scale: [0.3 * scale, 0.5, 0.3 * scale],
      colorType: "custom",
      customColor: "#331e0d",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "trunk",
    })
  }

  // Pine layers - cone shape
  for (let layer = 0; layer < 5; layer++) {
    const layerY = trunkHeight - layer * scale * 0.8
    const layerSize = layer * scale * 0.8 + scale * 0.5

    for (let angle = 0; angle < Math.PI * 2; angle += 0.5) {
      boxes.push({
        id: `pine-${id++}`,
        name: `branch_${layer}_${Math.floor(angle * 10)}`,
        position: [Math.cos(angle) * layerSize, layerY, Math.sin(angle) * layerSize],
        scale: [scale * 0.5, scale * 0.3, scale * 0.5],
        colorType: "custom",
        customColor: "#0d331a",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "branches",
      })
    }
  }

  return {
    boxes,
    groups: ["trunk", "branches"],
  }
}

/**
 * Willow Tree - Same structure as oak, alternative style
 */
export function createWillowTreeModel(scale: number = 1): VoxelModel {
  return createOakTreeModel(scale) // Same voxel structure, different colors applied
}

/**
 * Cyber Tree - Holographic digital tree with glowing leaves
 */
export function createCyberTreeModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  // Trunk - alternating glow
  const trunkHeight = scale * 6
  for (let y = 0; y < trunkHeight; y += 0.5) {
    boxes.push({
      id: `cyber-tree-${id++}`,
      name: `trunk_${Math.floor(y * 2)}`,
      position: [0, y, 0],
      scale: [0.3 * scale, 0.5, 0.3 * scale],
      colorType: y % 2 < 1 ? "custom" : "glow",
      customColor: y % 2 < 1 ? "#0d1a14" : "#00ffaa",
      colorMultiplier: y % 2 < 1 ? 1 : 2,
      emissive: y % 2 >= 1,
      emissiveIntensity: y % 2 >= 1 ? 1 : 0,
      group: "trunk",
    })
  }

  // Holographic leaves - 3 layers
  for (let layer = 0; layer < 3; layer++) {
    const layerY = trunkHeight + layer * scale * 1.5
    const radius = (3 - layer) * scale

    for (let angle = 0; angle < Math.PI * 2; angle += 0.4) {
      boxes.push({
        id: `cyber-tree-${id++}`,
        name: `hololeaf_${layer}_${Math.floor(angle * 10)}`,
        position: [Math.cos(angle) * radius, layerY, Math.sin(angle) * radius],
        scale: [scale * 0.4, scale * 0.2, scale * 0.4],
        colorType: "glow",
        customColor: "#00ffaa",
        colorMultiplier: 2,
        emissive: true,
        emissiveIntensity: 1,
        group: "hololeaves",
      })
    }
  }

  return {
    boxes,
    groups: ["trunk", "hololeaves"],
  }
}

/**
 * Corrupted Tree - Dark twisted tree with glitchy branches
 */
export function createCorruptedTreeModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  // Trunk - twisted with visible corruption
  const trunkHeight = scale * 6
  for (let y = 0; y < trunkHeight; y += 0.5) {
    const trunkWidth = 0.4 + Math.sin(y * 0.5) * 0.2
    boxes.push({
      id: `corrupted-tree-${id++}`,
      name: `trunk_${Math.floor(y * 2)}`,
      position: [0, y, 0],
      scale: [trunkWidth * scale, 0.5, trunkWidth * scale],
      colorType: "custom",
      customColor: "#26050d",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "trunk",
    })
  }

  // Glitchy twisted branches
  for (let branch = 0; branch < 6; branch++) {
    const angle = branch * Math.PI / 3
    for (let seg = 0; seg < 4; seg++) {
      const segY = trunkHeight + seg * scale * 0.5
      const segR = seg * scale * 0.8
      boxes.push({
        id: `corrupted-tree-${id++}`,
        name: `branch_${branch}_${seg}`,
        position: [
          Math.cos(angle + seg * 0.3) * segR,
          segY,
          Math.sin(angle + seg * 0.3) * segR,
        ],
        scale: [scale * 0.3, scale * 0.4, scale * 0.3],
        colorType: "custom",
        customColor: seg % 2 === 0 ? "#660026" : "#ff0066",
        colorMultiplier: seg % 2 === 0 ? 1 : 2,
        emissive: seg % 2 !== 0,
        emissiveIntensity: seg % 2 !== 0 ? 1 : 0,
        group: "branches",
      })
    }
  }

  return {
    boxes,
    groups: ["trunk", "branches"],
  }
}

export const TREE_HEIGHT = 10 // Approximate total height
