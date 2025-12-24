import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Golem / Guardian - Massive crystalline/rock construct with glowing runes
 * Converted from: components/entities/enemies/golem.ts
 */

let idCounter = 0
function id() { return `golem_${idCounter++}` }

export function createGolemModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Crystalline head (larger, more angular)
  for (let ring = 0; ring < 2; ring++) {
    const headAngles = [0, Math.PI/3, 2*Math.PI/3, Math.PI, 4*Math.PI/3, 5*Math.PI/3]
    for (let i = 0; i < headAngles.length; i++) {
      const angle = headAngles[i]
      boxes.push({
        id: id(),
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

  // Head core glow
  boxes.push({
    id: id(),
    name: "Head Core",
    position: [0, 3.1, 0],
    scale: [0.18, 0.25, 0.18],
    colorType: "glow",
    colorMultiplier: 2.5,
    emissive: true,
    emissiveIntensity: 0.8,
    group: "head"
  })

  // Face - glowing eye sockets
  for (const side of [-1, 1]) {
    boxes.push({
      id: id(),
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
      id: id(),
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

  // Massive crystal torso (layered rock/crystal)
  for (let ty = 0; ty < 7; ty++) {
    const width = 0.55 - Math.abs(ty - 3) * 0.05
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: id(),
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
    id: id(),
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

  // Shoulder crystals (larger, dramatic spikes)
  for (const side of [-1, 1]) {
    // Shoulder base
    boxes.push({
      id: id(),
      name: side === -1 ? "Left Shoulder" : "Right Shoulder",
      position: [side * 0.55, 2.5, 0],
      scale: [0.25, 0.2, 0.25],
      colorType: "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "shoulders"
    })
    // Crystal spikes
    for (let spike = 0; spike < 4; spike++) {
      const spikeAngle = (spike / 4) * Math.PI + Math.PI / 4
      boxes.push({
        id: id(),
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

  // Floating crystal shards around body
  for (let shard = 0; shard < 5; shard++) {
    const angle = (shard / 5) * Math.PI * 2
    boxes.push({
      id: id(),
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

  // Thick rocky arms
  for (const side of [-1, 1]) {
    // Upper arm
    for (let i = 0; i < 4; i++) {
      const armWidth = 0.22 - i * 0.02
      boxes.push({
        id: id(),
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
    // Forearm runes
    boxes.push({
      id: id(),
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
        id: id(),
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
      id: id(),
      name: `${side === -1 ? "Left" : "Right"} Fist`,
      position: [side * 0.6, 0.7, 0],
      scale: [0.28, 0.28, 0.28],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Fist glow
    boxes.push({
      id: id(),
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

  // Sturdy legs
  for (const side of [-1, 1]) {
    // Thigh
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id(),
        name: `${side === -1 ? "Left" : "Right"} Thigh ${i}`,
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
      id: id(),
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
        id: id(),
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
      id: id(),
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

export const GOLEM_HEIGHT = 3.5
