"use client"

import { memo, useState, useCallback } from "react"

// ============================================
// VOXEL DATA TYPES
// ============================================

export interface VoxelBox {
  id: string
  name: string
  position: [number, number, number]  // x, y, z
  scale: [number, number, number]     // width, height, depth
  colorType: "primary" | "secondary" | "glow" | "custom"
  customColor?: string
  colorMultiplier: number  // For brightness adjustments
  emissive: boolean
  emissiveIntensity: number
  group: string  // For organizing: "head", "body", "limbs", etc.
}

export interface VoxelModel {
  boxes: VoxelBox[]
  groups: string[]
}

// ============================================
// DEFAULT VOXEL TEMPLATES
// ============================================

function generateId() {
  return `voxel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function createDefaultVoxelModel(bodyType: string): VoxelModel {
  switch (bodyType) {
    case "beast":
      return createBeastModel()
    case "spirit":
      return createSpiritModel()
    case "golem":
      return createGolemModel()
    case "drone":
      return createDroneModel()
    case "humanoid":
    default:
      return createHumanoidModel()
  }
}

function createHumanoidModel(): VoxelModel {
  const boxes: VoxelBox[] = []
  
  // Head
  for (let hx = -1; hx <= 1; hx++) {
    for (let hy = 0; hy < 2; hy++) {
      boxes.push({
        id: generateId(),
        name: `Head ${hx},${hy}`,
        position: [hx * 0.08, 2.0 + hy * 0.1, 0],
        scale: [0.1, 0.12, 0.12],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }
  
  // Visor/eyes
  for (let i = 0; i < 4; i++) {
    boxes.push({
      id: generateId(),
      name: `Visor ${i}`,
      position: [-0.06 + i * 0.04, 2.05, 0.12],
      scale: [0.05, 0.04, 0.03],
      colorType: "glow",
      colorMultiplier: 1,
      emissive: true,
      emissiveIntensity: 0.8,
      group: "head"
    })
  }
  
  // Neck
  boxes.push({
    id: generateId(),
    name: "Neck",
    position: [0, 1.88, 0],
    scale: [0.1, 0.08, 0.1],
    colorType: "primary",
    colorMultiplier: 0.8,
    emissive: false,
    emissiveIntensity: 0,
    group: "body"
  })
  
  // Torso
  for (let ty = 0; ty < 5; ty++) {
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: generateId(),
        name: `Torso ${tx},${ty}`,
        position: [tx * 0.1, 1.7 - ty * 0.14, 0],
        scale: [0.12, 0.14, 0.14],
        colorType: ty < 3 ? "secondary" : "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "body"
      })
    }
  }
  
  // Shoulders
  for (const side of [-1, 1]) {
    boxes.push({
      id: generateId(),
      name: side === -1 ? "Left Shoulder" : "Right Shoulder",
      position: [side * 0.3, 1.7, 0],
      scale: [0.1, 0.08, 0.1],
      colorType: "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
  }
  
  // Arms
  for (const side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      boxes.push({
        id: generateId(),
        name: `${side === -1 ? "Left" : "Right"} Arm ${i}`,
        position: [side * 0.35, 1.55 - i * 0.12, 0],
        scale: [0.08, 0.12, 0.08],
        colorType: i < 3 ? "secondary" : "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
    // Hand
    boxes.push({
      id: generateId(),
      name: side === -1 ? "Left Hand" : "Right Hand",
      position: [side * 0.35, 0.8, 0.02],
      scale: [0.07, 0.1, 0.1],
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
      id: generateId(),
      name: `Belt ${bx}`,
      position: [bx * 0.07, 1.0, 0],
      scale: [0.08, 0.06, 0.1],
      colorType: "primary",
      colorMultiplier: 0.5,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }
  
  // Legs
  for (const side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      boxes.push({
        id: generateId(),
        name: `${side === -1 ? "Left" : "Right"} Leg ${i}`,
        position: [side * 0.12, 0.85 - i * 0.14, 0],
        scale: [0.1, 0.14, 0.1],
        colorType: "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Foot
    boxes.push({
      id: generateId(),
      name: side === -1 ? "Left Foot" : "Right Foot",
      position: [side * 0.12, 0.05, 0.03],
      scale: [0.1, 0.1, 0.14],
      colorType: "primary",
      colorMultiplier: 0.5,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
  }
  
  return {
    boxes,
    groups: ["head", "body", "arms", "legs"]
  }
}

function createBeastModel(): VoxelModel {
  const boxes: VoxelBox[] = []
  
  // Wolf head - Skull base
  for (let hx = -1; hx <= 1; hx++) {
    for (let hz = 0; hz < 3; hz++) {
      boxes.push({
        id: generateId(),
        name: `Skull ${hx},${hz}`,
        position: [hx * 0.12, 1.5, 0.3 + hz * 0.12],
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
  for (let sz = 0; sz < 4; sz++) {
    const snoutWidth = 0.14 - sz * 0.02
    boxes.push({
      id: generateId(),
      name: `Snout ${sz}`,
      position: [0, 1.4 - sz * 0.03, 0.6 + sz * 0.12],
      scale: [snoutWidth, 0.12, 0.12],
      colorType: "primary",
      colorMultiplier: sz < 2 ? 1 : 0.6,
      emissive: false,
      emissiveIntensity: 0,
      group: "head"
    })
  }
  
  // Nose
  boxes.push({
    id: generateId(),
    name: "Nose",
    position: [0, 1.35, 1.05],
    scale: [0.08, 0.06, 0.06],
    colorType: "primary",
    colorMultiplier: 0.3,
    emissive: false,
    emissiveIntensity: 0,
    group: "head"
  })
  
  // Fangs
  for (const side of [-1, 1]) {
    boxes.push({
      id: generateId(),
      name: side === -1 ? "Left Fang" : "Right Fang",
      position: [side * 0.06, 1.28, 0.85],
      scale: [0.03, 0.1, 0.03],
      colorType: "custom",
      customColor: "#ffffcc",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "head"
    })
  }
  
  // Ears
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: generateId(),
        name: `${side === -1 ? "Left" : "Right"} Ear ${i}`,
        position: [side * 0.18, 1.7 + i * 0.08, 0.25],
        scale: [0.06 - i * 0.015, 0.1, 0.08 - i * 0.02],
        colorType: i < 2 ? "primary" : "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }
  
  // Eyes
  for (const side of [-1, 1]) {
    boxes.push({
      id: generateId(),
      name: side === -1 ? "Left Eye" : "Right Eye",
      position: [side * 0.14, 1.55, 0.5],
      scale: [0.07, 0.06, 0.04],
      colorType: "primary",
      colorMultiplier: 4,
      emissive: true,
      emissiveIntensity: 1,
      group: "head"
    })
    boxes.push({
      id: generateId(),
      name: side === -1 ? "Left Eye Socket" : "Right Eye Socket",
      position: [side * 0.15, 1.55, 0.48],
      scale: [0.04, 0.03, 0.02],
      colorType: "primary",
      colorMultiplier: 0.6,
      emissive: false,
      emissiveIntensity: 0,
      group: "head"
    })
  }
  
  // Neck
  for (let i = 0; i < 3; i++) {
    boxes.push({
      id: generateId(),
      name: `Neck ${i}`,
      position: [0, 1.35 - i * 0.1, 0.1 - i * 0.08],
      scale: [0.22, 0.14, 0.2],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }
  
  // Body segments
  for (let seg = 0; seg < 7; seg++) {
    const segWidth = 0.35 - Math.abs(seg - 3) * 0.04
    const segHeight = 0.28 - Math.abs(seg - 3) * 0.02
    for (let layer = 0; layer < 2; layer++) {
      boxes.push({
        id: generateId(),
        name: `Body ${seg},${layer}`,
        position: [0, 1.2 - layer * 0.2, -seg * 0.2],
        scale: [segWidth, segHeight, 0.22],
        colorType: seg % 2 === 0 ? "primary" : "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "body"
      })
    }
  }
  
  // Spine ridge
  for (let i = 0; i < 6; i++) {
    boxes.push({
      id: generateId(),
      name: `Spine ${i}`,
      position: [0, 1.4, -0.1 - i * 0.2],
      scale: [0.06, 0.12 - i * 0.01, 0.1],
      colorType: "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }
  
  // Four legs
  const legPositions: [number, number, string][] = [
    [0.22, 0.0, "Front Left"], [-0.22, 0.0, "Front Right"], 
    [0.22, -1.1, "Back Left"], [-0.22, -1.1, "Back Right"]
  ]
  for (const [lx, lz, legName] of legPositions) {
    const isFront = lz === 0.0
    // Upper leg
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: generateId(),
        name: `${legName} Upper ${i}`,
        position: [lx, 0.95 - i * 0.18, lz],
        scale: [0.14, 0.18, 0.14],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Joint
    boxes.push({
      id: generateId(),
      name: `${legName} Joint`,
      position: [lx, 0.45, lz + (isFront ? 0.05 : -0.05)],
      scale: [0.1, 0.1, 0.1],
      colorType: "primary",
      colorMultiplier: 0.6,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
    // Lower leg
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: generateId(),
        name: `${legName} Lower ${i}`,
        position: [lx, 0.35 - i * 0.12, lz],
        scale: [0.1, 0.12, 0.1],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Paw
    boxes.push({
      id: generateId(),
      name: `${legName} Paw`,
      position: [lx, 0.05, lz + 0.05],
      scale: [0.12, 0.1, 0.16],
      colorType: "primary",
      colorMultiplier: 0.6,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
  }
  
  // Tail
  for (let i = 0; i < 6; i++) {
    const tailWidth = 0.1 - i * 0.01
    boxes.push({
      id: generateId(),
      name: `Tail ${i}`,
      position: [0, 1.25 + i * 0.06, -1.3 - i * 0.12],
      scale: [tailWidth, 0.1, 0.15],
      colorType: i % 2 === 0 ? "primary" : "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "tail"
    })
  }
  
  return {
    boxes,
    groups: ["head", "body", "legs", "tail"]
  }
}

function createSpiritModel(): VoxelModel {
  const boxes: VoxelBox[] = []
  
  // Central core
  boxes.push({
    id: generateId(),
    name: "Core",
    position: [0, 1.8, 0],
    scale: [0.2, 0.25, 0.2],
    colorType: "custom",
    customColor: "#ffffff",
    colorMultiplier: 1,
    emissive: true,
    emissiveIntensity: 1,
    group: "core"
  })
  
  // Inner ring
  for (let i = 0; i < 8; i++) {
    const theta = (i / 8) * Math.PI * 2
    boxes.push({
      id: generateId(),
      name: `Inner Ring ${i}`,
      position: [Math.cos(theta) * 0.2, 1.8, Math.sin(theta) * 0.2],
      scale: [0.1, 0.15, 0.1],
      colorType: "glow",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 0.8,
      group: "rings"
    })
  }
  
  // Floating body rings
  for (let ring = 0; ring < 7; ring++) {
    const ringY = 1.2 + ring * 0.22
    const ringSize = 0.25 + Math.sin(ring * 0.7) * 0.12
    const segments = 8 + ring
    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * Math.PI * 2 + ring * 0.4
      boxes.push({
        id: generateId(),
        name: `Body Ring ${ring}-${i}`,
        position: [Math.cos(theta) * ringSize, ringY, Math.sin(theta) * ringSize],
        scale: [0.1, 0.15, 0.1],
        colorType: ring % 2 === 0 ? "glow" : "primary",
        colorMultiplier: ring % 2 === 0 ? 3 : 1,
        emissive: true,
        emissiveIntensity: 0.5,
        group: "body"
      })
    }
  }
  
  // Eyes
  for (const side of [-1, 1]) {
    boxes.push({
      id: generateId(),
      name: side === -1 ? "Left Eye Socket" : "Right Eye Socket",
      position: [side * 0.12, 2.0, 0.18],
      scale: [0.1, 0.12, 0.06],
      colorType: "primary",
      colorMultiplier: 0.3,
      emissive: false,
      emissiveIntensity: 0,
      group: "head"
    })
    boxes.push({
      id: generateId(),
      name: side === -1 ? "Left Eye" : "Right Eye",
      position: [side * 0.12, 2.0, 0.22],
      scale: [0.08, 0.08, 0.04],
      colorType: "custom",
      customColor: "#ffffff",
      colorMultiplier: 1,
      emissive: true,
      emissiveIntensity: 1,
      group: "head"
    })
  }
  
  // Crown/halo
  for (let i = 0; i < 10; i++) {
    const theta = (i / 10) * Math.PI * 2
    boxes.push({
      id: generateId(),
      name: `Halo ${i}`,
      position: [Math.cos(theta) * 0.3, 2.4, Math.sin(theta) * 0.3],
      scale: [0.06, 0.08, 0.06],
      colorType: "glow",
      colorMultiplier: 2.4,
      emissive: true,
      emissiveIntensity: 0.6,
      group: "head"
    })
  }
  
  // Orbiting spheres
  for (let orb = 0; orb < 3; orb++) {
    const angle = (orb / 3) * Math.PI * 2
    boxes.push({
      id: generateId(),
      name: `Orb ${orb}`,
      position: [Math.cos(angle) * 0.5, 1.6 + orb * 0.15, Math.sin(angle) * 0.5],
      scale: [0.1, 0.1, 0.1],
      colorType: "glow",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 0.8,
      group: "orbs"
    })
  }
  
  // Trailing wisps
  for (let trail = 0; trail < 6; trail++) {
    const angle = (trail / 6) * Math.PI * 2
    for (let seg = 0; seg < 6; seg++) {
      const spread = seg * 0.04
      boxes.push({
        id: generateId(),
        name: `Trail ${trail}-${seg}`,
        position: [Math.cos(angle) * (0.15 + spread), 1.0 - seg * 0.18, Math.sin(angle) * (0.15 + spread)],
        scale: [0.06, 0.14, 0.06],
        colorType: "glow",
        colorMultiplier: 3 * (1 - seg * 0.15),
        emissive: true,
        emissiveIntensity: 0.5,
        group: "trails"
      })
    }
  }
  
  // Wispy arms
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: generateId(),
        name: `${side === -1 ? "Left" : "Right"} Arm ${i}`,
        position: [side * (0.3 + i * 0.08), 1.7 - i * 0.1, 0.1],
        scale: [0.08, 0.12, 0.08],
        colorType: "primary",
        colorMultiplier: 1 - i * 0.2,
        emissive: true,
        emissiveIntensity: 0.3,
        group: "arms"
      })
    }
  }
  
  return {
    boxes,
    groups: ["core", "head", "rings", "body", "orbs", "trails", "arms"]
  }
}

function createGolemModel(): VoxelModel {
  const boxes: VoxelBox[] = []
  
  // Crystalline head
  for (let ring = 0; ring < 2; ring++) {
    const headAngles = [0, Math.PI/3, 2*Math.PI/3, Math.PI, 4*Math.PI/3, 5*Math.PI/3]
    for (let i = 0; i < headAngles.length; i++) {
      const angle = headAngles[i]
      boxes.push({
        id: generateId(),
        name: `Head Crystal ${ring}-${i}`,
        position: [Math.cos(angle) * 0.22, 3.0 + ring * 0.2, Math.sin(angle) * 0.22],
        scale: [0.16, 0.3, 0.16],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }
  
  // Head core
  boxes.push({
    id: generateId(),
    name: "Head Core",
    position: [0, 3.1, 0],
    scale: [0.18, 0.25, 0.18],
    colorType: "glow",
    colorMultiplier: 2.5,
    emissive: true,
    emissiveIntensity: 0.8,
    group: "head"
  })
  
  // Eye sockets
  for (const side of [-1, 1]) {
    boxes.push({
      id: generateId(),
      name: side === -1 ? "Left Eye" : "Right Eye",
      position: [side * 0.12, 3.05, 0.22],
      scale: [0.1, 0.12, 0.06],
      colorType: "custom",
      customColor: "#88ffff",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 0.8,
      group: "head"
    })
  }
  
  // Neck crystals
  for (let i = 0; i < 3; i++) {
    boxes.push({
      id: generateId(),
      name: `Neck ${i}`,
      position: [0, 2.75 - i * 0.1, 0],
      scale: [0.2 + i * 0.03, 0.12, 0.18 + i * 0.03],
      colorType: "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }
  
  // Massive torso
  for (let ty = 0; ty < 7; ty++) {
    const width = 0.55 - Math.abs(ty - 3) * 0.05
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: generateId(),
        name: `Torso ${ty}-${tx}`,
        position: [tx * width * 0.35, 2.4 - ty * 0.22, 0],
        scale: [width * 0.4, 0.22, width * 0.35],
        colorType: ty % 2 === 0 ? "secondary" : "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "body"
      })
    }
  }
  
  // Chest rune
  boxes.push({
    id: generateId(),
    name: "Chest Rune",
    position: [0, 2.2, 0.3],
    scale: [0.2, 0.25, 0.05],
    colorType: "custom",
    customColor: "#88ffff",
    colorMultiplier: 2,
    emissive: true,
    emissiveIntensity: 0.8,
    group: "body"
  })
  
  // Shoulder crystals and spikes
  for (const side of [-1, 1]) {
    boxes.push({
      id: generateId(),
      name: side === -1 ? "Left Shoulder" : "Right Shoulder",
      position: [side * 0.55, 2.5, 0],
      scale: [0.25, 0.2, 0.25],
      colorType: "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "shoulders"
    })
    for (let spike = 0; spike < 4; spike++) {
      const spikeAngle = (spike / 4) * Math.PI + Math.PI / 4
      boxes.push({
        id: generateId(),
        name: `${side === -1 ? "Left" : "Right"} Spike ${spike}`,
        position: [side * (0.6 + Math.cos(spikeAngle) * 0.1), 2.6 + spike * 0.12, Math.sin(spikeAngle) * 0.1],
        scale: [0.1, 0.2 + spike * 0.04, 0.1],
        colorType: spike % 2 === 0 ? "glow" : "primary",
        colorMultiplier: spike % 2 === 0 ? 2.5 : 1,
        emissive: spike % 2 === 0,
        emissiveIntensity: spike % 2 === 0 ? 0.8 : 0,
        group: "shoulders"
      })
    }
  }
  
  // Floating shards
  for (let shard = 0; shard < 5; shard++) {
    const angle = (shard / 5) * Math.PI * 2
    boxes.push({
      id: generateId(),
      name: `Floating Shard ${shard}`,
      position: [Math.cos(angle) * 0.8, 2.0 + Math.sin(shard * 1.5) * 0.3, Math.sin(angle) * 0.8],
      scale: [0.08, 0.15, 0.08],
      colorType: "glow",
      colorMultiplier: 1.75,
      emissive: true,
      emissiveIntensity: 0.6,
      group: "shards"
    })
  }
  
  // Arms
  for (const side of [-1, 1]) {
    // Upper arm
    for (let i = 0; i < 4; i++) {
      const armWidth = 0.22 - i * 0.02
      boxes.push({
        id: generateId(),
        name: `${side === -1 ? "Left" : "Right"} Upper Arm ${i}`,
        position: [side * 0.6, 2.2 - i * 0.22, 0],
        scale: [armWidth, 0.22, armWidth],
        colorType: i % 2 === 0 ? "secondary" : "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
    // Forearm rune
    boxes.push({
      id: generateId(),
      name: `${side === -1 ? "Left" : "Right"} Forearm Rune`,
      position: [side * 0.62, 1.5, 0.15],
      scale: [0.05, 0.2, 0.03],
      colorType: "custom",
      customColor: "#88ffff",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 0.8,
      group: "arms"
    })
    // Lower arm
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: generateId(),
        name: `${side === -1 ? "Left" : "Right"} Lower Arm ${i}`,
        position: [side * 0.6, 1.3 - i * 0.2, 0],
        scale: [0.2, 0.2, 0.2],
        colorType: "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
    // Crystal fist
    boxes.push({
      id: generateId(),
      name: `${side === -1 ? "Left" : "Right"} Fist`,
      position: [side * 0.6, 0.7, 0],
      scale: [0.28, 0.28, 0.28],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    boxes.push({
      id: generateId(),
      name: `${side === -1 ? "Left" : "Right"} Fist Glow`,
      position: [side * 0.6, 0.7, 0.15],
      scale: [0.1, 0.1, 0.05],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 0.8,
      group: "arms"
    })
  }
  
  // Legs
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: generateId(),
        name: `${side === -1 ? "Left" : "Right"} Upper Leg ${i}`,
        position: [side * 0.28, 1.1 - i * 0.22, 0],
        scale: [0.25, 0.22, 0.25],
        colorType: "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Knee rune
    boxes.push({
      id: generateId(),
      name: `${side === -1 ? "Left" : "Right"} Knee Rune`,
      position: [side * 0.28, 0.25, 0.18],
      scale: [0.08, 0.08, 0.03],
      colorType: "custom",
      customColor: "#88ffff",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 0.8,
      group: "legs"
    })
    // Lower leg
    for (let i = 0; i < 2; i++) {
      boxes.push({
        id: generateId(),
        name: `${side === -1 ? "Left" : "Right"} Lower Leg ${i}`,
        position: [side * 0.28, 0.15 - i * 0.2, 0],
        scale: [0.22, 0.2, 0.22],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Foot
    boxes.push({
      id: generateId(),
      name: `${side === -1 ? "Left" : "Right"} Foot`,
      position: [side * 0.28, 0.08, 0.1],
      scale: [0.3, 0.16, 0.4],
      colorType: "secondary",
      colorMultiplier: 0.7,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
  }
  
  return {
    boxes,
    groups: ["head", "body", "shoulders", "shards", "arms", "legs"]
  }
}

function createDroneModel(): VoxelModel {
  const boxes: VoxelBox[] = []
  
  // Main body rings
  for (let ring = 0; ring < 5; ring++) {
    const ringY = 1.4 + (ring - 2) * 0.12
    const ringSize = 0.35 - Math.abs(ring - 2) * 0.08
    const segments = 8
    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      boxes.push({
        id: generateId(),
        name: `Body Ring ${ring}-${i}`,
        position: [Math.cos(theta) * ringSize, ringY, Math.sin(theta) * ringSize],
        scale: [0.1, 0.12, 0.1],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "body"
      })
    }
  }
  
  // Top dome
  for (let i = 0; i < 6; i++) {
    const theta = (i / 6) * Math.PI * 2
    boxes.push({
      id: generateId(),
      name: `Dome ${i}`,
      position: [Math.cos(theta) * 0.15, 1.7, Math.sin(theta) * 0.15],
      scale: [0.08, 0.08, 0.08],
      colorType: "primary",
      colorMultiplier: 0.8,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }
  boxes.push({
    id: generateId(),
    name: "Dome Top",
    position: [0, 1.78, 0],
    scale: [0.1, 0.08, 0.1],
    colorType: "primary",
    colorMultiplier: 1,
    emissive: false,
    emissiveIntensity: 0,
    group: "body"
  })
  
  // Antenna
  boxes.push({
    id: generateId(),
    name: "Antenna Stem",
    position: [0, 1.9, 0],
    scale: [0.02, 0.12, 0.02],
    colorType: "primary",
    colorMultiplier: 0.6,
    emissive: false,
    emissiveIntensity: 0,
    group: "body"
  })
  boxes.push({
    id: generateId(),
    name: "Antenna Light",
    position: [0, 2.0, 0],
    scale: [0.04, 0.04, 0.04],
    colorType: "custom",
    customColor: "#ff0000",
    colorMultiplier: 2,
    emissive: true,
    emissiveIntensity: 1,
    group: "body"
  })
  
  // Central eye
  boxes.push({
    id: generateId(),
    name: "Main Eye",
    position: [0, 1.4, 0.32],
    scale: [0.18, 0.18, 0.06],
    colorType: "glow",
    colorMultiplier: 2.5,
    emissive: true,
    emissiveIntensity: 1,
    group: "sensors"
  })
  for (let i = 0; i < 8; i++) {
    const theta = (i / 8) * Math.PI * 2
    boxes.push({
      id: generateId(),
      name: `Eye Ring ${i}`,
      position: [Math.cos(theta) * 0.12, 1.4 + Math.sin(theta) * 0.12, 0.3],
      scale: [0.04, 0.04, 0.03],
      colorType: "primary",
      colorMultiplier: 0.5,
      emissive: false,
      emissiveIntensity: 0,
      group: "sensors"
    })
  }
  
  // Secondary sensors
  for (const side of [-1, 1]) {
    boxes.push({
      id: generateId(),
      name: side === -1 ? "Left Sensor" : "Right Sensor",
      position: [side * 0.25, 1.5, 0.2],
      scale: [0.06, 0.06, 0.04],
      colorType: "custom",
      customColor: "#ff0000",
      colorMultiplier: 1.4,
      emissive: true,
      emissiveIntensity: 0.8,
      group: "sensors"
    })
  }
  
  // Rotor arms (4)
  for (let arm = 0; arm < 4; arm++) {
    const angle = (arm / 4) * Math.PI * 2 + Math.PI / 4
    // Arm segments
    for (let seg = 0; seg < 5; seg++) {
      boxes.push({
        id: generateId(),
        name: `Rotor Arm ${arm} Seg ${seg}`,
        position: [Math.cos(angle) * (0.2 + seg * 0.12), 1.65, Math.sin(angle) * (0.2 + seg * 0.12)],
        scale: [0.06, 0.04, 0.06],
        colorType: "primary",
        colorMultiplier: 0.7,
        emissive: false,
        emissiveIntensity: 0,
        group: "rotors"
      })
    }
    // Rotor housing
    boxes.push({
      id: generateId(),
      name: `Rotor Housing ${arm}`,
      position: [Math.cos(angle) * 0.7, 1.68, Math.sin(angle) * 0.7],
      scale: [0.12, 0.06, 0.12],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "rotors"
    })
    // Blades
    for (let blade = 0; blade < 3; blade++) {
      const bladeAngle = angle + (blade / 3) * Math.PI * 2
      boxes.push({
        id: generateId(),
        name: `Rotor ${arm} Blade ${blade}`,
        position: [Math.cos(angle) * 0.7 + Math.cos(bladeAngle) * 0.15, 1.72, Math.sin(angle) * 0.7 + Math.sin(bladeAngle) * 0.15],
        scale: [0.15, 0.02, 0.04],
        colorType: "glow",
        colorMultiplier: 0.75,
        emissive: false,
        emissiveIntensity: 0,
        group: "rotors"
      })
    }
    // Blade glow disc
    boxes.push({
      id: generateId(),
      name: `Rotor ${arm} Glow`,
      position: [Math.cos(angle) * 0.7, 1.74, Math.sin(angle) * 0.7],
      scale: [0.18, 0.02, 0.18],
      colorType: "glow",
      colorMultiplier: 1.25,
      emissive: true,
      emissiveIntensity: 0.5,
      group: "rotors"
    })
  }
  
  // Weapon pods
  for (const side of [-1, 1]) {
    boxes.push({
      id: generateId(),
      name: side === -1 ? "Left Weapon Pod" : "Right Weapon Pod",
      position: [side * 0.15, 1.1, 0.05],
      scale: [0.1, 0.2, 0.1],
      colorType: "primary",
      colorMultiplier: 0.6,
      emissive: false,
      emissiveIntensity: 0,
      group: "weapons"
    })
    boxes.push({
      id: generateId(),
      name: side === -1 ? "Left Weapon Barrel" : "Right Weapon Barrel",
      position: [side * 0.15, 0.95, 0.12],
      scale: [0.04, 0.1, 0.04],
      colorType: "primary",
      colorMultiplier: 0.4,
      emissive: false,
      emissiveIntensity: 0,
      group: "weapons"
    })
  }
  
  // Thruster
  boxes.push({
    id: generateId(),
    name: "Thruster Glow",
    position: [0, 1.0, 0],
    scale: [0.2, 0.06, 0.2],
    colorType: "glow",
    colorMultiplier: 2,
    emissive: true,
    emissiveIntensity: 0.8,
    group: "body"
  })
  
  return {
    boxes,
    groups: ["body", "sensors", "rotors", "weapons"]
  }
}

// ============================================
// VOXEL EDITOR UI COMPONENT
// ============================================

interface VoxelEditorProps {
  voxelModel: VoxelModel
  onVoxelModelChange: (model: VoxelModel) => void
  selectedVoxelId: string | null
  onSelectVoxel: (id: string | null) => void
}

export const VoxelEditor = memo(function VoxelEditor({ 
  voxelModel, 
  onVoxelModelChange, 
  selectedVoxelId, 
  onSelectVoxel 
}: VoxelEditorProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(voxelModel.groups))
  const [filter, setFilter] = useState("")
  
  const toggleGroup = (group: string) => {
    const newSet = new Set(expandedGroups)
    if (newSet.has(group)) {
      newSet.delete(group)
    } else {
      newSet.add(group)
    }
    setExpandedGroups(newSet)
  }
  
  const updateVoxel = useCallback((id: string, updates: Partial<VoxelBox>) => {
    const newBoxes = voxelModel.boxes.map(box => 
      box.id === id ? { ...box, ...updates } : box
    )
    onVoxelModelChange({ ...voxelModel, boxes: newBoxes })
  }, [voxelModel, onVoxelModelChange])
  
  const deleteVoxel = useCallback((id: string) => {
    const newBoxes = voxelModel.boxes.filter(box => box.id !== id)
    onVoxelModelChange({ ...voxelModel, boxes: newBoxes })
    if (selectedVoxelId === id) {
      onSelectVoxel(null)
    }
  }, [voxelModel, onVoxelModelChange, selectedVoxelId, onSelectVoxel])
  
  const duplicateVoxel = useCallback((id: string) => {
    const original = voxelModel.boxes.find(box => box.id === id)
    if (original) {
      const newBox: VoxelBox = {
        ...original,
        id: generateId(),
        name: `${original.name} (copy)`,
        position: [original.position[0] + 0.1, original.position[1], original.position[2]]
      }
      onVoxelModelChange({ ...voxelModel, boxes: [...voxelModel.boxes, newBox] })
      onSelectVoxel(newBox.id)
    }
  }, [voxelModel, onVoxelModelChange, onSelectVoxel])
  
  const addVoxel = useCallback((group: string) => {
    const newBox: VoxelBox = {
      id: generateId(),
      name: "New Voxel",
      position: [0, 1, 0],
      scale: [0.1, 0.1, 0.1],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group
    }
    onVoxelModelChange({ ...voxelModel, boxes: [...voxelModel.boxes, newBox] })
    onSelectVoxel(newBox.id)
  }, [voxelModel, onVoxelModelChange, onSelectVoxel])
  
  const selectedVoxel = selectedVoxelId ? voxelModel.boxes.find(b => b.id === selectedVoxelId) : null
  
  const groupedBoxes = voxelModel.groups.reduce((acc, group) => {
    acc[group] = voxelModel.boxes.filter(b => 
      b.group === group && 
      (filter === "" || b.name.toLowerCase().includes(filter.toLowerCase()))
    )
    return acc
  }, {} as Record<string, VoxelBox[]>)
  
  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-2 border-b border-cyan-500/20">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter voxels..."
          className="w-full px-2 py-1 text-xs font-mono bg-black/50 border border-cyan-500/30 text-white rounded"
        />
      </div>
      
      {/* Voxel List */}
      <div className="flex-1 overflow-y-auto">
        {voxelModel.groups.map(group => (
          <div key={group} className="border-b border-cyan-500/10">
            <button
              onClick={() => toggleGroup(group)}
              className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-mono text-cyan-400 hover:bg-cyan-500/10"
            >
              <span className="uppercase">{group} ({groupedBoxes[group]?.length || 0})</span>
              <span>{expandedGroups.has(group) ? "▼" : "▶"}</span>
            </button>
            
            {expandedGroups.has(group) && (
              <div className="pb-1">
                {groupedBoxes[group]?.map(box => (
                  <button
                    key={box.id}
                    onClick={() => onSelectVoxel(box.id)}
                    className={`w-full flex items-center gap-2 px-3 py-1 text-[10px] font-mono hover:bg-cyan-500/10 ${
                      selectedVoxelId === box.id ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400'
                    }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-sm border border-gray-600" 
                      style={{ 
                        backgroundColor: box.colorType === 'custom' ? box.customColor : 
                          box.colorType === 'primary' ? '#888' : 
                          box.colorType === 'secondary' ? '#666' : '#0ff'
                      }} 
                    />
                    <span className="truncate flex-1 text-left">{box.name}</span>
                    {box.emissive && <span className="text-yellow-400">✦</span>}
                  </button>
                ))}
                <button
                  onClick={() => addVoxel(group)}
                  className="w-full px-3 py-1 text-[10px] font-mono text-green-400 hover:bg-green-500/10 text-left"
                >
                  + Add Voxel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Selected Voxel Editor */}
      {selectedVoxel && (
        <div className="border-t border-cyan-500/30 p-3 space-y-3 max-h-[400px] overflow-y-auto">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono text-cyan-400 uppercase">Edit Voxel</h4>
            <div className="flex gap-1">
              <button
                onClick={() => duplicateVoxel(selectedVoxel.id)}
                className="px-2 py-0.5 text-[10px] font-mono text-cyan-400 border border-cyan-500/30 rounded hover:bg-cyan-500/20"
              >
                Dup
              </button>
              <button
                onClick={() => deleteVoxel(selectedVoxel.id)}
                className="px-2 py-0.5 text-[10px] font-mono text-red-400 border border-red-500/30 rounded hover:bg-red-500/20"
              >
                Del
              </button>
            </div>
          </div>
          
          {/* Name */}
          <div>
            <label className="text-[10px] font-mono text-gray-500">Name</label>
            <input
              type="text"
              value={selectedVoxel.name}
              onChange={(e) => updateVoxel(selectedVoxel.id, { name: e.target.value })}
              className="w-full px-2 py-1 text-xs font-mono bg-black/50 border border-cyan-500/30 text-white rounded"
            />
          </div>
          
          {/* Position */}
          <div>
            <label className="text-[10px] font-mono text-gray-500">Position (X, Y, Z)</label>
            <div className="grid grid-cols-3 gap-1">
              {[0, 1, 2].map(i => (
                <input
                  key={i}
                  type="number"
                  value={selectedVoxel.position[i]}
                  onChange={(e) => {
                    const newPos = [...selectedVoxel.position] as [number, number, number]
                    newPos[i] = parseFloat(e.target.value) || 0
                    updateVoxel(selectedVoxel.id, { position: newPos })
                  }}
                  step={0.01}
                  className="px-2 py-1 text-xs font-mono bg-black/50 border border-cyan-500/30 text-white rounded"
                />
              ))}
            </div>
          </div>
          
          {/* Scale */}
          <div>
            <label className="text-[10px] font-mono text-gray-500">Scale (W, H, D)</label>
            <div className="grid grid-cols-3 gap-1">
              {[0, 1, 2].map(i => (
                <input
                  key={i}
                  type="number"
                  value={selectedVoxel.scale[i]}
                  onChange={(e) => {
                    const newScale = [...selectedVoxel.scale] as [number, number, number]
                    newScale[i] = parseFloat(e.target.value) || 0.01
                    updateVoxel(selectedVoxel.id, { scale: newScale })
                  }}
                  step={0.01}
                  min={0.01}
                  className="px-2 py-1 text-xs font-mono bg-black/50 border border-cyan-500/30 text-white rounded"
                />
              ))}
            </div>
          </div>
          
          {/* Color Type */}
          <div>
            <label className="text-[10px] font-mono text-gray-500">Color Type</label>
            <select
              value={selectedVoxel.colorType}
              onChange={(e) => updateVoxel(selectedVoxel.id, { colorType: e.target.value as VoxelBox["colorType"] })}
              className="w-full px-2 py-1 text-xs font-mono bg-black/50 border border-cyan-500/30 text-white rounded"
            >
              <option value="primary">Primary (Body Color)</option>
              <option value="secondary">Secondary (Armor Color)</option>
              <option value="glow">Glow Color</option>
              <option value="custom">Custom Color</option>
            </select>
          </div>
          
          {/* Custom Color */}
          {selectedVoxel.colorType === "custom" && (
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-mono text-gray-500 w-16">Color</label>
              <input
                type="color"
                value={selectedVoxel.customColor || "#ffffff"}
                onChange={(e) => updateVoxel(selectedVoxel.id, { customColor: e.target.value })}
                className="w-8 h-8 rounded border border-cyan-500/30 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={selectedVoxel.customColor || "#ffffff"}
                onChange={(e) => updateVoxel(selectedVoxel.id, { customColor: e.target.value })}
                className="flex-1 px-2 py-1 text-xs font-mono bg-black/50 border border-cyan-500/30 text-white rounded"
              />
            </div>
          )}
          
          {/* Color Multiplier */}
          <div>
            <label className="text-[10px] font-mono text-gray-500">Brightness ({selectedVoxel.colorMultiplier.toFixed(1)}x)</label>
            <input
              type="range"
              value={selectedVoxel.colorMultiplier}
              onChange={(e) => updateVoxel(selectedVoxel.id, { colorMultiplier: parseFloat(e.target.value) })}
              min={0.1}
              max={5}
              step={0.1}
              className="w-full accent-cyan-500"
            />
          </div>
          
          {/* Emissive */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <input
                type="checkbox"
                checked={selectedVoxel.emissive}
                onChange={(e) => updateVoxel(selectedVoxel.id, { emissive: e.target.checked })}
                className="accent-cyan-500"
              />
              Emissive (Glow)
            </label>
          </div>
          
          {selectedVoxel.emissive && (
            <div>
              <label className="text-[10px] font-mono text-gray-500">Glow Intensity ({selectedVoxel.emissiveIntensity.toFixed(1)})</label>
              <input
                type="range"
                value={selectedVoxel.emissiveIntensity}
                onChange={(e) => updateVoxel(selectedVoxel.id, { emissiveIntensity: parseFloat(e.target.value) })}
                min={0}
                max={2}
                step={0.1}
                className="w-full accent-yellow-500"
              />
            </div>
          )}
          
          {/* Group */}
          <div>
            <label className="text-[10px] font-mono text-gray-500">Group</label>
            <select
              value={selectedVoxel.group}
              onChange={(e) => updateVoxel(selectedVoxel.id, { group: e.target.value })}
              className="w-full px-2 py-1 text-xs font-mono bg-black/50 border border-cyan-500/30 text-white rounded"
            >
              {voxelModel.groups.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
})

// Export helper to get/initialize voxel model from asset
export function getVoxelModelFromAsset(asset: { properties: Record<string, unknown> }): VoxelModel | null {
  const voxelData = asset.properties.voxelModel as VoxelModel | undefined
  return voxelData || null
}

export function initializeVoxelModel(asset: { properties: Record<string, unknown> }): VoxelModel {
  const bodyType = (asset.properties.bodyType as string) || "humanoid"
  return createDefaultVoxelModel(bodyType)
}
