import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Frozen Zone Enemy Templates
 * Based on: lib/world/enemy-templates.ts FROZEN_ENEMIES
 */

let idCounter = 0
function id(prefix: string) { return `${prefix}_${idCounter++}` }

// ============================================
// FROST WISP - Ethereal spirit of eternal winter
// ============================================

export function createFrostWispModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Central icy core (glowing)
  boxes.push({
    id: id("frost_wisp"),
    name: "Core",
    position: [0, 1.5, 0],
    scale: [0.15, 0.2, 0.15],
    colorType: "glow",
    colorMultiplier: 3,
    emissive: true,
    emissiveIntensity: 3,
    group: "core"
  })

  // Inner ice crystal ring
  for (let i = 0; i < 6; i++) {
    const theta = (i / 6) * Math.PI * 2
    boxes.push({
      id: id("frost_wisp"),
      name: `Inner Ring ${i}`,
      position: [Math.cos(theta) * 0.15, 1.5, Math.sin(theta) * 0.15],
      scale: [0.08, 0.12, 0.08],
      colorType: "primary",
      colorMultiplier: 1.2,
      emissive: true,
      emissiveIntensity: 1.2,
      group: "core"
    })
  }

  // Floating icy body (ethereal layers)
  for (let ring = 0; ring < 5; ring++) {
    const ringY = 1.2 + ring * 0.18
    const ringSize = 0.2 + Math.sin(ring * 0.8) * 0.08
    const segments = 6 + ring
    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * Math.PI * 2 + ring * 0.3
      boxes.push({
        id: id("frost_wisp"),
        name: `Body Ring ${ring}_${i}`,
        position: [Math.cos(theta) * ringSize, ringY, Math.sin(theta) * ringSize],
        scale: [0.06, 0.1, 0.06],
        colorType: ring % 2 === 0 ? "glow" : "primary",
        colorMultiplier: ring % 2 === 0 ? 2 : 1,
        emissive: ring % 2 === 0,
        emissiveIntensity: ring % 2 === 0 ? 2 : 0,
        group: "body"
      })
    }
  }

  // Eyes (cold white glow)
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("frost_wisp"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.08, 1.65, 0.12],
      scale: [0.05, 0.05, 0.03],
      colorType: "glow",
      colorMultiplier: 4,
      emissive: true,
      emissiveIntensity: 4,
      group: "face"
    })
  }

  // Trailing ice crystals below
  for (let trail = 0; trail < 5; trail++) {
    const angle = (trail / 5) * Math.PI * 2
    for (let seg = 0; seg < 4; seg++) {
      boxes.push({
        id: id("frost_wisp"),
        name: `Trail ${trail}_${seg}`,
        position: [
          Math.cos(angle) * (0.1 + seg * 0.03),
          1.0 - seg * 0.12,
          Math.sin(angle) * (0.1 + seg * 0.03)
        ],
        scale: [0.04, 0.1, 0.04],
        colorType: "primary",
        colorMultiplier: 1.5 - seg * 0.2,
        emissive: true,
        emissiveIntensity: 1.5 - seg * 0.2,
        group: "trails"
      })
    }
  }

  // Snowflake particles
  for (let flake = 0; flake < 6; flake++) {
    const angle = (flake / 6) * Math.PI * 2
    boxes.push({
      id: id("frost_wisp"),
      name: `Snowflake ${flake}`,
      position: [
        Math.cos(angle) * 0.4,
        1.5 + Math.sin(flake * 2) * 0.2,
        Math.sin(angle) * 0.35
      ],
      scale: [0.03, 0.03, 0.01],
      colorType: "glow",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["core", "body", "face", "trails", "effects"]
  }
}

export const FROST_WISP_HEIGHT = 1.9

// ============================================
// ICE WOLF - Predator of the frozen wastes
// ============================================

export function createIceWolfModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Wolf head with ice crystals
  for (let hx = -1; hx <= 1; hx++) {
    for (let hz = 0; hz < 3; hz++) {
      boxes.push({
        id: id("ice_wolf"),
        name: `Head ${hx}_${hz}`,
        position: [hx * 0.1, 1.35, 0.28 + hz * 0.1],
        scale: [0.12, 0.14, 0.12],
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
      id: id("ice_wolf"),
      name: `Snout ${sz}`,
      position: [0, 1.28 - sz * 0.02, 0.58 + sz * 0.1],
      scale: [0.1 - sz * 0.015, 0.1, 0.1],
      colorType: sz < 2 ? "primary" : "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "head"
    })
  }

  // Ice crystal mane
  for (let crystal = 0; crystal < 5; crystal++) {
    const angle = (crystal / 5 - 0.5) * Math.PI * 0.6
    boxes.push({
      id: id("ice_wolf"),
      name: `Mane Crystal ${crystal}`,
      position: [Math.sin(angle) * 0.15, 1.55 + crystal * 0.05, 0.2 - Math.cos(angle) * 0.1],
      scale: [0.04, 0.12, 0.04],
      colorType: "glow",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "head"
    })
  }

  // Glowing icy eyes
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("ice_wolf"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.12, 1.4, 0.48],
      scale: [0.06, 0.05, 0.04],
      colorType: "glow",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 3,
      group: "head"
    })
  }

  // Ice fangs
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("ice_wolf"),
      name: `Fang ${side > 0 ? "R" : "L"}`,
      position: [side * 0.05, 1.15, 0.78],
      scale: [0.02, 0.08, 0.02],
      colorType: "glow",
      colorMultiplier: 1.5,
      emissive: true,
      emissiveIntensity: 1.5,
      group: "head"
    })
  }

  // Neck
  for (let i = 0; i < 2; i++) {
    boxes.push({
      id: id("ice_wolf"),
      name: `Neck ${i}`,
      position: [0, 1.22 - i * 0.1, 0.12 - i * 0.06],
      scale: [0.18, 0.12, 0.16],
      colorType: i === 0 ? "primary" : "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }

  // Body (frost-covered)
  for (let seg = 0; seg < 6; seg++) {
    const segWidth = 0.32 - Math.abs(seg - 2.5) * 0.03
    for (let layer = 0; layer < 2; layer++) {
      boxes.push({
        id: id("ice_wolf"),
        name: `Body ${seg}_${layer}`,
        position: [0, 1.1 - layer * 0.18, -seg * 0.18],
        scale: [segWidth, 0.2, 0.2],
        colorType: seg % 2 === 0 ? "primary" : "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "body"
      })
    }
  }

  // Ice spine crystals
  for (let i = 0; i < 5; i++) {
    boxes.push({
      id: id("ice_wolf"),
      name: `Spine Crystal ${i}`,
      position: [0, 1.3, 0.05 - i * 0.18],
      scale: [0.04, 0.1 - i * 0.01, 0.06],
      colorType: "glow",
      colorMultiplier: 1.8,
      emissive: true,
      emissiveIntensity: 1.8,
      group: "body"
    })
  }

  // Four legs
  const legPositions: [number, number][] = [
    [0.2, 0.05], [-0.2, 0.05], [0.2, -0.88], [-0.2, -0.88]
  ]
  for (let legIdx = 0; legIdx < 4; legIdx++) {
    const [lx, lz] = legPositions[legIdx]
    const legName = legIdx < 2 ? (legIdx === 0 ? "FR" : "FL") : (legIdx === 2 ? "BR" : "BL")
    
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: id("ice_wolf"),
        name: `Leg ${legName} ${i}`,
        position: [lx, 0.88 - i * 0.15, lz],
        scale: [0.11, 0.15, 0.11],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Paw with frost
    boxes.push({
      id: id("ice_wolf"),
      name: `Paw ${legName}`,
      position: [lx, 0.38, lz + 0.03],
      scale: [0.1, 0.08, 0.14],
      colorType: "secondary",
      colorMultiplier: 0.9,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
    // Frost glow under paw
    boxes.push({
      id: id("ice_wolf"),
      name: `Frost ${legName}`,
      position: [lx, 0.32, lz],
      scale: [0.06, 0.03, 0.06],
      colorType: "glow",
      colorMultiplier: 1.5,
      emissive: true,
      emissiveIntensity: 1.5,
      group: "effects"
    })
  }

  // Icy tail
  for (let i = 0; i < 5; i++) {
    boxes.push({
      id: id("ice_wolf"),
      name: `Tail ${i}`,
      position: [0, 1.15 + i * 0.04, -1.08 - i * 0.1],
      scale: [0.08 - i * 0.01, 0.08, 0.12],
      colorType: i < 3 ? "primary" : "glow",
      colorMultiplier: i < 3 ? 1 : 1.5,
      emissive: i >= 3,
      emissiveIntensity: i >= 3 ? 1.5 : 0,
      group: "body"
    })
  }

  return {
    boxes,
    groups: ["head", "body", "legs", "effects"]
  }
}

export const ICE_WOLF_HEIGHT = 1.6

// ============================================
// FROZEN REVENANT - Warrior frozen in eternal death
// ============================================

export function createFrozenRevenantModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Frozen helmet (icy, cracked)
  for (let hx = -1; hx <= 1; hx++) {
    for (let hz = -1; hz <= 1; hz++) {
      boxes.push({
        id: id("frozen_revenant"),
        name: `Helmet ${hx}_${hz}`,
        position: [hx * 0.1, 2.05, hz * 0.08],
        scale: [0.12, 0.14, 0.1],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }

  // Ice crystals on helm
  for (let crystal = 0; crystal < 3; crystal++) {
    const angle = (crystal / 3 - 0.5) * Math.PI * 0.5
    boxes.push({
      id: id("frozen_revenant"),
      name: `Helm Crystal ${crystal}`,
      position: [Math.sin(angle) * 0.18, 2.25 + crystal * 0.04, Math.cos(angle) * 0.08],
      scale: [0.04, 0.12, 0.04],
      colorType: "glow",
      colorMultiplier: 1.8,
      emissive: true,
      emissiveIntensity: 1.8,
      group: "head"
    })
  }

  // Ghostly visor glow
  for (let vx = -2; vx <= 2; vx++) {
    boxes.push({
      id: id("frozen_revenant"),
      name: `Visor ${vx}`,
      position: [vx * 0.05, 2.05, 0.15],
      scale: [0.06, 0.04, 0.02],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "head"
    })
  }

  // Neck
  boxes.push({
    id: id("frozen_revenant"),
    name: "Neck",
    position: [0, 1.88, 0],
    scale: [0.1, 0.08, 0.08],
    colorType: "secondary",
    colorMultiplier: 0.7,
    emissive: false,
    emissiveIntensity: 0,
    group: "torso"
  })

  // Frozen armored torso
  for (let ty = 0; ty < 5; ty++) {
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: id("frozen_revenant"),
        name: `Torso ${ty}_${tx}`,
        position: [tx * 0.1, 1.72 - ty * 0.14, 0],
        scale: [0.12, 0.14, 0.14],
        colorType: ty % 2 === 0 ? "primary" : "secondary",
        colorMultiplier: ty % 2 === 0 ? 1 : 0.85,
        emissive: false,
        emissiveIntensity: 0,
        group: "torso"
      })
    }
  }

  // Frost cracks on chest (glowing)
  for (let crack = 0; crack < 3; crack++) {
    boxes.push({
      id: id("frozen_revenant"),
      name: `Frost Crack ${crack}`,
      position: [(crack - 1) * 0.08, 1.6 - crack * 0.08, 0.1],
      scale: [0.02, 0.1, 0.02],
      colorType: "glow",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "torso"
    })
  }

  // Frozen shoulder guards
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let sy = 0; sy < 2; sy++) {
      boxes.push({
        id: id("frozen_revenant"),
        name: `Shoulder ${sideName} ${sy}`,
        position: [side * 0.35, 1.78 - sy * 0.08, 0],
        scale: [0.12, 0.1, 0.12],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "shoulders"
      })
    }
    // Ice spike on shoulder
    boxes.push({
      id: id("frozen_revenant"),
      name: `Shoulder Spike ${sideName}`,
      position: [side * 0.38, 1.88, 0],
      scale: [0.05, 0.12, 0.05],
      colorType: "glow",
      colorMultiplier: 1.5,
      emissive: true,
      emissiveIntensity: 1.5,
      group: "shoulders"
    })
  }

  // Arms (frozen, partially ethereal)
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 5; i++) {
      boxes.push({
        id: id("frozen_revenant"),
        name: `Arm ${sideName} ${i}`,
        position: [side * 0.35, 1.6 - i * 0.12, 0],
        scale: [0.08, 0.12, 0.08],
        colorType: i % 2 === 0 ? "primary" : "glow",
        colorMultiplier: i % 2 === 0 ? 0.9 : 0.8,
        emissive: i % 2 !== 0,
        emissiveIntensity: i % 2 !== 0 ? 0.8 : 0,
        group: "arms"
      })
    }
    // Frozen gauntlet
    boxes.push({
      id: id("frozen_revenant"),
      name: `Gauntlet ${sideName}`,
      position: [side * 0.35, 0.98, 0.03],
      scale: [0.1, 0.1, 0.12],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
  }

  // Belt
  for (let bx = -2; bx <= 2; bx++) {
    boxes.push({
      id: id("frozen_revenant"),
      name: `Belt ${bx}`,
      position: [bx * 0.07, 1.0, 0],
      scale: [0.08, 0.06, 0.1],
      colorType: "secondary",
      colorMultiplier: 0.6,
      emissive: false,
      emissiveIntensity: 0,
      group: "torso"
    })
  }

  // Legs (armored, icy)
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 5; i++) {
      boxes.push({
        id: id("frozen_revenant"),
        name: `Leg ${sideName} ${i}`,
        position: [side * 0.12, 0.88 - i * 0.14, 0],
        scale: [0.1, 0.14, 0.1],
        colorType: i === 2 ? "glow" : "primary",
        colorMultiplier: i === 2 ? 1.2 : 0.95,
        emissive: i === 2,
        emissiveIntensity: i === 2 ? 1.2 : 0,
        group: "legs"
      })
    }
    // Frozen boot
    boxes.push({
      id: id("frozen_revenant"),
      name: `Boot ${sideName}`,
      position: [side * 0.12, 0.15, 0.04],
      scale: [0.1, 0.1, 0.15],
      colorType: "secondary",
      colorMultiplier: 0.7,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
  }

  // Frost mist at feet
  for (let mist = 0; mist < 5; mist++) {
    const angle = (mist / 5) * Math.PI * 2
    boxes.push({
      id: id("frozen_revenant"),
      name: `Frost Mist ${mist}`,
      position: [Math.cos(angle) * 0.25, 0.08, Math.sin(angle) * 0.2],
      scale: [0.08, 0.04, 0.08],
      colorType: "glow",
      colorMultiplier: 1.2,
      emissive: true,
      emissiveIntensity: 1.2,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["head", "torso", "shoulders", "arms", "legs", "effects"]
  }
}

export const FROZEN_REVENANT_HEIGHT = 2.3

// ============================================
// ICE ELEMENTAL - Pure crystallized frost given form
// ============================================

export function createIceElementalModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Crystalline head (angular ice formation)
  for (let ring = 0; ring < 2; ring++) {
    const headAngles = [0, Math.PI/3, 2*Math.PI/3, Math.PI, 4*Math.PI/3, 5*Math.PI/3]
    for (const angle of headAngles) {
      boxes.push({
        id: id("ice_elemental"),
        name: `Head Crystal ${ring}_${angle.toFixed(1)}`,
        position: [Math.cos(angle) * 0.18, 2.8 + ring * 0.18, Math.sin(angle) * 0.18],
        scale: [0.12, 0.25, 0.12],
        colorType: "primary",
        colorMultiplier: 1.1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }

  // Head core glow
  boxes.push({
    id: id("ice_elemental"),
    name: "Head Core",
    position: [0, 2.9, 0],
    scale: [0.14, 0.2, 0.14],
    colorType: "glow",
    colorMultiplier: 3,
    emissive: true,
    emissiveIntensity: 3,
    group: "head"
  })

  // Eyes
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("ice_elemental"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.1, 2.85, 0.18],
      scale: [0.08, 0.1, 0.05],
      colorType: "glow",
      colorMultiplier: 4,
      emissive: true,
      emissiveIntensity: 4,
      group: "head"
    })
  }

  // Neck crystals
  for (let i = 0; i < 2; i++) {
    boxes.push({
      id: id("ice_elemental"),
      name: `Neck ${i}`,
      position: [0, 2.55 - i * 0.1, 0],
      scale: [0.16 + i * 0.02, 0.1, 0.14 + i * 0.02],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "torso"
    })
  }

  // Ice crystal torso
  for (let ty = 0; ty < 6; ty++) {
    const width = 0.45 - Math.abs(ty - 2.5) * 0.04
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: id("ice_elemental"),
        name: `Torso ${ty}_${tx}`,
        position: [tx * width * 0.32, 2.25 - ty * 0.2, 0],
        scale: [width * 0.35, 0.2, width * 0.3],
        colorType: ty % 2 === 0 ? "primary" : "glow",
        colorMultiplier: ty % 2 === 0 ? 1 : 0.8,
        emissive: ty % 2 !== 0,
        emissiveIntensity: ty % 2 !== 0 ? 0.8 : 0,
        group: "torso"
      })
    }
  }

  // Core glow in chest
  boxes.push({
    id: id("ice_elemental"),
    name: "Chest Core",
    position: [0, 2.0, 0.22],
    scale: [0.16, 0.2, 0.06],
    colorType: "glow",
    colorMultiplier: 2.5,
    emissive: true,
    emissiveIntensity: 2.5,
    group: "torso"
  })

  // Shoulder crystals (large spikes)
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    // Base
    boxes.push({
      id: id("ice_elemental"),
      name: `Shoulder Base ${sideName}`,
      position: [side * 0.45, 2.3, 0],
      scale: [0.2, 0.18, 0.18],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "shoulders"
    })
    // Spikes
    for (let spike = 0; spike < 3; spike++) {
      boxes.push({
        id: id("ice_elemental"),
        name: `Shoulder Spike ${sideName} ${spike}`,
        position: [side * (0.5 + spike * 0.04), 2.4 + spike * 0.12, -0.05 + spike * 0.03],
        scale: [0.08, 0.18 + spike * 0.04, 0.08],
        colorType: spike < 2 ? "primary" : "glow",
        colorMultiplier: spike < 2 ? 1.1 : 2,
        emissive: spike >= 2,
        emissiveIntensity: spike >= 2 ? 2 : 0,
        group: "shoulders"
      })
    }
  }

  // Floating ice shards around body
  for (let shard = 0; shard < 6; shard++) {
    const angle = (shard / 6) * Math.PI * 2
    boxes.push({
      id: id("ice_elemental"),
      name: `Floating Shard ${shard}`,
      position: [
        Math.cos(angle) * 0.7,
        1.8 + Math.sin(shard * 1.5) * 0.25,
        Math.sin(angle) * 0.6
      ],
      scale: [0.06, 0.12, 0.06],
      colorType: "glow",
      colorMultiplier: 1.8,
      emissive: true,
      emissiveIntensity: 1.8,
      group: "effects"
    })
  }

  // Crystal arms
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 4; i++) {
      const armWidth = 0.18 - i * 0.02
      boxes.push({
        id: id("ice_elemental"),
        name: `Arm ${sideName} ${i}`,
        position: [side * 0.5, 2.0 - i * 0.2, 0],
        scale: [armWidth, 0.2, armWidth],
        colorType: i % 2 === 0 ? "primary" : "glow",
        colorMultiplier: i % 2 === 0 ? 1 : 1.2,
        emissive: i % 2 !== 0,
        emissiveIntensity: i % 2 !== 0 ? 1.2 : 0,
        group: "arms"
      })
    }
    // Ice fist
    boxes.push({
      id: id("ice_elemental"),
      name: `Fist ${sideName}`,
      position: [side * 0.5, 1.15, 0],
      scale: [0.22, 0.22, 0.22],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Fist glow
    boxes.push({
      id: id("ice_elemental"),
      name: `Fist Glow ${sideName}`,
      position: [side * 0.5, 1.15, 0.12],
      scale: [0.08, 0.08, 0.04],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "arms"
    })
  }

  // Crystal legs
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id("ice_elemental"),
        name: `Leg ${sideName} ${i}`,
        position: [side * 0.22, 1.0 - i * 0.2, 0],
        scale: [0.18, 0.2, 0.18],
        colorType: i === 2 ? "glow" : "primary",
        colorMultiplier: i === 2 ? 1.3 : 1,
        emissive: i === 2,
        emissiveIntensity: i === 2 ? 1.3 : 0,
        group: "legs"
      })
    }
    // Foot
    boxes.push({
      id: id("ice_elemental"),
      name: `Foot ${sideName}`,
      position: [side * 0.22, 0.18, 0.08],
      scale: [0.24, 0.14, 0.32],
      colorType: "primary",
      colorMultiplier: 0.8,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
  }

  // Frost aura at base
  for (let aura = 0; aura < 8; aura++) {
    const angle = (aura / 8) * Math.PI * 2
    boxes.push({
      id: id("ice_elemental"),
      name: `Frost Aura ${aura}`,
      position: [Math.cos(angle) * 0.4, 0.1, Math.sin(angle) * 0.35],
      scale: [0.06, 0.08, 0.06],
      colorType: "glow",
      colorMultiplier: 1.5,
      emissive: true,
      emissiveIntensity: 1.5,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["head", "torso", "shoulders", "arms", "legs", "effects"]
  }
}

export const ICE_ELEMENTAL_HEIGHT = 3.2

// ============================================
// BLIZZARD TITAN - Ancient guardian of the frozen expanse
// ============================================

export function createBlizzardTitanModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Massive ice crown head
  for (let hx = -1; hx <= 1; hx++) {
    for (let hz = -1; hz <= 1; hz++) {
      boxes.push({
        id: id("blizzard_titan"),
        name: `Head ${hx}_${hz}`,
        position: [hx * 0.18, 4.6, hz * 0.15],
        scale: [0.2, 0.25, 0.18],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }

  // Ice crown spires
  for (let spire = 0; spire < 5; spire++) {
    const angle = (spire / 5 - 0.5) * Math.PI * 0.7
    boxes.push({
      id: id("blizzard_titan"),
      name: `Crown Spire ${spire}`,
      position: [Math.sin(angle) * 0.25, 4.9 + spire * 0.06, Math.cos(angle) * 0.1 - 0.1],
      scale: [0.06, 0.2 + spire * 0.03, 0.06],
      colorType: "glow",
      colorMultiplier: 2 + spire * 0.2,
      emissive: true,
      emissiveIntensity: 2 + spire * 0.2,
      group: "head"
    })
  }

  // Glowing eyes (icy blue)
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("blizzard_titan"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.15, 4.55, 0.25],
      scale: [0.1, 0.12, 0.06],
      colorType: "glow",
      colorMultiplier: 4,
      emissive: true,
      emissiveIntensity: 4,
      group: "head"
    })
  }

  // Neck
  for (let i = 0; i < 2; i++) {
    boxes.push({
      id: id("blizzard_titan"),
      name: `Neck ${i}`,
      position: [0, 4.35 - i * 0.12, 0],
      scale: [0.22, 0.12, 0.18],
      colorType: "primary",
      colorMultiplier: 0.9,
      emissive: false,
      emissiveIntensity: 0,
      group: "torso"
    })
  }

  // Massive torso
  for (let ty = 0; ty < 8; ty++) {
    const width = 0.65 - Math.abs(ty - 3.5) * 0.05
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: id("blizzard_titan"),
        name: `Torso ${ty}_${tx}`,
        position: [tx * width * 0.35, 4.0 - ty * 0.22, 0],
        scale: [width * 0.38, 0.22, width * 0.32],
        colorType: ty % 3 === 1 ? "glow" : "primary",
        colorMultiplier: ty % 3 === 1 ? 1.3 : 1,
        emissive: ty % 3 === 1,
        emissiveIntensity: ty % 3 === 1 ? 1.3 : 0,
        group: "torso"
      })
    }
  }

  // Blizzard core in chest
  boxes.push({
    id: id("blizzard_titan"),
    name: "Blizzard Core",
    position: [0, 3.5, 0.35],
    scale: [0.25, 0.3, 0.1],
    colorType: "glow",
    colorMultiplier: 3.5,
    emissive: true,
    emissiveIntensity: 3.5,
    group: "torso"
  })

  // Massive shoulder ice formations
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    // Base
    boxes.push({
      id: id("blizzard_titan"),
      name: `Shoulder Base ${sideName}`,
      position: [side * 0.7, 4.1, 0],
      scale: [0.3, 0.25, 0.28],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "shoulders"
    })
    // Ice spikes
    for (let spike = 0; spike < 4; spike++) {
      const spikeAngle = (spike / 4) * Math.PI + Math.PI / 4
      boxes.push({
        id: id("blizzard_titan"),
        name: `Shoulder Spike ${sideName} ${spike}`,
        position: [
          side * (0.75 + Math.cos(spikeAngle) * 0.1),
          4.25 + spike * 0.12,
          Math.sin(spikeAngle) * 0.1
        ],
        scale: [0.08, 0.2 + spike * 0.04, 0.08],
        colorType: spike < 2 ? "primary" : "glow",
        colorMultiplier: spike < 2 ? 1.1 : 2,
        emissive: spike >= 2,
        emissiveIntensity: spike >= 2 ? 2 : 0,
        group: "shoulders"
      })
    }
  }

  // Heavy arms
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 5; i++) {
      const armWidth = 0.22 - i * 0.02
      boxes.push({
        id: id("blizzard_titan"),
        name: `Arm ${sideName} ${i}`,
        position: [side * 0.68, 3.7 - i * 0.22, 0],
        scale: [armWidth, 0.22, armWidth],
        colorType: i % 2 === 0 ? "primary" : "glow",
        colorMultiplier: i % 2 === 0 ? 1 : 1.2,
        emissive: i % 2 !== 0,
        emissiveIntensity: i % 2 !== 0 ? 1.2 : 0,
        group: "arms"
      })
    }
    // Massive fist
    boxes.push({
      id: id("blizzard_titan"),
      name: `Fist ${sideName}`,
      position: [side * 0.68, 2.55, 0],
      scale: [0.3, 0.3, 0.3],
      colorType: "primary",
      colorMultiplier: 0.95,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Fist glow
    boxes.push({
      id: id("blizzard_titan"),
      name: `Fist Glow ${sideName}`,
      position: [side * 0.68, 2.55, 0.18],
      scale: [0.12, 0.12, 0.06],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "arms"
    })
  }

  // Waist
  for (let wx = -2; wx <= 2; wx++) {
    boxes.push({
      id: id("blizzard_titan"),
      name: `Waist ${wx}`,
      position: [wx * 0.15, 2.1, 0],
      scale: [0.18, 0.15, 0.22],
      colorType: "primary",
      colorMultiplier: 0.85,
      emissive: false,
      emissiveIntensity: 0,
      group: "torso"
    })
  }

  // Massive legs
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 5; i++) {
      boxes.push({
        id: id("blizzard_titan"),
        name: `Leg ${sideName} ${i}`,
        position: [side * 0.32, 1.8 - i * 0.28, 0],
        scale: [0.28, 0.28, 0.28],
        colorType: i === 2 ? "glow" : "primary",
        colorMultiplier: i === 2 ? 1.4 : 1,
        emissive: i === 2,
        emissiveIntensity: i === 2 ? 1.4 : 0,
        group: "legs"
      })
    }
    // Massive foot
    boxes.push({
      id: id("blizzard_titan"),
      name: `Foot ${sideName}`,
      position: [side * 0.32, 0.35, 0.15],
      scale: [0.35, 0.2, 0.5],
      colorType: "primary",
      colorMultiplier: 0.7,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
  }

  // Blizzard effect particles around
  for (let snow = 0; snow < 12; snow++) {
    const angle = (snow / 12) * Math.PI * 2
    const height = 1.5 + Math.sin(snow * 1.3) * 1.5
    boxes.push({
      id: id("blizzard_titan"),
      name: `Snow Particle ${snow}`,
      position: [Math.cos(angle) * 0.9, height, Math.sin(angle) * 0.8],
      scale: [0.04, 0.04, 0.02],
      colorType: "glow",
      colorMultiplier: 1.8,
      emissive: true,
      emissiveIntensity: 1.8,
      group: "effects"
    })
  }

  // Frost ground effect
  for (let frost = 0; frost < 8; frost++) {
    const angle = (frost / 8) * Math.PI * 2
    boxes.push({
      id: id("blizzard_titan"),
      name: `Ground Frost ${frost}`,
      position: [Math.cos(angle) * 0.6, 0.1, Math.sin(angle) * 0.5],
      scale: [0.1, 0.06, 0.1],
      colorType: "glow",
      colorMultiplier: 1.5,
      emissive: true,
      emissiveIntensity: 1.5,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["head", "torso", "shoulders", "arms", "legs", "effects"]
  }
}

export const BLIZZARD_TITAN_HEIGHT = 5.2
