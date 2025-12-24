import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Mixed/Hybrid Zone Enemy Templates
 * Based on: lib/world/enemy-templates.ts MIXED_ENEMIES
 * These enemies blend digital and fantasy elements
 */

let idCounter = 0
function id(prefix: string) { return `${prefix}_${idCounter++}` }

// ============================================
// DATA PHANTOM - Corrupted code given ghostly form
// ============================================

export function createDataPhantomModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Glitching head (partially transparent effect)
  for (let layer = 0; layer < 3; layer++) {
    for (let hx = -1; hx <= 1; hx++) {
      boxes.push({
        id: id("data_phantom"),
        name: `Head ${layer}_${hx}`,
        position: [hx * 0.08 + layer * 0.02, 2.2, layer * 0.04],
        scale: [0.12, 0.16, 0.1],
        colorType: layer === 1 ? "glow" : "primary",
        colorMultiplier: layer === 1 ? 2 : 0.7,
        emissive: layer === 1,
        emissiveIntensity: layer === 1 ? 2 : 0,
        group: "head"
      })
    }
  }

  // Glitching data eyes
  for (const side of [-1, 1]) {
    for (let glitch = 0; glitch < 2; glitch++) {
      boxes.push({
        id: id("data_phantom"),
        name: `Eye ${side > 0 ? "R" : "L"} ${glitch}`,
        position: [side * 0.07 + glitch * 0.03, 2.18, 0.14 + glitch * 0.02],
        scale: [0.05, 0.06, 0.03],
        colorType: "glow",
        colorMultiplier: 3,
        emissive: true,
        emissiveIntensity: 3,
        group: "head"
      })
    }
  }

  // Digital scanlines on head
  for (let scan = 0; scan < 4; scan++) {
    boxes.push({
      id: id("data_phantom"),
      name: `Head Scanline ${scan}`,
      position: [0, 2.28 - scan * 0.04, 0.12],
      scale: [0.2, 0.01, 0.02],
      colorType: "glow",
      colorMultiplier: 1.5,
      emissive: true,
      emissiveIntensity: 1.5,
      group: "head"
    })
  }

  // Ethereal/digital body (fragmented)
  for (let ty = 0; ty < 7; ty++) {
    const width = 0.28 - Math.abs(ty - 3) * 0.02
    const offset = Math.sin(ty * 1.2) * 0.03
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: id("data_phantom"),
        name: `Body ${ty}_${tx}`,
        position: [tx * width * 0.35 + offset, 2.0 - ty * 0.15, 0],
        scale: [width * 0.35, 0.12, width * 0.28],
        colorType: ty % 2 === 0 ? "primary" : "glow",
        colorMultiplier: ty % 2 === 0 ? 0.8 : 1.2,
        emissive: ty % 2 !== 0,
        emissiveIntensity: ty % 2 !== 0 ? 1.2 : 0,
        group: "body"
      })
    }
    // Data corruption streaks
    if (ty % 2 === 0) {
      boxes.push({
        id: id("data_phantom"),
        name: `Data Streak ${ty}`,
        position: [offset * 3, 2.0 - ty * 0.15, 0.15],
        scale: [0.25, 0.02, 0.02],
        colorType: "glow",
        colorMultiplier: 2,
        emissive: true,
        emissiveIntensity: 2,
        group: "body"
      })
    }
  }

  // Spectral arms with data particles
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 5; i++) {
      const glitchOffset = Math.sin(i * 2) * 0.02
      boxes.push({
        id: id("data_phantom"),
        name: `Arm ${sideName} ${i}`,
        position: [side * (0.25 + i * 0.03) + glitchOffset, 1.9 - i * 0.12, 0],
        scale: [0.06, 0.1, 0.05],
        colorType: i % 2 === 0 ? "glow" : "primary",
        colorMultiplier: i % 2 === 0 ? 1.5 : 0.7,
        emissive: i % 2 === 0,
        emissiveIntensity: i % 2 === 0 ? 1.5 : 0,
        group: "arms"
      })
    }
  }

  // Digital code fragments floating
  for (let code = 0; code < 8; code++) {
    const angle = (code / 8) * Math.PI * 2
    boxes.push({
      id: id("data_phantom"),
      name: `Code Fragment ${code}`,
      position: [
        Math.cos(angle) * 0.35 + Math.sin(code * 3) * 0.05,
        1.8 + Math.sin(code * 1.5) * 0.25,
        Math.sin(angle) * 0.3
      ],
      scale: [0.04, 0.06, 0.02],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "effects"
    })
  }

  // Fading digital trail
  for (let trail = 0; trail < 5; trail++) {
    const angle = (trail / 5 - 0.5) * Math.PI * 0.4
    for (let seg = 0; seg < 3; seg++) {
      boxes.push({
        id: id("data_phantom"),
        name: `Trail ${trail}_${seg}`,
        position: [Math.sin(angle) * 0.1, 0.9 - seg * 0.12, Math.cos(angle) * 0.05],
        scale: [0.04, 0.08, 0.04],
        colorType: "glow",
        colorMultiplier: 1.3 - seg * 0.3,
        emissive: true,
        emissiveIntensity: 1.3 - seg * 0.3,
        group: "trails"
      })
    }
  }

  return {
    boxes,
    groups: ["head", "body", "arms", "trails", "effects"]
  }
}

