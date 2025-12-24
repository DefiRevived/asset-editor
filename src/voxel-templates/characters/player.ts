import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Player Character - First person shooter protagonist template
 * Note: Player is typically rendered from first-person, so this is for third-person/preview
 */
export function createPlayerModel(): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  // Head (circular ring)
  for (let i = 0; i < 8; i++) {
    const theta = (i / 8) * Math.PI * 2
    boxes.push({
      id: `player-${id++}`,
      name: `head_${i}`,
      position: [Math.cos(theta) * 0.12, 1.7, Math.sin(theta) * 0.12],
      scale: [0.08, 0.1, 0.08],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "head",
    })
  }

  // Helmet top
  boxes.push({
    id: `player-${id++}`,
    name: "helmet_top",
    position: [0, 1.8, 0],
    scale: [0.14, 0.08, 0.14],
    colorType: "secondary",
    colorMultiplier: 1,
    emissive: false,
    emissiveIntensity: 0,
    group: "head",
  })

  // Visor (T-shape cyber visor)
  for (let i = 0; i < 5; i++) {
    boxes.push({
      id: `player-${id++}`,
      name: `visor_h_${i}`,
      position: [-0.08 + i * 0.04, 1.72, 0.14],
      scale: [0.04, 0.04, 0.04],
      colorType: "glow",
      customColor: "#00ffff",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 1,
      group: "head",
    })
  }
  // Visor vertical line
  for (let i = 0; i < 2; i++) {
    boxes.push({
      id: `player-${id++}`,
      name: `visor_v_${i}`,
      position: [0, 1.68 - i * 0.04, 0.14],
      scale: [0.04, 0.04, 0.04],
      colorType: "glow",
      customColor: "#00ffff",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 1,
      group: "head",
    })
  }

  // Neck
  boxes.push({
    id: `player-${id++}`,
    name: "neck",
    position: [0, 1.55, 0],
    scale: [0.08, 0.08, 0.08],
    colorType: "primary",
    colorMultiplier: 0.8,
    emissive: false,
    emissiveIntensity: 0,
    group: "body",
  })

  // Upper torso with armor plates
  for (let y = 0; y < 4; y++) {
    const width = 0.2 - y * 0.02
    for (let i = 0; i < 6; i++) {
      const theta = (i / 6) * Math.PI * 2
      boxes.push({
        id: `player-${id++}`,
        name: `upper_torso_${y}_${i}`,
        position: [Math.cos(theta) * width, 1.45 - y * 0.1, Math.sin(theta) * width],
        scale: [0.1, 0.1, 0.1],
        colorType: "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "body",
      })
    }
  }

  // Lower torso
  for (let y = 0; y < 3; y++) {
    for (let i = 0; i < 5; i++) {
      const theta = (i / 5) * Math.PI * 2
      boxes.push({
        id: `player-${id++}`,
        name: `lower_torso_${y}_${i}`,
        position: [Math.cos(theta) * 0.15, 1.0 - y * 0.12, Math.sin(theta) * 0.15],
        scale: [0.08, 0.1, 0.08],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "body",
      })
    }
  }

  // Shoulder pads
  for (const side of [-1, 1]) {
    const sideLabel = side < 0 ? "left" : "right"
    boxes.push({
      id: `player-${id++}`,
      name: `shoulder_${sideLabel}`,
      position: [side * 0.28, 1.42, 0],
      scale: [0.12, 0.08, 0.12],
      colorType: "secondary",
      colorMultiplier: 1.1,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms",
    })
  }

  // Arms
  for (const side of [-1, 1]) {
    const sideLabel = side < 0 ? "left" : "right"
    for (let i = 0; i < 7; i++) {
      boxes.push({
        id: `player-${id++}`,
        name: `arm_${sideLabel}_${i}`,
        position: [side * 0.28, 1.32 - i * 0.1, 0],
        scale: [0.08, 0.1, 0.08],
        colorType: i < 4 ? "secondary" : "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms",
      })
    }
    // Hand
    boxes.push({
      id: `player-${id++}`,
      name: `hand_${sideLabel}`,
      position: [side * 0.28, 0.58, 0.04],
      scale: [0.06, 0.08, 0.1],
      colorType: "primary",
      colorMultiplier: 0.9,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms",
    })
  }

  // Belt
  for (let i = 0; i < 8; i++) {
    const theta = (i / 8) * Math.PI * 2
    boxes.push({
      id: `player-${id++}`,
      name: `belt_${i}`,
      position: [Math.cos(theta) * 0.16, 0.7, Math.sin(theta) * 0.16],
      scale: [0.06, 0.08, 0.06],
      colorType: "secondary",
      colorMultiplier: 0.7,
      emissive: false,
      emissiveIntensity: 0,
      group: "body",
    })
  }

  // Legs
  for (const side of [-1, 1]) {
    const sideLabel = side < 0 ? "left" : "right"
    for (let i = 0; i < 7; i++) {
      boxes.push({
        id: `player-${id++}`,
        name: `leg_${sideLabel}_${i}`,
        position: [side * 0.1, 0.6 - i * 0.1, 0],
        scale: [0.09, 0.1, 0.09],
        colorType: i < 3 ? "secondary" : "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs",
      })
    }
    // Boot
    boxes.push({
      id: `player-${id++}`,
      name: `boot_${sideLabel}`,
      position: [side * 0.1, 0.05, 0.03],
      scale: [0.1, 0.1, 0.15],
      colorType: "secondary",
      colorMultiplier: 0.6,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs",
    })
  }

  return {
    boxes,
    groups: ["head", "body", "arms", "legs"],
  }
}

export const PLAYER_HEIGHT = 1.9
