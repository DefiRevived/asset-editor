import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Spirit / Wisp / Sprite - Large floating ethereal entity with magical aura
 * Converted from: components/entities/enemies/spirit.ts
 */

let idCounter = 0
function id() { return `spirit_${idCounter++}` }

export function createSpiritModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Central glowing core
  boxes.push({
    id: id(),
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

  // Inner ring (dense)
  for (let i = 0; i < 8; i++) {
    const theta = (i / 8) * Math.PI * 2
    boxes.push({
      id: id(),
      name: `Inner Ring ${i}`,
      position: [Math.cos(theta) * 0.2, 1.8, Math.sin(theta) * 0.2],
      scale: [0.1, 0.15, 0.1],
      colorType: "glow",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 0.8,
      group: "core"
    })
  }

  // Floating wispy body (larger, more layers)
  for (let ring = 0; ring < 7; ring++) {
    const ringY = 1.2 + ring * 0.22
    const ringSize = 0.25 + Math.sin(ring * 0.7) * 0.12
    const segments = 8 + ring
    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * Math.PI * 2 + ring * 0.4
      boxes.push({
        id: id(),
        name: `Body Ring ${ring}-${i}`,
        position: [Math.cos(theta) * ringSize, ringY, Math.sin(theta) * ringSize],
        scale: [0.1, 0.15, 0.1],
        colorType: ring % 2 === 0 ? "glow" : "primary",
        colorMultiplier: ring % 2 === 0 ? 3 : 1,
        emissive: ring % 2 === 0,
        emissiveIntensity: ring % 2 === 0 ? 0.6 : 0,
        group: "body"
      })
    }
  }

  // Face - Eyes (large, piercing)
  for (const side of [-1, 1]) {
    // Eye socket
    boxes.push({
      id: id(),
      name: side === -1 ? "Left Eye Socket" : "Right Eye Socket",
      position: [side * 0.12, 2.0, 0.18],
      scale: [0.1, 0.12, 0.06],
      colorType: "primary",
      colorMultiplier: 0.3,
      emissive: false,
      emissiveIntensity: 0,
      group: "head"
    })
    // Eye glow
    boxes.push({
      id: id(),
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

  // Ethereal crown/halo
  for (let i = 0; i < 10; i++) {
    const theta = (i / 10) * Math.PI * 2
    boxes.push({
      id: id(),
      name: `Halo ${i}`,
      position: [Math.cos(theta) * 0.3, 2.4, Math.sin(theta) * 0.3],
      scale: [0.06, 0.08, 0.06],
      colorType: "glow",
      colorMultiplier: 2.4,
      emissive: true,
      emissiveIntensity: 0.8,
      group: "head"
    })
  }

  // Orbiting magical spheres
  for (let orb = 0; orb < 3; orb++) {
    const angle = (orb / 3) * Math.PI * 2
    boxes.push({
      id: id(),
      name: `Orb ${orb}`,
      position: [Math.cos(angle) * 0.5, 1.6 + orb * 0.15, Math.sin(angle) * 0.5],
      scale: [0.1, 0.1, 0.1],
      colorType: "glow",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 1,
      group: "orbs"
    })
  }

  // Trailing wisps below (longer, more dramatic)
  for (let trail = 0; trail < 6; trail++) {
    const angle = (trail / 6) * Math.PI * 2
    for (let seg = 0; seg < 6; seg++) {
      const spread = seg * 0.04
      boxes.push({
        id: id(),
        name: `Trail ${trail} Seg ${seg}`,
        position: [Math.cos(angle) * (0.15 + spread), 1.0 - seg * 0.18, Math.sin(angle) * (0.15 + spread)],
        scale: [0.06, 0.14, 0.06],
        colorType: "glow",
        colorMultiplier: 3 * (1 - seg * 0.15),
        emissive: true,
        emissiveIntensity: 0.6 * (1 - seg * 0.15),
        group: "trails"
      })
    }
  }

  // Wispy arm gestures
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id(),
        name: `${side === -1 ? "Left" : "Right"} Arm ${i}`,
        position: [side * (0.3 + i * 0.08), 1.7 - i * 0.1, 0.1],
        scale: [0.08, 0.12, 0.08],
        colorType: "primary",
        colorMultiplier: 1 - i * 0.2,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
  }

  return {
    boxes,
    groups: ["core", "head", "body", "orbs", "trails", "arms"]
  }
}

export const SPIRIT_HEIGHT = 2.7
