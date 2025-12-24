import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Mech / Boss - Massive bipedal war machine with heavy weapons and armor
 * Converted from: components/entities/enemies/mech.ts
 */

let idCounter = 0
function id() { return `mech_${idCounter++}` }

export function createMechModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Cockpit head (angular, armored)
  for (let hx = -1; hx <= 1; hx++) {
    for (let hz = -1; hz <= 1; hz++) {
      boxes.push({
        id: id(),
        name: `Head ${hx},${hz}`,
        position: [hx * 0.15, 4.4, hz * 0.12],
        scale: [0.18, 0.2, 0.15],
        colorType: "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }
  // Head crest
  boxes.push({
    id: id(),
    name: "Head Crest",
    position: [0, 4.65, -0.05],
    scale: [0.1, 0.15, 0.25],
    colorType: "secondary",
    colorMultiplier: 0.8,
    emissive: false,
    emissiveIntensity: 0,
    group: "head"
  })

  // Visor (wide, menacing)
  for (let vx = -2; vx <= 2; vx++) {
    boxes.push({
      id: id(),
      name: `Visor ${vx + 2}`,
      position: [vx * 0.08, 4.38, 0.22],
      scale: [0.1, 0.06, 0.03],
      colorType: "custom",
      customColor: "#ff0000",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 1,
      group: "head"
    })
  }

  // Neck hydraulics
  for (const side of [-1, 1]) {
    for (let i = 0; i < 2; i++) {
      boxes.push({
        id: id(),
        name: `${side === -1 ? "Left" : "Right"} Neck ${i}`,
        position: [side * 0.15, 4.15 - i * 0.1, 0],
        scale: [0.08, 0.1, 0.08],
        colorType: "primary",
        colorMultiplier: 0.6,
        emissive: false,
        emissiveIntensity: 0,
        group: "body"
      })
    }
  }

  // Massive torso (layered armor plates)
  for (let ty = 0; ty < 8; ty++) {
    const width = 0.7 - Math.abs(ty - 3) * 0.06
    const depth = 0.5 - Math.abs(ty - 3) * 0.04
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: id(),
        name: `Torso ${ty}-${tx}`,
        position: [tx * width * 0.4, 3.8 - ty * 0.22, 0],
        scale: [width * 0.4, 0.22, depth],
        colorType: "secondary",
        colorMultiplier: ty % 2 === 0 ? 1 : 0.85,
        emissive: false,
        emissiveIntensity: 0,
        group: "body"
      })
    }
  }

  // Chest reactor
  boxes.push({
    id: id(),
    name: "Chest Reactor",
    position: [0, 3.4, 0.35],
    scale: [0.25, 0.25, 0.08],
    colorType: "custom",
    customColor: "#00aaff",
    colorMultiplier: 2,
    emissive: true,
    emissiveIntensity: 1,
    group: "body"
  })
  for (let i = 0; i < 6; i++) {
    const theta = (i / 6) * Math.PI * 2
    boxes.push({
      id: id(),
      name: `Reactor Ring ${i}`,
      position: [Math.cos(theta) * 0.18, 3.4 + Math.sin(theta) * 0.18, 0.32],
      scale: [0.06, 0.06, 0.04],
      colorType: "secondary",
      colorMultiplier: 0.5,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }

  // Massive shoulder weapons
  for (const side of [-1, 1]) {
    const sideName = side === -1 ? "Left" : "Right"
    // Shoulder mount base
    boxes.push({
      id: id(),
      name: `${sideName} Shoulder Mount`,
      position: [side * 0.75, 4.0, 0],
      scale: [0.35, 0.25, 0.35],
      colorType: "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "weapons"
    })

    // Weapon housing
    boxes.push({
      id: id(),
      name: `${sideName} Weapon Housing`,
      position: [side * 0.8, 4.15, 0.1],
      scale: [0.25, 0.2, 0.4],
      colorType: "secondary",
      colorMultiplier: 0.8,
      emissive: false,
      emissiveIntensity: 0,
      group: "weapons"
    })

    // Weapon barrels (triple)
    for (let barrel = 0; barrel < 3; barrel++) {
      boxes.push({
        id: id(),
        name: `${sideName} Barrel ${barrel}`,
        position: [side * 0.8, 4.2 - barrel * 0.08, 0.45],
        scale: [0.06, 0.06, 0.25],
        colorType: "primary",
        colorMultiplier: 0.4,
        emissive: false,
        emissiveIntensity: 0,
        group: "weapons"
      })
    }

    // Ammo feed
    boxes.push({
      id: id(),
      name: `${sideName} Ammo Feed`,
      position: [side * 0.65, 3.8, -0.15],
      scale: [0.15, 0.3, 0.15],
      colorType: "primary",
      colorMultiplier: 0.5,
      emissive: false,
      emissiveIntensity: 0,
      group: "weapons"
    })
  }

  // Heavy arms
  for (const side of [-1, 1]) {
    const sideName = side === -1 ? "Left" : "Right"
    // Upper arm (hydraulic)
    for (let i = 0; i < 5; i++) {
      const armWidth = 0.22 - i * 0.015
      boxes.push({
        id: id(),
        name: `${sideName} Upper Arm ${i}`,
        position: [side * 0.7, 3.5 - i * 0.2, 0],
        scale: [armWidth, 0.2, armWidth],
        colorType: i % 2 === 0 ? "secondary" : "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
    // Elbow joint
    boxes.push({
      id: id(),
      name: `${sideName} Elbow`,
      position: [side * 0.7, 2.5, 0],
      scale: [0.18, 0.18, 0.18],
      colorType: "primary",
      colorMultiplier: 0.6,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Forearm with weapon
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id(),
        name: `${sideName} Forearm ${i}`,
        position: [side * 0.7, 2.2 - i * 0.2, 0.05],
        scale: [0.2, 0.2, 0.25],
        colorType: "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
    // Fist/weapon
    boxes.push({
      id: id(),
      name: `${sideName} Fist`,
      position: [side * 0.7, 1.4, 0.1],
      scale: [0.25, 0.25, 0.3],
      colorType: "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Arm cannon barrel
    boxes.push({
      id: id(),
      name: `${sideName} Arm Cannon`,
      position: [side * 0.7, 1.35, 0.35],
      scale: [0.1, 0.1, 0.2],
      colorType: "primary",
      colorMultiplier: 0.4,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
  }

  // Waist/hip armor
  for (let wx = -2; wx <= 2; wx++) {
    boxes.push({
      id: id(),
      name: `Waist ${wx + 2}`,
      position: [wx * 0.15, 1.9, 0],
      scale: [0.18, 0.15, 0.25],
      colorType: "secondary",
      colorMultiplier: 0.9,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }

  // Heavy legs (digitigrade style)
  for (const side of [-1, 1]) {
    const sideName = side === -1 ? "Left" : "Right"
    // Thigh
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id(),
        name: `${sideName} Thigh ${i}`,
        position: [side * 0.35, 1.6 - i * 0.22, i * 0.03],
        scale: [0.28, 0.22, 0.28],
        colorType: "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Knee joint
    boxes.push({
      id: id(),
      name: `${sideName} Knee`,
      position: [side * 0.35, 0.75, 0.15],
      scale: [0.22, 0.2, 0.22],
      colorType: "primary",
      colorMultiplier: 0.6,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
    // Lower leg
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: id(),
        name: `${sideName} Lower Leg ${i}`,
        position: [side * 0.35, 0.5 - i * 0.18, 0.1 - i * 0.02],
        scale: [0.22, 0.18, 0.22],
        colorType: "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Feet (large, stabilizing)
    boxes.push({
      id: id(),
      name: `${sideName} Foot`,
      position: [side * 0.35, 0.08, 0.15],
      scale: [0.3, 0.16, 0.5],
      colorType: "primary",
      colorMultiplier: 0.5,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
    // Toe claws
    for (let toe = 0; toe < 2; toe++) {
      boxes.push({
        id: id(),
        name: `${sideName} Toe ${toe}`,
        position: [side * 0.35 + (toe - 0.5) * 0.15, 0.05, 0.45],
        scale: [0.08, 0.08, 0.12],
        colorType: "primary",
        colorMultiplier: 0.4,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
  }

  // Back reactor/exhaust
  for (let rx = -1; rx <= 1; rx++) {
    boxes.push({
      id: id(),
      name: `Back Reactor ${rx + 1}`,
      position: [rx * 0.25, 3.2, -0.35],
      scale: [0.2, 0.4, 0.15],
      colorType: "primary",
      colorMultiplier: 0.5,
      emissive: false,
      emissiveIntensity: 0,
      group: "exhaust"
    })
    // Exhaust glow
    boxes.push({
      id: id(),
      name: `Exhaust Glow ${rx + 1}`,
      position: [rx * 0.25, 2.9, -0.42],
      scale: [0.15, 0.25, 0.05],
      colorType: "custom",
      customColor: "#00aaff",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 1,
      group: "exhaust"
    })
  }

  return {
    boxes,
    groups: ["head", "body", "weapons", "arms", "legs", "exhaust"]
  }
}

export const MECH_HEIGHT = 4.9
