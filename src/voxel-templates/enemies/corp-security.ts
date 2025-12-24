import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Corp Security / Enforcer - Armored humanoid with blocky helmet and shoulder pads
 * Converted from: components/entities/enemies/corp-security.ts
 */

let idCounter = 0
function id() { return `corpsec_${idCounter++}` }

export function createCorpSecurityModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Helmet (boxy, angular) - larger 4x4 grid
  for (let hx = -1.5; hx <= 1.5; hx++) {
    for (let hz = -1; hz <= 1; hz++) {
      for (let hy = 0; hy < 2; hy++) {
        boxes.push({
          id: id(),
          name: `Helmet ${Math.round(hx + 1.5)},${hz + 1},${hy}`,
          position: [hx * 0.1, 2.0 + hy * 0.12, hz * 0.1],
          scale: [0.12, 0.12, 0.12],
          colorType: "secondary",
          colorMultiplier: 1,
          emissive: false,
          emissiveIntensity: 0,
          group: "head"
        })
      }
    }
  }

  // Visor (glowing T-shape)
  for (let vx = -2; vx <= 2; vx++) {
    boxes.push({
      id: id(),
      name: `Visor H ${vx + 2}`,
      position: [vx * 0.06, 2.08, 0.18],
      scale: [0.07, 0.05, 0.03],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 1,
      group: "head"
    })
  }
  boxes.push({
    id: id(),
    name: "Visor V",
    position: [0, 2.0, 0.18],
    scale: [0.07, 0.08, 0.03],
    colorType: "glow",
    colorMultiplier: 2.5,
    emissive: true,
    emissiveIntensity: 1,
    group: "head"
  })

  // Neck
  boxes.push({
    id: id(),
    name: "Neck",
    position: [0, 1.85, 0],
    scale: [0.12, 0.1, 0.1],
    colorType: "primary",
    colorMultiplier: 1,
    emissive: false,
    emissiveIntensity: 0,
    group: "body"
  })

  // Armored torso (blocky chest plate)
  for (let ty = 0; ty < 5; ty++) {
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: id(),
        name: `Torso ${ty}-${tx}`,
        position: [tx * 0.12, 1.65 - ty * 0.14, 0],
        scale: [0.14, 0.14, 0.18],
        colorType: "secondary",
        colorMultiplier: ty < 2 ? 1 : 0.85,
        emissive: false,
        emissiveIntensity: 0,
        group: "body"
      })
    }
  }

  // Chest emblem
  boxes.push({
    id: id(),
    name: "Chest Emblem",
    position: [0, 1.55, 0.12],
    scale: [0.1, 0.1, 0.03],
    colorType: "glow",
    colorMultiplier: 2.5,
    emissive: true,
    emissiveIntensity: 0.8,
    group: "body"
  })

  // Shoulder pads (larger, more defined)
  for (const side of [-1, 1]) {
    const sideName = side === -1 ? "Left" : "Right"
    for (let sy = 0; sy < 2; sy++) {
      boxes.push({
        id: id(),
        name: `${sideName} Shoulder ${sy}`,
        position: [side * 0.38, 1.7 - sy * 0.08, 0],
        scale: [0.15, 0.1, 0.14],
        colorType: "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "shoulders"
      })
    }
    // Shoulder ridge
    boxes.push({
      id: id(),
      name: `${sideName} Shoulder Ridge`,
      position: [side * 0.4, 1.78, 0],
      scale: [0.08, 0.06, 0.16],
      colorType: "secondary",
      colorMultiplier: 1.2,
      emissive: false,
      emissiveIntensity: 0,
      group: "shoulders"
    })
  }

  // Arms (mechanical, segmented)
  for (const side of [-1, 1]) {
    const sideName = side === -1 ? "Left" : "Right"
    // Upper arm
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id(),
        name: `${sideName} Upper Arm ${i}`,
        position: [side * 0.4, 1.5 - i * 0.12, 0],
        scale: [0.1, 0.12, 0.1],
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
      position: [side * 0.4, 1.05, 0.03],
      scale: [0.08, 0.08, 0.08],
      colorType: "primary",
      colorMultiplier: 0.7,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Forearm
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: id(),
        name: `${sideName} Forearm ${i}`,
        position: [side * 0.4, 0.9 - i * 0.12, 0.03],
        scale: [0.09, 0.12, 0.09],
        colorType: "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
    // Hand
    boxes.push({
      id: id(),
      name: `${sideName} Hand`,
      position: [side * 0.4, 0.5, 0.05],
      scale: [0.08, 0.1, 0.1],
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
      id: id(),
      name: `Belt ${bx + 2}`,
      position: [bx * 0.08, 0.95, 0],
      scale: [0.1, 0.08, 0.12],
      colorType: "primary",
      colorMultiplier: 0.6,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }

  // Legs (armored, thicker)
  for (const side of [-1, 1]) {
    const sideName = side === -1 ? "Left" : "Right"
    // Thigh
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id(),
        name: `${sideName} Thigh ${i}`,
        position: [side * 0.15, 0.8 - i * 0.14, 0],
        scale: [0.12, 0.14, 0.12],
        colorType: "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Knee pad
    boxes.push({
      id: id(),
      name: `${sideName} Knee Pad`,
      position: [side * 0.15, 0.28, 0.06],
      scale: [0.1, 0.1, 0.08],
      colorType: "secondary",
      colorMultiplier: 1.1,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
    // Shin
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: id(),
        name: `${sideName} Shin ${i}`,
        position: [side * 0.15, 0.15 - i * 0.12, 0],
        scale: [0.1, 0.12, 0.1],
        colorType: "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Boot
    boxes.push({
      id: id(),
      name: `${sideName} Boot`,
      position: [side * 0.15, 0.05, 0.04],
      scale: [0.11, 0.1, 0.16],
      colorType: "primary",
      colorMultiplier: 0.5,
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

export const CORP_SECURITY_HEIGHT = 2.5
