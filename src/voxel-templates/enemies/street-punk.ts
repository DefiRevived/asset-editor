import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Street Punk - Mohawk, spiky shoulders, neon eye implants, cyber-augmented
 * Converted from: components/entities/enemies/street-punk.ts
 */

let idCounter = 0
function id() { return `streetpunk_${idCounter++}` }

export function createStreetPunkModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Tall mohawk (8 spikes)
  for (let i = 0; i < 8; i++) {
    const height = 0.12 - Math.abs(i - 3.5) * 0.015
    boxes.push({
      id: id(),
      name: `Mohawk ${i}`,
      position: [0, 2.15 + i * 0.08, -0.03],
      scale: [0.05, height, 0.15],
      colorType: i % 2 === 0 ? "glow" : "custom",
      customColor: i % 2 === 0 ? undefined : "#ff00ff",
      colorMultiplier: i % 2 === 0 ? 3.5 : 2,
      emissive: true,
      emissiveIntensity: 0.8,
      group: "head"
    })
  }

  // Head base (angular)
  for (let hx = -1; hx <= 1; hx++) {
    for (let hy = 0; hy < 2; hy++) {
      boxes.push({
        id: id(),
        name: `Head ${hx},${hy}`,
        position: [hx * 0.08, 1.95 + hy * 0.1, 0],
        scale: [0.1, 0.1, 0.12],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }

  // Cyber jaw implant
  boxes.push({
    id: id(),
    name: "Cyber Jaw",
    position: [0, 1.88, 0.08],
    scale: [0.14, 0.06, 0.06],
    colorType: "secondary",
    colorMultiplier: 0.7,
    emissive: false,
    emissiveIntensity: 0,
    group: "head"
  })

  // Glowing eye implants
  for (const side of [-1, 1]) {
    boxes.push({
      id: id(),
      name: side === -1 ? "Left Eye" : "Right Eye",
      position: [side * 0.08, 2.0, 0.12],
      scale: [0.06, 0.04, 0.03],
      colorType: "glow",
      colorMultiplier: 3.5,
      emissive: true,
      emissiveIntensity: 1,
      group: "head"
    })
    // Eye glow trail
    boxes.push({
      id: id(),
      name: side === -1 ? "Left Eye Trail" : "Right Eye Trail",
      position: [side * 0.12, 2.0, 0.1],
      scale: [0.04, 0.02, 0.02],
      colorType: "glow",
      colorMultiplier: 1.75,
      emissive: true,
      emissiveIntensity: 0.5,
      group: "head"
    })
  }

  // Neck with cables
  boxes.push({
    id: id(),
    name: "Neck",
    position: [0, 1.82, 0],
    scale: [0.1, 0.08, 0.08],
    colorType: "primary",
    colorMultiplier: 1,
    emissive: false,
    emissiveIntensity: 0,
    group: "body"
  })
  for (const side of [-1, 1]) {
    boxes.push({
      id: id(),
      name: side === -1 ? "Left Neck Cable" : "Right Neck Cable",
      position: [side * 0.08, 1.82, -0.02],
      scale: [0.03, 0.06, 0.03],
      colorType: "glow",
      colorMultiplier: 1.4,
      emissive: true,
      emissiveIntensity: 0.4,
      group: "body"
    })
  }

  // Jacket torso (open front, layered)
  for (let ty = 0; ty < 5; ty++) {
    for (let tx = -1; tx <= 1; tx++) {
      if (ty < 2 || tx !== 0) {
        boxes.push({
          id: id(),
          name: `Jacket ${ty}-${tx}`,
          position: [tx * 0.1, 1.65 - ty * 0.13, -0.02],
          scale: [0.12, 0.13, 0.14],
          colorType: "secondary",
          colorMultiplier: 1,
          emissive: false,
          emissiveIntensity: 0,
          group: "body"
        })
      }
    }
  }

  // Jacket collar
  for (const side of [-1, 1]) {
    boxes.push({
      id: id(),
      name: side === -1 ? "Left Collar" : "Right Collar",
      position: [side * 0.12, 1.72, 0.06],
      scale: [0.06, 0.1, 0.08],
      colorType: "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }

  // Chest (visible under jacket)
  for (let ty = 0; ty < 3; ty++) {
    boxes.push({
      id: id(),
      name: `Chest ${ty}`,
      position: [0, 1.55 - ty * 0.1, 0.04],
      scale: [0.08, 0.1, 0.08],
      colorType: "primary",
      colorMultiplier: 0.8,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }

  // Spiky shoulder pads
  for (const side of [-1, 1]) {
    const sideName = side === -1 ? "Left" : "Right"
    // Base pad
    boxes.push({
      id: id(),
      name: `${sideName} Shoulder Pad`,
      position: [side * 0.28, 1.65, 0],
      scale: [0.12, 0.08, 0.12],
      colorType: "secondary",
      colorMultiplier: 0.8,
      emissive: false,
      emissiveIntensity: 0,
      group: "shoulders"
    })
    // Spikes
    for (let spike = 0; spike < 4; spike++) {
      const angle = (spike / 4) * Math.PI - Math.PI / 2
      boxes.push({
        id: id(),
        name: `${sideName} Spike ${spike}`,
        position: [side * 0.3 + Math.cos(angle) * 0.06 * side, 1.72 + spike * 0.04, Math.sin(angle) * 0.04],
        scale: [0.03, 0.06 + spike * 0.01, 0.03],
        colorType: spike % 2 === 0 ? "glow" : "custom",
        customColor: spike % 2 === 0 ? undefined : "#ff00ff",
        colorMultiplier: spike % 2 === 0 ? 3.5 : 2,
        emissive: true,
        emissiveIntensity: 0.8,
        group: "shoulders"
      })
    }
  }

  // Arms (with cyber augments)
  for (const side of [-1, 1]) {
    const sideName = side === -1 ? "Left" : "Right"
    for (let i = 0; i < 6; i++) {
      boxes.push({
        id: id(),
        name: `${sideName} Arm ${i}`,
        position: [side * 0.32, 1.5 - i * 0.11, 0],
        scale: [0.07, 0.11, 0.07],
        colorType: i < 3 ? "primary" : "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
    // Cyber forearm panel
    boxes.push({
      id: id(),
      name: `${sideName} Cyber Panel`,
      position: [side * 0.34, 1.0, 0.05],
      scale: [0.04, 0.15, 0.03],
      colorType: "glow",
      colorMultiplier: 2.1,
      emissive: true,
      emissiveIntensity: 0.6,
      group: "arms"
    })
  }

  // Belt with pouches
  for (let bx = -2; bx <= 2; bx++) {
    boxes.push({
      id: id(),
      name: `Belt ${bx + 2}`,
      position: [bx * 0.06, 1.0, 0],
      scale: [0.07, 0.06, 0.1],
      colorType: "primary",
      colorMultiplier: 0.5,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }

  // Legs (skinny jeans style)
  for (const side of [-1, 1]) {
    const sideName = side === -1 ? "Left" : "Right"
    for (let i = 0; i < 7; i++) {
      const legWidth = 0.08 - i * 0.003
      boxes.push({
        id: id(),
        name: `${sideName} Leg ${i}`,
        position: [side * 0.1, 0.85 - i * 0.12, 0],
        scale: [legWidth, 0.12, legWidth],
        colorType: "secondary",
        colorMultiplier: 0.7,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Boots
    boxes.push({
      id: id(),
      name: `${sideName} Boot`,
      position: [side * 0.1, 0.05, 0.03],
      scale: [0.09, 0.1, 0.14],
      colorType: "primary",
      colorMultiplier: 0.4,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
  }

  return {
    boxes,
    groups: ["head", "body", "shoulders", "arms", "legs"]
  }
}

export const STREET_PUNK_HEIGHT = 2.9
