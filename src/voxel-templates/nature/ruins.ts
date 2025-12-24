import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Pillar Ruin - Ancient stone column
 */
export function createPillarRuinModel(width: number = 3, height: number = 15, depth: number = 3): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  for (let y = 0; y < height; y += 0.5) {
    const damage = Math.random() > 0.8 ? 0.7 : 1
    const shade = 0.8 + Math.random() * 0.2
    boxes.push({
      id: `pillar-ruin-${id++}`,
      name: `pillar_seg_${Math.floor(y * 2)}`,
      position: [0, y, 0],
      scale: [width * damage, 0.5, depth * damage],
      colorType: "primary",
      colorMultiplier: shade,
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
 * Tech Pillar - Ancient pillar with glowing tech runes
 */
export function createTechPillarModel(width: number = 2.5, height: number = 14, depth: number = 2.5): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  for (let y = 0; y < height; y += 0.5) {
    const damage = Math.random() > 0.8 ? 0.7 : 1
    const shade = 0.8 + Math.random() * 0.2
    boxes.push({
      id: `tech-pillar-${id++}`,
      name: `pillar_seg_${Math.floor(y * 2)}`,
      position: [0, y, 0],
      scale: [width * damage, 0.5, depth * damage],
      colorType: "primary",
      colorMultiplier: shade,
      emissive: false,
      emissiveIntensity: 0,
      group: "pillar",
    })
  }

  // Tech runes
  for (let y = 1; y < height - 1; y += 2) {
    boxes.push({
      id: `tech-pillar-${id++}`,
      name: `rune_${Math.floor(y / 2)}`,
      position: [width / 2 + 0.1, y, 0],
      scale: [0.05, 0.3, 0.2],
      colorType: "glow",
      customColor: "#ffff00",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 1,
      group: "runes",
    })
  }

  return {
    boxes,
    groups: ["pillar", "runes"],
  }
}

/**
 * Arch Ruin - Stone archway
 */
export function createArchRuinModel(width: number = 8, height: number = 12, depth: number = 3): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  // Left column
  for (let y = 0; y < height; y += 0.5) {
    boxes.push({
      id: `arch-ruin-${id++}`,
      name: `left_column_${Math.floor(y * 2)}`,
      position: [-width / 2 + 1, y, 0],
      scale: [1.5, 0.5, depth],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "columns",
    })
  }

  // Right column
  for (let y = 0; y < height; y += 0.5) {
    boxes.push({
      id: `arch-ruin-${id++}`,
      name: `right_column_${Math.floor(y * 2)}`,
      position: [width / 2 - 1, y, 0],
      scale: [1.5, 0.5, depth],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "columns",
    })
  }

  // Top lintel
  for (let x = -width / 2; x < width / 2; x += 0.8) {
    boxes.push({
      id: `arch-ruin-${id++}`,
      name: `lintel_${Math.floor(x + width / 2)}`,
      position: [x, height, 0],
      scale: [0.8, 1, depth],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "lintel",
    })
  }

  return {
    boxes,
    groups: ["columns", "lintel"],
  }
}

/**
 * Wall Ruin - Crumbling ancient wall
 */
export function createWallRuinModel(width: number = 12, height: number = 7, depth: number = 2): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  for (let x = 0; x < width; x += 1) {
    const wallH = height * (0.5 + Math.random() * 0.5)
    for (let y = 0; y < wallH; y += 0.8) {
      const shade = 0.7 + Math.random() * 0.3
      boxes.push({
        id: `wall-ruin-${id++}`,
        name: `wall_${x}_${Math.floor(y)}`,
        position: [-width / 2 + x, y, 0],
        scale: [0.9, 0.8, depth],
        colorType: "primary",
        colorMultiplier: shade,
        emissive: false,
        emissiveIntensity: 0,
        group: "wall",
      })
    }
  }

  return {
    boxes,
    groups: ["wall"],
  }
}

/**
 * Temple Piece - Large temple structure with steps
 */
