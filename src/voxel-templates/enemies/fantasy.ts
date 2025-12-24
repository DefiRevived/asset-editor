import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Fantasy Zone Enemy Templates
 * Based on: lib/world/enemy-templates.ts FANTASY_ENEMIES
 */

let idCounter = 0
function id(prefix: string) { return `${prefix}_${idCounter++}` }

// ============================================
// FOREST SPRITE - Woodland spirit guardian
// ============================================

export function createForestSpriteModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Ethereal head core
  boxes.push({
    id: id("forest_sprite"),
    name: "Head Core",
    position: [0, 1.6, 0],
    scale: [0.15, 0.18, 0.15],
    colorType: "glow",
    colorMultiplier: 2.5,
    emissive: true,
    emissiveIntensity: 2.5,
    group: "head"
  })

  // Leaf crown
  for (let leaf = 0; leaf < 6; leaf++) {
    const angle = (leaf / 6) * Math.PI * 2
    boxes.push({
      id: id("forest_sprite"),
      name: `Crown Leaf ${leaf}`,
      position: [Math.cos(angle) * 0.12, 1.75 + Math.sin(leaf * 2) * 0.04, Math.sin(angle) * 0.1],
      scale: [0.06, 0.1, 0.02],
      colorType: "secondary",
      colorMultiplier: 1.2,
      emissive: true,
      emissiveIntensity: 0.8,
      group: "head"
    })
  }

  // Glowing eyes
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("forest_sprite"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.06, 1.58, 0.12],
      scale: [0.04, 0.05, 0.03],
      colorType: "glow",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 3,
      group: "head"
    })
  }

  // Ethereal body rings
  for (let ring = 0; ring < 4; ring++) {
    const segments = 6
    for (let seg = 0; seg < segments; seg++) {
      const angle = (seg / segments) * Math.PI * 2 + ring * 0.4
      const ringSize = 0.12 + ring * 0.02
      boxes.push({
        id: id("forest_sprite"),
        name: `Body Ring ${ring}_${seg}`,
        position: [Math.cos(angle) * ringSize, 1.4 - ring * 0.12, Math.sin(angle) * ringSize],
        scale: [0.05, 0.1, 0.05],
        colorType: ring % 2 === 0 ? "primary" : "glow",
        colorMultiplier: ring % 2 === 0 ? 1 : 2,
        emissive: ring % 2 !== 0,
        emissiveIntensity: ring % 2 !== 0 ? 2 : 0,
        group: "body"
      })
    }
  }

  // Wispy arms
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id("forest_sprite"),
        name: `Arm ${sideName} ${i}`,
        position: [side * (0.18 + i * 0.04), 1.35 - i * 0.08, 0],
        scale: [0.05, 0.08, 0.04],
        colorType: i < 2 ? "glow" : "primary",
        colorMultiplier: i < 2 ? 1.8 : 0.8,
        emissive: i < 2,
        emissiveIntensity: i < 2 ? 1.8 : 0,
        group: "arms"
      })
    }
  }

  // Nature wisps trailing below
  for (let trail = 0; trail < 5; trail++) {
    const angle = (trail / 5) * Math.PI * 2
    for (let seg = 0; seg < 3; seg++) {
      boxes.push({
        id: id("forest_sprite"),
        name: `Trail ${trail}_${seg}`,
        position: [Math.cos(angle) * 0.08, 0.9 - seg * 0.15, Math.sin(angle) * 0.08],
        scale: [0.04, 0.1, 0.04],
        colorType: "glow",
        colorMultiplier: 1.5 - seg * 0.3,
        emissive: true,
        emissiveIntensity: 1.5 - seg * 0.3,
        group: "trails"
      })
    }
  }

  // Floating pollen particles
  for (let p = 0; p < 6; p++) {
    const angle = (p / 6) * Math.PI * 2
    boxes.push({
      id: id("forest_sprite"),
      name: `Pollen ${p}`,
      position: [Math.cos(angle) * 0.3, 1.4 + Math.sin(p * 2) * 0.15, Math.sin(angle) * 0.25],
      scale: [0.02, 0.02, 0.02],
      colorType: "secondary",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["head", "body", "arms", "trails", "effects"]
  }
}

export const FOREST_SPRITE_HEIGHT = 1.8

// ============================================
// DIRE WOLF - Alpha predator of the dark woods
// ============================================

export function createDireWolfModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Large wolf head
  for (let hx = -1; hx <= 1; hx++) {
    for (let hz = 0; hz < 3; hz++) {
      boxes.push({
        id: id("dire_wolf"),
        name: `Head ${hx}_${hz}`,
        position: [hx * 0.12, 1.7, 0.32 + hz * 0.12],
        scale: [0.14, 0.16, 0.14],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }

  // Snout
  for (let sz = 0; sz < 3; sz++) {
    boxes.push({
      id: id("dire_wolf"),
      name: `Snout ${sz}`,
      position: [0, 1.62 - sz * 0.02, 0.68 + sz * 0.12],
      scale: [0.12 - sz * 0.02, 0.12, 0.12],
      colorType: sz < 2 ? "primary" : "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "head"
    })
  }

  // Ears
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("dire_wolf"),
      name: `Ear ${side > 0 ? "R" : "L"}`,
      position: [side * 0.14, 1.92, 0.4],
      scale: [0.06, 0.12, 0.05],
      colorType: "primary",
      colorMultiplier: 1.1,
      emissive: false,
      emissiveIntensity: 0,
      group: "head"
    })
  }

  // Fierce glowing eyes
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("dire_wolf"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.13, 1.72, 0.58],
      scale: [0.06, 0.05, 0.04],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "head"
    })
  }

  // Fangs
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("dire_wolf"),
      name: `Fang ${side > 0 ? "R" : "L"}`,
      position: [side * 0.06, 1.48, 0.92],
      scale: [0.025, 0.1, 0.025],
      colorType: "secondary",
      colorMultiplier: 0.9,
      emissive: false,
      emissiveIntensity: 0,
      group: "head"
    })
  }

  // Thick neck with mane
  for (let i = 0; i < 3; i++) {
    boxes.push({
      id: id("dire_wolf"),
      name: `Neck ${i}`,
      position: [0, 1.58 - i * 0.12, 0.18 - i * 0.08],
      scale: [0.22, 0.14, 0.2],
      colorType: i === 0 ? "secondary" : "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }

  // Massive body
  for (let seg = 0; seg < 7; seg++) {
    const segWidth = 0.38 - Math.abs(seg - 3) * 0.03
    for (let layer = 0; layer < 2; layer++) {
      boxes.push({
        id: id("dire_wolf"),
        name: `Body ${seg}_${layer}`,
        position: [0, 1.35 - layer * 0.2, -seg * 0.2],
        scale: [segWidth, 0.22, 0.22],
        colorType: seg % 2 === 0 ? "primary" : "secondary",
        colorMultiplier: seg % 2 === 0 ? 1 : 0.95,
        emissive: false,
        emissiveIntensity: 0,
        group: "body"
      })
    }
  }

  // Four powerful legs
  const legPositions: [number, number][] = [
    [0.22, 0.08], [-0.22, 0.08], [0.22, -1.1], [-0.22, -1.1]
  ]
  for (let legIdx = 0; legIdx < 4; legIdx++) {
    const [lx, lz] = legPositions[legIdx]
    const legName = legIdx < 2 ? (legIdx === 0 ? "FR" : "FL") : (legIdx === 2 ? "BR" : "BL")
    
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id("dire_wolf"),
        name: `Leg ${legName} ${i}`,
        position: [lx, 1.1 - i * 0.18, lz],
        scale: [0.14, 0.18, 0.14],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Paw
    boxes.push({
      id: id("dire_wolf"),
      name: `Paw ${legName}`,
      position: [lx, 0.35, lz + 0.04],
      scale: [0.12, 0.1, 0.16],
      colorType: "secondary",
      colorMultiplier: 0.85,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
  }

  // Bushy tail
  for (let i = 0; i < 5; i++) {
    boxes.push({
      id: id("dire_wolf"),
      name: `Tail ${i}`,
      position: [0, 1.38 + i * 0.05, -1.4 - i * 0.12],
      scale: [0.1 - i * 0.01, 0.1, 0.14],
      colorType: i < 3 ? "primary" : "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }

  return {
    boxes,
    groups: ["head", "body", "legs"]
  }
}

export const DIRE_WOLF_HEIGHT = 2.0

// ============================================
// CRYSTAL GOLEM - Living gemstone guardian
// ============================================

export function createCrystalGolemModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Crystalline head (angular)
  for (let face = 0; face < 5; face++) {
    const angle = (face / 5) * Math.PI * 2
    boxes.push({
      id: id("crystal_golem"),
      name: `Head Face ${face}`,
      position: [Math.cos(angle) * 0.12, 2.8, Math.sin(angle) * 0.1],
      scale: [0.14, 0.2, 0.12],
      colorType: face % 2 === 0 ? "primary" : "glow",
      colorMultiplier: face % 2 === 0 ? 1 : 2,
      emissive: face % 2 !== 0,
      emissiveIntensity: face % 2 !== 0 ? 2 : 0,
      group: "head"
    })
  }

  // Crystal eye facets
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("crystal_golem"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.1, 2.78, 0.15],
      scale: [0.06, 0.08, 0.04],
      colorType: "glow",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 3,
      group: "head"
    })
  }

  // Crystal neck
  boxes.push({
    id: id("crystal_golem"),
    name: "Neck",
    position: [0, 2.55, 0],
    scale: [0.16, 0.15, 0.14],
    colorType: "primary",
    colorMultiplier: 1.1,
    emissive: false,
    emissiveIntensity: 0,
    group: "torso"
  })

  // Crystalline torso (geometric)
  for (let ty = 0; ty < 6; ty++) {
    const width = 0.5 - Math.abs(ty - 2.5) * 0.05
    for (let facet = 0; facet < 6; facet++) {
      const angle = (facet / 6) * Math.PI * 2 + ty * 0.2
      boxes.push({
        id: id("crystal_golem"),
        name: `Torso ${ty}_${facet}`,
        position: [Math.cos(angle) * width * 0.4, 2.3 - ty * 0.2, Math.sin(angle) * width * 0.35],
        scale: [0.12, 0.2, 0.12],
        colorType: (ty + facet) % 3 === 0 ? "glow" : "primary",
        colorMultiplier: (ty + facet) % 3 === 0 ? 1.5 : 1,
        emissive: (ty + facet) % 3 === 0,
        emissiveIntensity: (ty + facet) % 3 === 0 ? 1.5 : 0,
        group: "torso"
      })
    }
  }

  // Core glow
  boxes.push({
    id: id("crystal_golem"),
    name: "Core",
    position: [0, 2.0, 0],
    scale: [0.2, 0.25, 0.2],
    colorType: "glow",
    colorMultiplier: 2.5,
    emissive: true,
    emissiveIntensity: 2.5,
    group: "torso"
  })

  // Crystal shoulders
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    boxes.push({
      id: id("crystal_golem"),
      name: `Shoulder ${sideName}`,
      position: [side * 0.45, 2.3, 0],
      scale: [0.2, 0.18, 0.18],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Shoulder spikes
    for (let spike = 0; spike < 2; spike++) {
      boxes.push({
        id: id("crystal_golem"),
        name: `Shoulder Spike ${sideName} ${spike}`,
        position: [side * (0.5 + spike * 0.05), 2.42 + spike * 0.1, 0],
        scale: [0.06, 0.14, 0.06],
        colorType: "glow",
        colorMultiplier: 2,
        emissive: true,
        emissiveIntensity: 2,
        group: "arms"
      })
    }
  }

  // Crystal arms
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id("crystal_golem"),
        name: `Arm ${sideName} ${i}`,
        position: [side * 0.5, 2.05 - i * 0.2, 0],
        scale: [0.14, 0.2, 0.14],
        colorType: i === 2 ? "glow" : "primary",
        colorMultiplier: i === 2 ? 1.5 : 1,
        emissive: i === 2,
        emissiveIntensity: i === 2 ? 1.5 : 0,
        group: "arms"
      })
    }
    // Crystal fist
    boxes.push({
      id: id("crystal_golem"),
      name: `Fist ${sideName}`,
      position: [side * 0.5, 1.2, 0],
      scale: [0.2, 0.2, 0.2],
      colorType: "primary",
      colorMultiplier: 1.1,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
  }

  // Crystal legs
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id("crystal_golem"),
        name: `Leg ${sideName} ${i}`,
        position: [side * 0.18, 1.0 - i * 0.2, 0],
        scale: [0.18, 0.2, 0.18],
        colorType: i === 1 ? "glow" : "primary",
        colorMultiplier: i === 1 ? 1.3 : 1,
        emissive: i === 1,
        emissiveIntensity: i === 1 ? 1.3 : 0,
        group: "legs"
      })
    }
    // Foot
    boxes.push({
      id: id("crystal_golem"),
      name: `Foot ${sideName}`,
      position: [side * 0.18, 0.15, 0.08],
      scale: [0.22, 0.14, 0.28],
      colorType: "primary",
      colorMultiplier: 0.9,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
  }

  // Floating crystal shards
  for (let shard = 0; shard < 6; shard++) {
    const angle = (shard / 6) * Math.PI * 2
    boxes.push({
      id: id("crystal_golem"),
      name: `Shard ${shard}`,
      position: [Math.cos(angle) * 0.6, 2.0 + Math.sin(shard * 1.5) * 0.3, Math.sin(angle) * 0.5],
      scale: [0.05, 0.1, 0.05],
      colorType: "glow",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["head", "torso", "arms", "legs", "effects"]
  }
}

export const CRYSTAL_GOLEM_HEIGHT = 3.0

// ============================================
// MUSHROOM TENDER - Fungal forest guardian
// ============================================

export function createMushroomTenderModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Mushroom cap head
  for (let ring = 0; ring < 4; ring++) {
    const ringSize = 0.25 - ring * 0.03
    const segments = 8
    for (let seg = 0; seg < segments; seg++) {
      const angle = (seg / segments) * Math.PI * 2
      boxes.push({
        id: id("mushroom_tender"),
        name: `Cap ${ring}_${seg}`,
        position: [Math.cos(angle) * ringSize, 2.0 - ring * 0.08, Math.sin(angle) * ringSize],
        scale: [0.12, 0.1, 0.12],
        colorType: ring < 2 ? "primary" : "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }

  // Cap spots (glowing)
  for (let spot = 0; spot < 5; spot++) {
    const angle = (spot / 5) * Math.PI * 2
    boxes.push({
      id: id("mushroom_tender"),
      name: `Spot ${spot}`,
      position: [Math.cos(angle) * 0.18, 2.08, Math.sin(angle) * 0.15],
      scale: [0.06, 0.04, 0.06],
      colorType: "glow",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "head"
    })
  }

  // Eyes under cap
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("mushroom_tender"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.08, 1.72, 0.15],
      scale: [0.06, 0.08, 0.04],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "head"
    })
  }

  // Stem body
  for (let stem = 0; stem < 5; stem++) {
    const stemWidth = 0.22 - Math.abs(stem - 2) * 0.02
    boxes.push({
      id: id("mushroom_tender"),
      name: `Stem ${stem}`,
      position: [0, 1.55 - stem * 0.18, 0],
      scale: [stemWidth, 0.18, stemWidth * 0.9],
      colorType: stem % 2 === 0 ? "secondary" : "primary",
      colorMultiplier: stem % 2 === 0 ? 0.9 : 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }

  // Arm-like tendrils
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id("mushroom_tender"),
        name: `Arm ${sideName} ${i}`,
        position: [side * (0.2 + i * 0.06), 1.4 - i * 0.1, 0],
        scale: [0.08, 0.12, 0.08],
        colorType: i < 2 ? "primary" : "glow",
        colorMultiplier: i < 2 ? 1 : 1.5,
        emissive: i >= 2,
        emissiveIntensity: i >= 2 ? 1.5 : 0,
        group: "arms"
      })
    }
  }

  // Root legs
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let root = 0; root < 3; root++) {
      const rootAngle = (root / 3) * Math.PI * 0.3 + (side > 0 ? 0 : Math.PI)
      for (let seg = 0; seg < 3; seg++) {
        boxes.push({
          id: id("mushroom_tender"),
          name: `Root ${sideName} ${root}_${seg}`,
          position: [
            side * 0.12 + Math.cos(rootAngle) * seg * 0.05,
            0.7 - seg * 0.18,
            Math.sin(rootAngle) * seg * 0.05
          ],
          scale: [0.1, 0.18, 0.1],
          colorType: "secondary",
          colorMultiplier: 0.85,
          emissive: false,
          emissiveIntensity: 0,
          group: "legs"
        })
      }
    }
  }

  // Spore particles
  for (let spore = 0; spore < 8; spore++) {
    const angle = (spore / 8) * Math.PI * 2
    boxes.push({
      id: id("mushroom_tender"),
      name: `Spore ${spore}`,
      position: [
        Math.cos(angle) * 0.35,
        1.8 + Math.sin(spore * 1.5) * 0.2,
        Math.sin(angle) * 0.3
      ],
      scale: [0.03, 0.03, 0.03],
      colorType: "glow",
      colorMultiplier: 1.8,
      emissive: true,
      emissiveIntensity: 1.8,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["head", "body", "arms", "legs", "effects"]
  }
}

export const MUSHROOM_TENDER_HEIGHT = 2.2

// ============================================
// RUIN WRAITH - Ancient spirit haunting forgotten places
// ============================================

export function createRuinWraithModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Ghostly hooded head
  for (let hx = -1; hx <= 1; hx++) {
    for (let hz = -1; hz <= 1; hz++) {
      if (hz > 0 || hx === 0) {
        boxes.push({
          id: id("ruin_wraith"),
          name: `Hood ${hx}_${hz}`,
          position: [hx * 0.1, 2.2, hz * 0.08],
          scale: [0.12, 0.16, 0.1],
          colorType: "primary",
          colorMultiplier: 0.8,
          emissive: false,
          emissiveIntensity: 0,
          group: "head"
        })
      }
    }
  }

  // Spectral eyes
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("ruin_wraith"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.06, 2.15, 0.12],
      scale: [0.05, 0.06, 0.03],
      colorType: "glow",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 3,
      group: "head"
    })
  }

  // Ethereal body (fading downward)
  for (let ty = 0; ty < 8; ty++) {
    const width = 0.25 - ty * 0.015
    const alpha = 1 - ty * 0.08
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: id("ruin_wraith"),
        name: `Body ${ty}_${tx}`,
        position: [tx * width * 0.35, 2.0 - ty * 0.15, 0],
        scale: [width * 0.35, 0.15, width * 0.28],
        colorType: ty > 4 ? "glow" : "primary",
        colorMultiplier: ty > 4 ? alpha * 0.8 : alpha,
        emissive: ty > 4,
        emissiveIntensity: ty > 4 ? alpha * 0.8 : 0,
        group: "body"
      })
    }
  }

  // Spectral arms
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 5; i++) {
      boxes.push({
        id: id("ruin_wraith"),
        name: `Arm ${sideName} ${i}`,
        position: [side * (0.25 + i * 0.05), 1.85 - i * 0.12, 0.04 * i],
        scale: [0.06, 0.12, 0.05],
        colorType: i > 2 ? "glow" : "primary",
        colorMultiplier: i > 2 ? 1.5 : 0.9,
        emissive: i > 2,
        emissiveIntensity: i > 2 ? 1.5 : 0,
        group: "arms"
      })
    }
    // Ghostly claws
    for (let claw = 0; claw < 3; claw++) {
      boxes.push({
        id: id("ruin_wraith"),
        name: `Claw ${sideName} ${claw}`,
        position: [side * (0.45 + claw * 0.02), 1.2 - claw * 0.08, 0.08 + claw * 0.04],
        scale: [0.02, 0.1, 0.02],
        colorType: "glow",
        colorMultiplier: 2,
        emissive: true,
        emissiveIntensity: 2,
        group: "arms"
      })
    }
  }

  // Fading tail wisps
  for (let wisp = 0; wisp < 5; wisp++) {
    const angle = (wisp / 5 - 0.5) * Math.PI * 0.5
    for (let seg = 0; seg < 4; seg++) {
      boxes.push({
        id: id("ruin_wraith"),
        name: `Wisp ${wisp}_${seg}`,
        position: [Math.sin(angle) * (0.1 + seg * 0.03), 0.75 - seg * 0.15, Math.cos(angle) * 0.05],
        scale: [0.04, 0.1, 0.04],
        colorType: "glow",
        colorMultiplier: 1.2 - seg * 0.2,
        emissive: true,
        emissiveIntensity: 1.2 - seg * 0.2,
        group: "trails"
      })
    }
  }

  // Soul fragments orbiting
  for (let soul = 0; soul < 4; soul++) {
    const angle = (soul / 4) * Math.PI * 2
    boxes.push({
      id: id("ruin_wraith"),
      name: `Soul ${soul}`,
      position: [Math.cos(angle) * 0.4, 1.8 + Math.sin(soul * 2) * 0.15, Math.sin(angle) * 0.35],
      scale: [0.05, 0.08, 0.05],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["head", "body", "arms", "trails", "effects"]
  }
}

export const RUIN_WRAITH_HEIGHT = 2.4

// ============================================
// ANCIENT GUARDIAN - Titanic protector of sacred places
// ============================================

export function createAncientGuardianModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Massive stone head
  for (let hx = -1; hx <= 1; hx++) {
    for (let hy = 0; hy < 2; hy++) {
      for (let hz = -1; hz <= 1; hz++) {
        boxes.push({
          id: id("ancient_guardian"),
          name: `Head ${hx}_${hy}_${hz}`,
          position: [hx * 0.2, 4.6 + hy * 0.22, hz * 0.16],
          scale: [0.22, 0.24, 0.18],
          colorType: "primary",
          colorMultiplier: 1,
          emissive: false,
          emissiveIntensity: 0,
          group: "head"
        })
      }
    }
  }

  // Rune markings on forehead
  for (let rune = 0; rune < 3; rune++) {
    boxes.push({
      id: id("ancient_guardian"),
      name: `Head Rune ${rune}`,
      position: [(rune - 1) * 0.12, 4.9, 0.22],
      scale: [0.08, 0.08, 0.02],
      colorType: "glow",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "head"
    })
  }

  // Ancient glowing eyes
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("ancient_guardian"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.2, 4.65, 0.28],
      scale: [0.1, 0.12, 0.06],
      colorType: "glow",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 3,
      group: "head"
    })
  }

  // Neck
  for (let i = 0; i < 2; i++) {
    boxes.push({
      id: id("ancient_guardian"),
      name: `Neck ${i}`,
      position: [0, 4.35 - i * 0.15, 0],
      scale: [0.28, 0.15, 0.24],
      colorType: "primary",
      colorMultiplier: 0.9,
      emissive: false,
      emissiveIntensity: 0,
      group: "torso"
    })
  }

  // Massive stone torso
  for (let ty = 0; ty < 8; ty++) {
    const width = 0.7 - Math.abs(ty - 3.5) * 0.05
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: id("ancient_guardian"),
        name: `Torso ${ty}_${tx}`,
        position: [tx * width * 0.35, 4.0 - ty * 0.22, 0],
        scale: [width * 0.38, 0.22, width * 0.32],
        colorType: ty % 3 === 0 ? "secondary" : "primary",
        colorMultiplier: ty % 3 === 0 ? 0.85 : 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "torso"
      })
    }
  }

  // Ancient rune core in chest
  boxes.push({
    id: id("ancient_guardian"),
    name: "Rune Core",
    position: [0, 3.5, 0.4],
    scale: [0.22, 0.28, 0.08],
    colorType: "glow",
    colorMultiplier: 2.5,
    emissive: true,
    emissiveIntensity: 2.5,
    group: "torso"
  })

  // Rune lines from core
  for (let line = 0; line < 4; line++) {
    const angle = (line / 4) * Math.PI - Math.PI / 2
    boxes.push({
      id: id("ancient_guardian"),
      name: `Rune Line ${line}`,
      position: [Math.cos(angle) * 0.3, 3.5 + Math.sin(angle) * 0.3, 0.35],
      scale: [0.04, 0.15, 0.03],
      colorType: "glow",
      colorMultiplier: 1.8,
      emissive: true,
      emissiveIntensity: 1.8,
      group: "torso"
    })
  }

  // Massive shoulder stones
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    boxes.push({
      id: id("ancient_guardian"),
      name: `Shoulder ${sideName}`,
      position: [side * 0.75, 4.1, 0],
      scale: [0.35, 0.3, 0.3],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Shoulder rune
    boxes.push({
      id: id("ancient_guardian"),
      name: `Shoulder Rune ${sideName}`,
      position: [side * 0.75, 4.2, 0.2],
      scale: [0.1, 0.1, 0.04],
      colorType: "glow",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "arms"
    })
  }

  // Massive stone arms
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 5; i++) {
      boxes.push({
        id: id("ancient_guardian"),
        name: `Arm ${sideName} ${i}`,
        position: [side * 0.72, 3.7 - i * 0.25, 0],
        scale: [0.25, 0.25, 0.25],
        colorType: i === 2 ? "secondary" : "primary",
        colorMultiplier: i === 2 ? 0.9 : 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
    // Massive fist
    boxes.push({
      id: id("ancient_guardian"),
      name: `Fist ${sideName}`,
      position: [side * 0.72, 2.4, 0],
      scale: [0.35, 0.35, 0.35],
      colorType: "primary",
      colorMultiplier: 0.95,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Fist rune
    boxes.push({
      id: id("ancient_guardian"),
      name: `Fist Rune ${sideName}`,
      position: [side * 0.72, 2.4, 0.2],
      scale: [0.1, 0.1, 0.06],
      colorType: "glow",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "arms"
    })
  }

  // Waist
  for (let wx = -2; wx <= 2; wx++) {
    boxes.push({
      id: id("ancient_guardian"),
      name: `Waist ${wx}`,
      position: [wx * 0.18, 2.0, 0],
      scale: [0.2, 0.18, 0.25],
      colorType: "secondary",
      colorMultiplier: 0.8,
      emissive: false,
      emissiveIntensity: 0,
      group: "torso"
    })
  }

  // Massive pillar legs
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 5; i++) {
      boxes.push({
        id: id("ancient_guardian"),
        name: `Leg ${sideName} ${i}`,
        position: [side * 0.35, 1.7 - i * 0.28, 0],
        scale: [0.32, 0.28, 0.32],
        colorType: i === 2 ? "secondary" : "primary",
        colorMultiplier: i === 2 ? 0.85 : 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Massive foot
    boxes.push({
      id: id("ancient_guardian"),
      name: `Foot ${sideName}`,
      position: [side * 0.35, 0.28, 0.15],
      scale: [0.4, 0.22, 0.55],
      colorType: "primary",
      colorMultiplier: 0.7,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
    // Foot rune
    boxes.push({
      id: id("ancient_guardian"),
      name: `Foot Rune ${sideName}`,
      position: [side * 0.35, 0.35, 0.42],
      scale: [0.1, 0.08, 0.04],
      colorType: "glow",
      colorMultiplier: 1.5,
      emissive: true,
      emissiveIntensity: 1.5,
      group: "legs"
    })
  }

  // Floating rune stones
  for (let stone = 0; stone < 4; stone++) {
    const angle = (stone / 4) * Math.PI * 2
    boxes.push({
      id: id("ancient_guardian"),
      name: `Rune Stone ${stone}`,
      position: [Math.cos(angle) * 0.9, 3.0 + Math.sin(stone * 1.3) * 0.4, Math.sin(angle) * 0.8],
      scale: [0.08, 0.12, 0.08],
      colorType: "glow",
      colorMultiplier: 2.2,
      emissive: true,
      emissiveIntensity: 2.2,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["head", "torso", "arms", "legs", "effects"]
  }
}

export const ANCIENT_GUARDIAN_HEIGHT = 5.1
