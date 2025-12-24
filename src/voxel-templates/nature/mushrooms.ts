import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Giant Mushroom - Glowing fantasy mushroom with stem and cap
 */
export function createGiantMushroomModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  // Stem
  const stemHeight = scale * 3
  for (let y = 0; y < stemHeight; y += 0.3) {
    const stemWidth = scale * 0.3 * (1 + (y / stemHeight) * 0.3)
    boxes.push({
      id: `mushroom-${id++}`,
      name: `stem_${Math.floor(y * 3)}`,
      position: [0, y, 0],
      scale: [stemWidth, 0.3, stemWidth],
      colorType: "custom",
      customColor: "#e6d9bf",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "stem",
    })
  }

  // Cap - 4 layers
  for (let layer = 0; layer < 4; layer++) {
    const layerY = stemHeight + layer * scale * 0.3
    const layerSize = scale * (1.5 - layer * 0.2)

    for (let angle = 0; angle < Math.PI * 2; angle += 0.4) {
      for (let r = 0; r < layerSize; r += scale * 0.3) {
        const isGlowSpot = Math.random() > 0.7
        boxes.push({
          id: `mushroom-${id++}`,
          name: `cap_${layer}_${Math.floor(angle * 10)}_${Math.floor(r * 3)}`,
          position: [Math.cos(angle) * r, layerY, Math.sin(angle) * r],
          scale: [scale * 0.35, scale * 0.2, scale * 0.35],
          colorType: isGlowSpot ? "glow" : "primary",
          colorMultiplier: isGlowSpot ? 2 : 1,
          emissive: isGlowSpot,
          emissiveIntensity: isGlowSpot ? 1 : 0,
          group: "cap",
        })
      }
    }
  }

  // Glowing underside
  for (let angle = 0; angle < Math.PI * 2; angle += 0.3) {
    const radius = scale * 1.2
    boxes.push({
      id: `mushroom-${id++}`,
      name: `underglow_${Math.floor(angle * 10)}`,
      position: [Math.cos(angle) * radius, stemHeight - 0.2, Math.sin(angle) * radius],
      scale: [scale * 0.2, 0.1, scale * 0.2],
      colorType: "glow",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 1,
      group: "underglow",
    })
  }

  return {
    boxes,
    groups: ["stem", "cap", "underglow"],
  }
}

/**
 * Corrupted Mushroom - Dark glitchy variant
 */
export function createCorruptedMushroomModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  // Stem
  const stemHeight = scale * 3
  for (let y = 0; y < stemHeight; y += 0.3) {
    const stemWidth = scale * 0.3 * (1 + (y / stemHeight) * 0.3)
    boxes.push({
      id: `corrupted-mushroom-${id++}`,
      name: `stem_${Math.floor(y * 3)}`,
      position: [0, y, 0],
      scale: [stemWidth, 0.3, stemWidth],
      colorType: "custom",
      customColor: "#3d2626",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "stem",
    })
  }

  // Cap - corrupted glow
  for (let layer = 0; layer < 4; layer++) {
    const layerY = stemHeight + layer * scale * 0.3
    const layerSize = scale * (1.5 - layer * 0.2)

    for (let angle = 0; angle < Math.PI * 2; angle += 0.4) {
      for (let r = 0; r < layerSize; r += scale * 0.3) {
        boxes.push({
          id: `corrupted-mushroom-${id++}`,
          name: `cap_${layer}_${Math.floor(angle * 10)}_${Math.floor(r * 3)}`,
          position: [Math.cos(angle) * r, layerY, Math.sin(angle) * r],
          scale: [scale * 0.35, scale * 0.2, scale * 0.35],
          colorType: "custom",
          customColor: "#ff0088",
          colorMultiplier: 1,
          emissive: false,
          emissiveIntensity: 0,
          group: "cap",
        })
      }
    }
  }

  // Glowing corrupted underside
  for (let angle = 0; angle < Math.PI * 2; angle += 0.3) {
    const radius = scale * 1.2
    boxes.push({
      id: `corrupted-mushroom-${id++}`,
      name: `underglow_${Math.floor(angle * 10)}`,
      position: [Math.cos(angle) * radius, stemHeight - 0.2, Math.sin(angle) * radius],
      scale: [scale * 0.2, 0.1, scale * 0.2],
      colorType: "glow",
      customColor: "#ff00ff",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 1,
      group: "underglow",
    })
  }

  return {
    boxes,
    groups: ["stem", "cap", "underglow"],
  }
}

export const MUSHROOM_HEIGHT = 4.5 // Approximate height
