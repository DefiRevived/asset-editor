import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * NPC - Generic non-player character with head, visor, torso, arms, and legs
 */
export function createNPCModel(): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  // Head (circular ring of voxels)
  for (let i = 0; i < 6; i++) {
    const theta = (i / 6) * Math.PI * 2
    boxes.push({
      id: `npc-${id++}`,
      name: `head_${i}`,
      position: [Math.cos(theta) * 0.12, 1.7, Math.sin(theta) * 0.12],
      scale: [0.08, 0.08, 0.08],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "head",
    })
  }

  // Visor (3 horizontal segments)
  for (let i = 0; i < 3; i++) {
    boxes.push({
      id: `npc-${id++}`,
      name: `visor_${i}`,
      position: [-0.04 + i * 0.04, 1.72, 0.12],
      scale: [0.08, 0.08, 0.08],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 1,
      group: "head",
    })
  }

  // Torso (5 vertical layers, circular pattern)
  for (let y = 0; y < 5; y++) {
    for (let i = 0; i < 5; i++) {
      const theta = (i / 5) * Math.PI * 2
      boxes.push({
        id: `npc-${id++}`,
        name: `torso_${y}_${i}`,
        position: [Math.cos(theta) * 0.18, 1.35 - y * 0.12, Math.sin(theta) * 0.18],
        scale: [0.08, 0.08, 0.08],
        colorType: y < 3 ? "secondary" : "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "body",
      })
    }
  }

  // Arms
  for (const side of [-1, 1]) {
    const sideLabel = side < 0 ? "left" : "right"
    for (let i = 0; i < 6; i++) {
      boxes.push({
        id: `npc-${id++}`,
        name: `arm_${sideLabel}_${i}`,
        position: [side * 0.3, 1.25 - i * 0.1, 0],
        scale: [0.08, 0.08, 0.08],
        colorType: i < 3 ? "secondary" : "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms",
      })
    }
  }

  // Legs
  for (const side of [-1, 1]) {
    const sideLabel = side < 0 ? "left" : "right"
    for (let i = 0; i < 6; i++) {
      boxes.push({
        id: `npc-${id++}`,
        name: `leg_${sideLabel}_${i}`,
        position: [side * 0.1, 0.65 - i * 0.12, 0],
        scale: [0.08, 0.08, 0.08],
        colorType: "secondary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs",
      })
    }
  }

  return {
    boxes,
    groups: ["head", "body", "arms", "legs"],
  }
}

export const NPC_HEIGHT = 2.0
