import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Enforcer - Heavy corporate muscle (beefier corp-security)
 * Based on: enemy-templates.ts enforcer template
 */

let idCounter = 0
function id() { return `enforcer_${idCounter++}` }

export function createEnforcerModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Heavy helmet (larger, more angular than corp-security)
  for (let hx = -2; hx <= 2; hx++) {
    for (let hz = -1; hz <= 1; hz++) {
      for (let hy = 0; hy < 3; hy++) {
        boxes.push({
          id: id(),
          name: `Helmet ${hx}_${hz}_${hy}`,
          position: [hx * 0.1, 2.1 + hy * 0.12, hz * 0.1],
          scale: [0.12, 0.12, 0.12],
          colorType: "secondary",
          colorMultiplier: 1,
          emissive: false,
          emissiveIntensity: 0,
          group: "helmet"
        })
      }
    }
  }

  // Reinforced visor (glowing, intimidating)
  for (let vx = -3; vx <= 3; vx++) {
    boxes.push({
      id: id(),
      name: `Visor ${vx}`,
      position: [vx * 0.06, 2.18, 0.2],
      scale: [0.08, 0.06, 0.03],
      colorType: "custom",
      customColor: "#ff3333",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "helmet"
    })
  }

  // Helmet crest
  boxes.push({
    id: id(),
    name: "Helmet Crest",
    position: [0, 2.45, -0.05],
    scale: [0.06, 0.15, 0.2],
    colorType: "secondary",
    colorMultiplier: 1.2,
    emissive: false,
    emissiveIntensity: 0,
    group: "helmet"
  })

  // Thick neck
  boxes.push({
    id: id(),
    name: "Neck",
    position: [0, 1.95, 0],
    scale: [0.16, 0.12, 0.14],
    colorType: "primary",
    colorMultiplier: 0.8,
    emissive: false,
    emissiveIntensity: 0,
    group: "torso"
  })

  // Massive armored torso
  for (let ty = 0; ty < 6; ty++) {
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: id(),
        name: `Torso ${ty}_${tx}`,
        position: [tx * 0.14, 1.75 - ty * 0.14, 0],
        scale: [0.16, 0.14, 0.2],
        colorType: ty < 3 ? "secondary" : "primary",
        colorMultiplier: ty < 3 ? 1 : 0.85,
        emissive: false,
        emissiveIntensity: 0,
        group: "torso"
      })
    }
  }

  // Chest armor plates
  for (const side of [-1, 1]) {
    boxes.push({
      id: id(),
      name: `Chest Plate ${side > 0 ? "R" : "L"}`,
      position: [side * 0.15, 1.65, 0.12],
      scale: [0.12, 0.2, 0.04],
      colorType: "secondary",
      colorMultiplier: 1.1,
      emissive: false,
      emissiveIntensity: 0,
      group: "torso"
    })
  }

  // Warning lights on chest
  boxes.push({
    id: id(),
    name: "Chest Light",
    position: [0, 1.55, 0.15],
    scale: [0.08, 0.08, 0.03],
    colorType: "custom",
    customColor: "#ff3333",
    colorMultiplier: 2,
    emissive: true,
    emissiveIntensity: 2,
    group: "torso"
  })

  // Massive shoulder pads
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let sy = 0; sy < 3; sy++) {
      boxes.push({
        id: id(),
        name: `Shoulder ${sideName} ${sy}`,
        position: [side * 0.48, 1.8 - sy * 0.08, 0],
        scale: [0.18, 0.1, 0.16],
        colorType: "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "shoulders"
      })
    }
    // Shoulder spikes
    boxes.push({
      id: id(),
      name: `Shoulder Spike ${sideName}`,
      position: [side * 0.52, 1.88, 0],
      scale: [0.08, 0.12, 0.16],
      colorType: "secondary",
      colorMultiplier: 1.2,
      emissive: false,
      emissiveIntensity: 0,
      group: "shoulders"
    })
  }

  // Heavy arms
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    // Upper arm
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id(),
        name: `Upper Arm ${sideName} ${i}`,
        position: [side * 0.48, 1.55 - i * 0.12, 0],
        scale: [0.12, 0.12, 0.12],
        colorType: i % 2 === 0 ? "secondary" : "primary",
        colorMultiplier: 0.9,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
    // Elbow armor
    boxes.push({
      id: id(),
      name: `Elbow ${sideName}`,
      position: [side * 0.48, 1.1, 0.04],
      scale: [0.1, 0.1, 0.1],
      colorType: "secondary",
      colorMultiplier: 0.8,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Forearm
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: id(),
        name: `Forearm ${sideName} ${i}`,
        position: [side * 0.48, 0.95 - i * 0.12, 0.03],
        scale: [0.11, 0.12, 0.11],
        colorType: "secondary",
        colorMultiplier: 0.9,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
    // Gauntlet
    boxes.push({
      id: id(),
      name: `Gauntlet ${sideName}`,
      position: [side * 0.48, 0.55, 0.05],
      scale: [0.12, 0.12, 0.14],
      colorType: "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
  }

  // Belt with pouches
  for (let bx = -3; bx <= 3; bx++) {
    boxes.push({
      id: id(),
      name: `Belt ${bx}`,
      position: [bx * 0.08, 0.98, 0],
      scale: [0.1, 0.1, 0.14],
      colorType: "primary",
      colorMultiplier: 0.5,
      emissive: false,
      emissiveIntensity: 0,
      group: "torso"
    })
  }

  // Heavy armored legs
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    // Thigh
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id(),
        name: `Thigh ${sideName} ${i}`,
        position: [side * 0.18, 0.85 - i * 0.14, 0],
        scale: [0.14, 0.14, 0.14],
        colorType: "secondary",
        colorMultiplier: 0.95,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Knee pad
    boxes.push({
      id: id(),
      name: `Knee Pad ${sideName}`,
      position: [side * 0.18, 0.32, 0.08],
      scale: [0.12, 0.12, 0.1],
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
        name: `Shin ${sideName} ${i}`,
        position: [side * 0.18, 0.18 - i * 0.12, 0],
        scale: [0.12, 0.12, 0.12],
        colorType: "secondary",
        colorMultiplier: 0.9,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Heavy boot
    boxes.push({
      id: id(),
      name: `Boot ${sideName}`,
      position: [side * 0.18, 0.06, 0.05],
      scale: [0.14, 0.12, 0.2],
      colorType: "primary",
      colorMultiplier: 0.4,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
  }

  return {
    boxes,
    groups: ["helmet", "torso", "shoulders", "arms", "legs"]
  }
}

export const ENFORCER_HEIGHT = 2.5