export const DATA_PHANTOM_HEIGHT = 2.3

// ============================================
// TECHNO ELEMENTAL - Digital being with magical core
// ============================================

export function createTechnoElementalModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Geometric digital head
  for (let face = 0; face < 6; face++) {
    const angle = (face / 6) * Math.PI * 2
    boxes.push({
      id: id("techno_elemental"),
      name: `Head Face ${face}`,
      position: [Math.cos(angle) * 0.15, 2.9, Math.sin(angle) * 0.12],
      scale: [0.12, 0.18, 0.1],
      colorType: face % 2 === 0 ? "primary" : "glow",
      colorMultiplier: face % 2 === 0 ? 1 : 1.8,
      emissive: face % 2 !== 0,
      emissiveIntensity: face % 2 !== 0 ? 1.8 : 0,
      group: "head"
    })
  }

  // Central processing core (head)
  boxes.push({
    id: id("techno_elemental"),
    name: "Head Core",
    position: [0, 2.9, 0],
    scale: [0.12, 0.15, 0.12],
    colorType: "glow",
    colorMultiplier: 3,
    emissive: true,
    emissiveIntensity: 3,
    group: "head"
  })

  // Digital eyes with hex patterns
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("techno_elemental"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.1, 2.88, 0.15],
      scale: [0.08, 0.1, 0.05],
      colorType: "glow",
      colorMultiplier: 4,
      emissive: true,
      emissiveIntensity: 4,
      group: "head"
    })
  }

  // Neck with circuit patterns
  for (let i = 0; i < 2; i++) {
    boxes.push({
      id: id("techno_elemental"),
      name: `Neck ${i}`,
      position: [0, 2.65 - i * 0.1, 0],
      scale: [0.15 + i * 0.02, 0.1, 0.13 + i * 0.02],
      colorType: i === 0 ? "glow" : "primary",
      colorMultiplier: i === 0 ? 1.5 : 1,
      emissive: i === 0,
      emissiveIntensity: i === 0 ? 1.5 : 0,
      group: "torso"
    })
  }

  // Elemental torso with energy patterns
  for (let ty = 0; ty < 6; ty++) {
    const width = 0.48 - Math.abs(ty - 2.5) * 0.04
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: id("techno_elemental"),
        name: `Torso ${ty}_${tx}`,
        position: [tx * width * 0.35, 2.4 - ty * 0.2, 0],
        scale: [width * 0.38, 0.2, width * 0.32],
        colorType: (ty + tx) % 2 === 0 ? "primary" : "glow",
        colorMultiplier: (ty + tx) % 2 === 0 ? 1 : 1.3,
        emissive: (ty + tx) % 2 !== 0,
        emissiveIntensity: (ty + tx) % 2 !== 0 ? 1.3 : 0,
        group: "torso"
      })
    }
  }

  // Magical core in chest
  boxes.push({
    id: id("techno_elemental"),
    name: "Magic Core",
    position: [0, 2.1, 0.22],
    scale: [0.18, 0.22, 0.08],
    colorType: "secondary",
    colorMultiplier: 3,
    emissive: true,
    emissiveIntensity: 3,
    group: "torso"
  })

  // Circuit lines from core
  for (let line = 0; line < 6; line++) {
    const angle = (line / 6) * Math.PI * 2
    boxes.push({
      id: id("techno_elemental"),
      name: `Circuit Line ${line}`,
      position: [Math.cos(angle) * 0.2, 2.1 + Math.sin(angle) * 0.15, 0.18],
      scale: [0.02, 0.08, 0.02],
      colorType: "glow",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "torso"
    })
  }

  // Modular shoulders
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    boxes.push({
      id: id("techno_elemental"),
      name: `Shoulder ${sideName}`,
      position: [side * 0.48, 2.35, 0],
      scale: [0.2, 0.18, 0.18],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Energy conduit
    boxes.push({
      id: id("techno_elemental"),
      name: `Shoulder Conduit ${sideName}`,
      position: [side * 0.52, 2.45, 0],
      scale: [0.06, 0.12, 0.06],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "arms"
    })
  }

  // Segmented elemental arms
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id("techno_elemental"),
        name: `Arm ${sideName} ${i}`,
        position: [side * 0.52, 2.1 - i * 0.2, 0],
        scale: [0.15, 0.18, 0.15],
        colorType: i % 2 === 0 ? "primary" : "glow",
        colorMultiplier: i % 2 === 0 ? 1 : 1.2,
        emissive: i % 2 !== 0,
        emissiveIntensity: i % 2 !== 0 ? 1.2 : 0,
        group: "arms"
      })
    }
    // Energy fist
    boxes.push({
      id: id("techno_elemental"),
      name: `Fist ${sideName}`,
      position: [side * 0.52, 1.25, 0],
      scale: [0.2, 0.2, 0.2],
      colorType: "primary",
      colorMultiplier: 1.1,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Fist energy
    boxes.push({
      id: id("techno_elemental"),
      name: `Fist Energy ${sideName}`,
      position: [side * 0.52, 1.25, 0.12],
      scale: [0.1, 0.1, 0.05],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "arms"
    })
  }

  // Elemental legs
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id("techno_elemental"),
        name: `Leg ${sideName} ${i}`,
        position: [side * 0.2, 1.15 - i * 0.22, 0],
        scale: [0.18, 0.22, 0.18],
        colorType: i === 1 ? "glow" : "primary",
        colorMultiplier: i === 1 ? 1.4 : 1,
        emissive: i === 1,
        emissiveIntensity: i === 1 ? 1.4 : 0,
        group: "legs"
      })
    }
    // Foot
    boxes.push({
      id: id("techno_elemental"),
      name: `Foot ${sideName}`,
      position: [side * 0.2, 0.2, 0.1],
      scale: [0.22, 0.15, 0.3],
      colorType: "primary",
      colorMultiplier: 0.9,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
  }

  // Floating data/magic particles
  for (let p = 0; p < 8; p++) {
    const angle = (p / 8) * Math.PI * 2
    boxes.push({
      id: id("techno_elemental"),
      name: `Particle ${p}`,
      position: [
        Math.cos(angle) * 0.65,
        2.0 + Math.sin(p * 1.3) * 0.35,
        Math.sin(angle) * 0.55
      ],
      scale: [0.05, 0.08, 0.05],
      colorType: p % 2 === 0 ? "glow" : "secondary",
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

export const TECHNO_ELEMENTAL_HEIGHT = 3.1

// ============================================
// VIRUS SWARM - Collective of malicious code entities
// ============================================

export function createVirusSwarmModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Central swarm core
  boxes.push({
    id: id("virus_swarm"),
    name: "Core",
    position: [0, 1.5, 0],
    scale: [0.2, 0.25, 0.2],
    colorType: "glow",
    colorMultiplier: 3,
    emissive: true,
    emissiveIntensity: 3,
    group: "core"
  })

  // Pulsing core rings
  for (let ring = 0; ring < 3; ring++) {
    const segments = 6
    for (let seg = 0; seg < segments; seg++) {
      const angle = (seg / segments) * Math.PI * 2 + ring * 0.4
      boxes.push({
        id: id("virus_swarm"),
        name: `Core Ring ${ring}_${seg}`,
        position: [Math.cos(angle) * (0.2 + ring * 0.08), 1.5, Math.sin(angle) * (0.2 + ring * 0.08)],
        scale: [0.06, 0.2 - ring * 0.03, 0.06],
        colorType: ring === 1 ? "glow" : "primary",
        colorMultiplier: ring === 1 ? 2 : 1.2,
        emissive: ring === 1,
        emissiveIntensity: ring === 1 ? 2 : 0,
        group: "core"
      })
    }
  }

  // Individual virus entities (small floating cubes)
  for (let virus = 0; virus < 12; virus++) {
    const radius = 0.4 + Math.random() * 0.3
    const theta = (virus / 12) * Math.PI * 2
    const phi = (virus % 3 - 1) * 0.5
    boxes.push({
      id: id("virus_swarm"),
      name: `Virus ${virus}`,
      position: [
        Math.cos(theta) * radius,
        1.5 + phi + Math.sin(virus * 1.7) * 0.2,
        Math.sin(theta) * radius * 0.8
      ],
      scale: [0.08, 0.08, 0.08],
      colorType: virus % 3 === 0 ? "glow" : "primary",
      colorMultiplier: virus % 3 === 0 ? 2 : 1,
      emissive: virus % 3 === 0,
      emissiveIntensity: virus % 3 === 0 ? 2 : 0,
      group: "swarm"
    })
  }

  // Virus tendrils (connecting lines)
  for (let tendril = 0; tendril < 6; tendril++) {
    const angle = (tendril / 6) * Math.PI * 2
    for (let seg = 0; seg < 4; seg++) {
      boxes.push({
        id: id("virus_swarm"),
        name: `Tendril ${tendril}_${seg}`,
        position: [
          Math.cos(angle) * (0.35 + seg * 0.12),
          1.5 + Math.sin(tendril + seg) * 0.15,
          Math.sin(angle) * (0.3 + seg * 0.1)
        ],
        scale: [0.04, 0.12, 0.04],
        colorType: "glow",
        colorMultiplier: 1.5 - seg * 0.2,
        emissive: true,
        emissiveIntensity: 1.5 - seg * 0.2,
        group: "tendrils"
      })
    }
  }

  // Corruption particles
  for (let corrupt = 0; corrupt < 8; corrupt++) {
    const angle = (corrupt / 8) * Math.PI * 2 + 0.3
    boxes.push({
      id: id("virus_swarm"),
      name: `Corruption ${corrupt}`,
      position: [
        Math.cos(angle) * 0.55,
        1.2 + corrupt * 0.08,
        Math.sin(angle) * 0.45
      ],
      scale: [0.03, 0.05, 0.03],
      colorType: "secondary",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "effects"
    })
  }

  // Error code fragments
  for (let error = 0; error < 5; error++) {
    boxes.push({
      id: id("virus_swarm"),
      name: `Error ${error}`,
      position: [
        Math.sin(error * 2.5) * 0.4,
        1.9 + error * 0.06,
        Math.cos(error * 2.5) * 0.35
      ],
      scale: [0.06, 0.03, 0.02],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["core", "swarm", "tendrils", "effects"]
  }
}

export const VIRUS_SWARM_HEIGHT = 2.0

// ============================================
// SYSTEM OVERLORD - Boss: Master of digital and arcane
// ============================================

export function createSystemOverlordModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Crowned digital head
  for (let hx = -1; hx <= 1; hx++) {
    for (let hy = 0; hy < 2; hy++) {
      for (let hz = -1; hz <= 1; hz++) {
        boxes.push({
          id: id("system_overlord"),
          name: `Head ${hx}_${hy}_${hz}`,
          position: [hx * 0.18, 4.5 + hy * 0.2, hz * 0.14],
          scale: [0.2, 0.22, 0.16],
          colorType: "primary",
          colorMultiplier: 1,
          emissive: false,
          emissiveIntensity: 0,
          group: "head"
        })
      }
    }
  }

  // Digital crown with magical elements
  for (let crown = 0; crown < 7; crown++) {
    const angle = (crown / 7 - 0.5) * Math.PI * 0.8
    boxes.push({
      id: id("system_overlord"),
      name: `Crown ${crown}`,
      position: [Math.sin(angle) * 0.22, 4.95 + crown * 0.04, Math.cos(angle) * 0.08 - 0.08],
      scale: [0.06, 0.18 + crown * 0.02, 0.06],
      colorType: crown % 2 === 0 ? "glow" : "secondary",
      colorMultiplier: crown % 2 === 0 ? 2.5 : 2,
      emissive: true,
      emissiveIntensity: crown % 2 === 0 ? 2.5 : 2,
      group: "head"
    })
  }

  // Dual-color eyes (one digital, one magical)
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("system_overlord"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.18, 4.55, 0.22],
      scale: [0.12, 0.14, 0.06],
      colorType: side > 0 ? "glow" : "secondary",
      colorMultiplier: 4,
      emissive: true,
      emissiveIntensity: 4,
      group: "head"
    })
  }

  // Circuit and rune patterns on face
  for (let pattern = 0; pattern < 4; pattern++) {
    boxes.push({
      id: id("system_overlord"),
      name: `Face Pattern ${pattern}`,
      position: [(pattern - 1.5) * 0.1, 4.42, 0.25],
      scale: [0.06, 0.08, 0.02],
      colorType: pattern % 2 === 0 ? "glow" : "secondary",
      colorMultiplier: 1.8,
      emissive: true,
      emissiveIntensity: 1.8,
      group: "head"
    })
  }

  // Neck with data streams
  for (let i = 0; i < 2; i++) {
    boxes.push({
      id: id("system_overlord"),
      name: `Neck ${i}`,
      position: [0, 4.25 - i * 0.12, 0],
      scale: [0.25, 0.12, 0.2],
      colorType: i === 0 ? "glow" : "primary",
      colorMultiplier: i === 0 ? 1.3 : 1,
      emissive: i === 0,
      emissiveIntensity: i === 0 ? 1.3 : 0,
      group: "torso"
    })
  }

  // Massive hybrid torso
  for (let ty = 0; ty < 8; ty++) {
    const width = 0.7 - Math.abs(ty - 3.5) * 0.05
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: id("system_overlord"),
        name: `Torso ${ty}_${tx}`,
        position: [tx * width * 0.35, 3.9 - ty * 0.22, 0],
        scale: [width * 0.38, 0.22, width * 0.32],
        colorType: ty % 3 === 1 ? "glow" : (ty % 3 === 2 ? "secondary" : "primary"),
        colorMultiplier: ty % 3 !== 0 ? 1.2 : 1,
        emissive: ty % 3 !== 0,
        emissiveIntensity: ty % 3 !== 0 ? 1.2 : 0,
        group: "torso"
      })
    }
  }

  // Dual core (digital + magical)
  boxes.push({
    id: id("system_overlord"),
    name: "Digital Core",
    position: [-0.12, 3.4, 0.35],
    scale: [0.15, 0.2, 0.08],
    colorType: "glow",
    colorMultiplier: 3,
    emissive: true,
    emissiveIntensity: 3,
    group: "torso"
  })
  boxes.push({
    id: id("system_overlord"),
    name: "Magic Core",
    position: [0.12, 3.4, 0.35],
    scale: [0.15, 0.2, 0.08],
    colorType: "secondary",
    colorMultiplier: 3,
    emissive: true,
    emissiveIntensity: 3,
    group: "torso"
  })

  // Energy streams between cores
  for (let stream = 0; stream < 3; stream++) {
    boxes.push({
      id: id("system_overlord"),
      name: `Core Stream ${stream}`,
      position: [0, 3.3 + stream * 0.1, 0.38],
      scale: [0.2, 0.02, 0.02],
      colorType: stream === 1 ? "glow" : "secondary",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "torso"
    })
  }

  // Massive hybrid shoulders
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    // Digital shoulder (right) / Magic shoulder (left)
    boxes.push({
      id: id("system_overlord"),
      name: `Shoulder ${sideName}`,
      position: [side * 0.75, 4.0, 0],
      scale: [0.32, 0.28, 0.28],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Shoulder energy
    for (let spike = 0; spike < 3; spike++) {
      boxes.push({
        id: id("system_overlord"),
        name: `Shoulder Energy ${sideName} ${spike}`,
        position: [side * (0.8 + spike * 0.04), 4.15 + spike * 0.1, 0],
        scale: [0.08, 0.16 + spike * 0.03, 0.08],
        colorType: side > 0 ? "glow" : "secondary",
        colorMultiplier: 2 + spike * 0.3,
        emissive: true,
        emissiveIntensity: 2 + spike * 0.3,
        group: "arms"
      })
    }
  }

  // Hybrid arms
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    const armColorType = side > 0 ? "glow" : "secondary"
    for (let i = 0; i < 5; i++) {
      boxes.push({
        id: id("system_overlord"),
        name: `Arm ${sideName} ${i}`,
        position: [side * 0.72, 3.6 - i * 0.24, 0],
        scale: [0.22, 0.24, 0.22],
        colorType: i % 2 === 0 ? "primary" : armColorType,
        colorMultiplier: i % 2 === 0 ? 1 : 1.3,
        emissive: i % 2 !== 0,
        emissiveIntensity: i % 2 !== 0 ? 1.3 : 0,
        group: "arms"
      })
    }
    // Massive fist
    boxes.push({
      id: id("system_overlord"),
      name: `Fist ${sideName}`,
      position: [side * 0.72, 2.35, 0],
      scale: [0.32, 0.32, 0.32],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Fist power
    boxes.push({
      id: id("system_overlord"),
      name: `Fist Power ${sideName}`,
      position: [side * 0.72, 2.35, 0.18],
      scale: [0.12, 0.12, 0.06],
      colorType: armColorType,
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 3,
      group: "arms"
    })
  }

  // Waist with control nodes
  for (let wx = -2; wx <= 2; wx++) {
    boxes.push({
      id: id("system_overlord"),
      name: `Waist ${wx}`,
      position: [wx * 0.16, 2.0, 0],
      scale: [0.18, 0.16, 0.22],
      colorType: Math.abs(wx) === 2 ? "glow" : "primary",
      colorMultiplier: Math.abs(wx) === 2 ? 1.5 : 0.9,
      emissive: Math.abs(wx) === 2,
      emissiveIntensity: Math.abs(wx) === 2 ? 1.5 : 0,
      group: "torso"
    })
  }

  // Powerful legs
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 5; i++) {
      boxes.push({
        id: id("system_overlord"),
        name: `Leg ${sideName} ${i}`,
        position: [side * 0.32, 1.7 - i * 0.28, 0],
        scale: [0.28, 0.28, 0.28],
        colorType: i === 2 ? (side > 0 ? "glow" : "secondary") : "primary",
        colorMultiplier: i === 2 ? 1.5 : 1,
        emissive: i === 2,
        emissiveIntensity: i === 2 ? 1.5 : 0,
        group: "legs"
      })
    }
    // Foot
    boxes.push({
      id: id("system_overlord"),
      name: `Foot ${sideName}`,
      position: [side * 0.32, 0.28, 0.15],
      scale: [0.35, 0.2, 0.5],
      colorType: "primary",
      colorMultiplier: 0.75,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
  }

  // Floating control orbs
  for (let orb = 0; orb < 6; orb++) {
    const angle = (orb / 6) * Math.PI * 2
    boxes.push({
      id: id("system_overlord"),
      name: `Control Orb ${orb}`,
      position: [
        Math.cos(angle) * 0.95,
        3.2 + Math.sin(orb * 1.2) * 0.4,
        Math.sin(angle) * 0.85
      ],
      scale: [0.1, 0.1, 0.1],
      colorType: orb % 2 === 0 ? "glow" : "secondary",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "effects"
    })
  }

  // Data/Magic aura particles
  for (let aura = 0; aura < 12; aura++) {
    const angle = (aura / 12) * Math.PI * 2
    const height = 2.0 + Math.sin(aura * 1.5) * 1.5
    boxes.push({
      id: id("system_overlord"),
      name: `Aura Particle ${aura}`,
      position: [Math.cos(angle) * 1.1, height, Math.sin(angle) * 1.0],
      scale: [0.04, 0.06, 0.04],
      colorType: aura % 2 === 0 ? "glow" : "secondary",
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

export const SYSTEM_OVERLORD_HEIGHT = 5.3
