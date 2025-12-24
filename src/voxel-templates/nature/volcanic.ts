import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Lava Pillar - Tall volcanic column with glowing cracks
 */
export function createLavaPillarModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  const height = scale * 8 + 5
  for (let y = 0; y < height; y += 0.4) {
    const taper = 1 - (y / height) * 0.6
    const wobble = Math.sin(y * 0.5) * 0.3
    const hasGlow = y < height * 0.3 && Math.random() > 0.7

    boxes.push({
      id: `lava-pillar-${id++}`,
      name: `pillar_seg_${Math.floor(y * 2.5)}`,
      position: [wobble + Math.sin(y * 0.15) * scale * 0.2, y, Math.cos(y * 0.15) * scale * 0.2],
      scale: [scale * 0.6 * taper, 0.4, scale * 0.6 * taper],
      colorType: hasGlow ? "glow" : "custom",
      customColor: hasGlow ? "#ff4400" : "#331100",
      colorMultiplier: hasGlow ? 2 : 0.6 + y * 0.02,
      emissive: hasGlow,
      emissiveIntensity: hasGlow ? 1 : 0,
      group: "pillar",
    })
  }

  return {
    boxes,
    groups: ["pillar"],
  }
}

/**
 * Obsidian Spire - Sharp black glass volcanic formation
 */
export function createObsidianSpireModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  const height = scale * 12
  for (let y = 0; y < height; y += 0.3) {
    const taper = 1 - (y / height) * 0.95
    const shine = 0.1 + Math.random() * 0.15
    boxes.push({
      id: `obsidian-spire-${id++}`,
      name: `obsidian_seg_${Math.floor(y * 3)}`,
      position: [0, y, 0],
      scale: [scale * 0.3 * taper, 0.3, scale * 0.3 * taper],
      colorType: "custom",
      customColor: `rgb(${Math.floor(shine * 255)}, ${Math.floor(shine * 127)}, ${Math.floor((shine + 0.05) * 255)})`,
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "obsidian",
    })
  }

  return {
    boxes,
    groups: ["obsidian"],
  }
}

/**
 * Volcanic Vent - Smoking chimney with glowing top
 */
export function createVolcanicVentModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  const height = scale * 5
  for (let y = 0; y < height; y += 0.35) {
    const bulge = 1 + Math.sin(y * 0.8) * 0.2
    const isTop = y > height * 0.7

    boxes.push({
      id: `volcanic-vent-${id++}`,
      name: `vent_seg_${Math.floor(y * 3)}`,
      position: [0, y, 0],
      scale: [scale * 0.8 * bulge, 0.35, scale * 0.8 * bulge],
      colorType: isTop ? "glow" : "custom",
      customColor: isTop ? "#ff6600" : "#442200",
      colorMultiplier: isTop ? 2 : 1,
      emissive: isTop,
      emissiveIntensity: isTop ? 1 : 0,
      group: "vent",
    })
  }

  // Smoke particles
  for (let i = 0; i < 5; i++) {
    boxes.push({
      id: `volcanic-vent-${id++}`,
      name: `smoke_${i}`,
      position: [(Math.random() - 0.5) * scale, height + i * 0.8, (Math.random() - 0.5) * scale],
      scale: [0.3 + Math.random() * 0.3, 0.3, 0.3 + Math.random() * 0.3],
      colorType: "custom",
      customColor: "#33261a",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "smoke",
    })
  }

  return {
    boxes,
    groups: ["vent", "smoke"],
  }
}

/**
 * Magma Pool - Glowing lava lake with rocky rim
 */
export function createMagmaPoolModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  const radius = scale

  // Lava surface
  for (let x = -radius; x <= radius; x += 0.8) {
    for (let z = -radius; z <= radius; z += 0.8) {
      if (x * x + z * z < radius * radius * 0.8) {
        const heat = 0.8 + Math.random() * 0.4
        boxes.push({
          id: `magma-pool-${id++}`,
          name: `lava_${Math.floor(x + radius)}_${Math.floor(z + radius)}`,
          position: [x, 0.1, z],
          scale: [0.8, 0.2, 0.8],
          colorType: "glow",
          customColor: `hsl(20, 100%, ${Math.floor(heat * 50)}%)`,
          colorMultiplier: 2,
          emissive: true,
          emissiveIntensity: 1,
          group: "lava",
        })
      }
    }
  }

  // Rocky rim
  for (let angle = 0; angle < Math.PI * 2; angle += 0.3) {
    const rimDist = radius + 0.5 + Math.random() * 0.5
    const rimHeight = 0.3 + Math.random() * 0.8
    boxes.push({
      id: `magma-pool-${id++}`,
      name: `rim_${Math.floor(angle * 10)}`,
      position: [Math.cos(angle) * rimDist, rimHeight / 2, Math.sin(angle) * rimDist],
      scale: [0.6 + Math.random() * 0.4, rimHeight, 0.6 + Math.random() * 0.4],
      colorType: "custom",
      customColor: "#261408",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "rim",
    })
  }

  return {
    boxes,
    groups: ["lava", "rim"],
  }
}

/**
 * Ash Mound - Rounded pile of volcanic ash
 */
export function createAshMoundModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  const layers = Math.floor(scale * 3)
  for (let layer = 0; layer < layers; layer++) {
    const layerRadius = scale * (1 - layer / layers)
    const y = layer * 0.4

    for (let angle = 0; angle < Math.PI * 2; angle += 0.5) {
      const dist = layerRadius * (0.7 + Math.random() * 0.3)
      const gray = 0.1 + Math.random() * 0.1
      boxes.push({
        id: `ash-mound-${id++}`,
        name: `ash_${layer}_${Math.floor(angle * 10)}`,
        position: [Math.cos(angle) * dist, y, Math.sin(angle) * dist],
        scale: [0.5, 0.4, 0.5],
        colorType: "custom",
        customColor: `rgb(${Math.floor(gray * 255)}, ${Math.floor(gray * 255)}, ${Math.floor(gray * 255)})`,
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "ash",
      })
    }
  }

  return {
    boxes,
    groups: ["ash"],
  }
}

/**
 * Lava Rock - Irregular volcanic boulder
 */
export function createLavaRockModel(scale: number = 1): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  const parts = 3 + Math.floor(Math.random() * 4)
  for (let i = 0; i < parts; i++) {
    const ox = (Math.random() - 0.5) * scale * 0.8
    const oy = Math.random() * scale * 0.5
    const oz = (Math.random() - 0.5) * scale * 0.8
    const partScale = scale * (0.3 + Math.random() * 0.4)
    const hasGlow = Math.random() > 0.85
    const dark = 0.08 + Math.random() * 0.1

    boxes.push({
      id: `lava-rock-${id++}`,
      name: `rock_part_${i}`,
      position: [ox, oy, oz],
      scale: [partScale, partScale * 0.7, partScale],
      colorType: hasGlow ? "glow" : "custom",
      customColor: hasGlow ? "#ff4400" : `rgb(${Math.floor(dark * 1.5 * 255)}, ${Math.floor(dark * 255)}, ${Math.floor(dark * 0.5 * 255)})`,
      colorMultiplier: hasGlow ? 2 : 1,
      emissive: hasGlow,
      emissiveIntensity: hasGlow ? 1 : 0,
      group: "rock",
    })
  }

  return {
    boxes,
    groups: ["rock"],
  }
}

export const VOLCANIC_HEIGHT = 12 // Approximate max height
