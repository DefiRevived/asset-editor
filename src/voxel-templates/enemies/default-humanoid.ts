import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Default Humanoid - Fallback generic humanoid shape with better proportions
 * Converted from: components/entities/enemies/default-humanoid.ts
 */

let idCounter = 0
function id() { return `humanoid_${idCounter++}` }

export function createDefaultHumanoidModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Head (larger, more defined)
  for (let hx = -1; hx <= 1; hx++) {
    for (let hy = 0; hy < 2; hy++) {
      boxes.push({
        id: id(),
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
      id: id(),
      name: `Visor ${i}`,
      position: [-0.06 + i * 0.04, 2.05, 0.12],
      scale: [0.05, 0.04, 0.03],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 0.8,
      group: "head"
    })
  }

  // Neck
  boxes.push({
    id: id(),
    name: "Neck",
    position: [0, 1.88, 0],
    scale: [0.1, 0.08, 0.1],
    colorType: "primary",
    colorMultiplier: 0.8,
    emissive: false,
    emissiveIntensity: 0,
    group: "body"
  })

  // Torso (layered)
  for (let ty = 0; ty < 5; ty++) {
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: id(),
        name: `Torso ${ty}-${tx}`,
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
      id: id(),
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
        id: id(),
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
      id: id(),
      name: `${side === -1 ? "Left" : "Right"} Hand`,
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
      id: id(),
      name: `Belt ${bx + 2}`,
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
        id: id(),
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
    // Boot
    boxes.push({
      id: id(),
      name: `${side === -1 ? "Left" : "Right"} Boot`,
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

export const DEFAULT_HUMANOID_HEIGHT = 2.4
