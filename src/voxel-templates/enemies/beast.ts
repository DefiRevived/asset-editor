import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Beast / Dire Wolf - Large quadruped predator with thick fur and fangs
 * Converted from: components/entities/enemies/beast.ts
 */

let idCounter = 0
function id() { return `beast_${idCounter++}` }

export function createBeastModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Wolf head - Skull base
  for (let hx = -1; hx <= 1; hx++) {
    for (let hz = 0; hz < 3; hz++) {
      boxes.push({
        id: id(),
        name: `Head ${hx},${hz}`,
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

  // Snout (elongated)
  for (let sz = 0; sz < 4; sz++) {
    const snoutWidth = 0.14 - sz * 0.02
    boxes.push({
      id: id(),
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
    id: id(),
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
      id: id(),
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

  // Ears (larger, pointed)
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: id(),
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

  // Eyes (fierce, glowing)
  for (const side of [-1, 1]) {
    boxes.push({
      id: id(),
      name: side === -1 ? "Left Eye" : "Right Eye",
      position: [side * 0.14, 1.55, 0.5],
      scale: [0.07, 0.06, 0.04],
      colorType: "primary",
      colorMultiplier: 4,
      emissive: true,
      emissiveIntensity: 1,
      group: "head"
    })
    // Eye socket
    boxes.push({
      id: id(),
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

  // Neck (thick, muscular)
  for (let i = 0; i < 3; i++) {
    boxes.push({
      id: id(),
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

  // Body (horizontal, large quadruped)
  for (let seg = 0; seg < 7; seg++) {
    const segWidth = 0.35 - Math.abs(seg - 3) * 0.04
    const segHeight = 0.28 - Math.abs(seg - 3) * 0.02
    for (let layer = 0; layer < 2; layer++) {
      boxes.push({
        id: id(),
        name: `Body Seg ${seg} Layer ${layer}`,
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

  // Spine ridge / fur
  for (let i = 0; i < 6; i++) {
    boxes.push({
      id: id(),
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
    [0.22, 0.0, "Front Left"],
    [-0.22, 0.0, "Front Right"],
    [0.22, -1.1, "Back Left"],
    [-0.22, -1.1, "Back Right"]
  ]
  for (let legIdx = 0; legIdx < 4; legIdx++) {
    const [lx, lz, legName] = legPositions[legIdx]
    const isFront = legIdx < 2
    // Upper leg
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: id(),
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
      id: id(),
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
        id: id(),
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
      id: id(),
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

  // Tail (bushy)
  for (let i = 0; i < 6; i++) {
    const tailWidth = 0.1 - i * 0.01
    boxes.push({
      id: id(),
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

export const BEAST_HEIGHT = 1.9