export function createTemplePieceModel(width: number = 40, height: number = 25, depth: number = 35): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  // Foundation floor
  for (let x = -width / 2; x < width / 2; x += 2) {
    for (let z = -depth / 2; z < depth / 2; z += 2) {
      boxes.push({
        id: `temple-${id++}`,
        name: `floor_${Math.floor(x + width / 2)}_${Math.floor(z + depth / 2)}`,
        position: [x, 0, z],
        scale: [2, 1, 2],
        colorType: "primary",
        colorMultiplier: 0.8,
        emissive: false,
        emissiveIntensity: 0,
        group: "foundation",
      })
    }
  }

  // Steps
  for (let step = 0; step < 3; step++) {
    const stepW = width - step * 4
    const stepD = depth - step * 4
    for (let x = -stepW / 2; x < stepW / 2; x += 2) {
      for (let z = -stepD / 2; z < stepD / 2; z += 2) {
        if (Math.abs(x) < stepW / 2 - 1 && Math.abs(z) < stepD / 2 - 1) continue
        boxes.push({
          id: `temple-${id++}`,
          name: `step_${step}_${Math.floor(x)}_${Math.floor(z)}`,
          position: [x, step + 1, z],
          scale: [2, 1, 2],
          colorType: "primary",
          colorMultiplier: 1,
          emissive: false,
          emissiveIntensity: 0,
          group: "steps",
        })
      }
    }
  }

  // Central tower
  for (let y = 0; y < height * 0.6; y += 1) {
    boxes.push({
      id: `temple-${id++}`,
      name: `tower_${y}`,
      position: [0, 4 + y, 0],
      scale: [width * 0.3, 1, depth * 0.3],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "tower",
    })
  }

  return {
    boxes,
    groups: ["foundation", "steps", "tower"],
  }
}

/**
 * Tech Temple - Temple with glowing tech elements
 */
export function createTechTempleModel(width: number = 35, height: number = 22, depth: number = 30): VoxelModel {
  const base = createTemplePieceModel(width, height, depth)
  let id = base.boxes.length

  // Add tech runes to tower
  for (let y = 1; y < height * 0.5; y += 2) {
    base.boxes.push({
      id: `tech-temple-${id++}`,
      name: `tech_rune_${Math.floor(y / 2)}`,
      position: [0, 4 + y, depth * 0.15 + 0.1],
      scale: [width * 0.25, 0.1, 0.05],
      colorType: "glow",
      customColor: "#00ffaa",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 1,
      group: "tech",
    })
  }

  base.groups.push("tech")
  return base
}

/**
 * Statue Ruin - Ancient standing figure
 */
export function createStatueRuinModel(width: number = 4, height: number = 10, depth: number = 4): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  // Base pedestal
  boxes.push({
    id: `statue-${id++}`,
    name: "pedestal",
    position: [0, 0, 0],
    scale: [width * 1.2, 1, depth * 1.2],
    colorType: "primary",
    colorMultiplier: 1,
    emissive: false,
    emissiveIntensity: 0,
    group: "base",
  })

  // Body
  for (let y = 1; y < height * 0.7; y += 0.5) {
    boxes.push({
      id: `statue-${id++}`,
      name: `body_${Math.floor(y * 2)}`,
      position: [0, y, 0],
      scale: [width * 0.6, 0.5, depth * 0.6],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "body",
    })
  }

  // Head
  boxes.push({
    id: `statue-${id++}`,
    name: "head",
    position: [0, height * 0.8, 0],
    scale: [width * 0.4, height * 0.2, depth * 0.4],
    colorType: "primary",
    colorMultiplier: 1,
    emissive: false,
    emissiveIntensity: 0,
    group: "body",
  })

  // Eyes (glowing)
  boxes.push({
    id: `statue-${id++}`,
    name: "left_eye",
    position: [-width * 0.1, height * 0.85, depth * 0.2],
    scale: [0.15, 0.15, 0.1],
    colorType: "glow",
    customColor: "#ffaa44",
    colorMultiplier: 2,
    emissive: true,
    emissiveIntensity: 1,
    group: "eyes",
  })

  boxes.push({
    id: `statue-${id++}`,
    name: "right_eye",
    position: [width * 0.1, height * 0.85, depth * 0.2],
    scale: [0.15, 0.15, 0.1],
    colorType: "glow",
    customColor: "#ffaa44",
    colorMultiplier: 2,
    emissive: true,
    emissiveIntensity: 1,
    group: "eyes",
  })

  return {
    boxes,
    groups: ["base", "body", "eyes"],
  }
}

export const RUINS_HEIGHT = 25 // Approximate max height
