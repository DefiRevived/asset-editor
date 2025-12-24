import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Netrunner - Hacker with combat wetware (uses drone body but more compact)
 * Based on: enemy-templates.ts netrunner template
 */

let idCounter = 0
function id() { return `netrunner_${idCounter++}` }

export function createNetrunnerModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Compact hovering body (smaller than drone, more humanoid shape)
  // Head with neural interface visor
  for (let hx = -1; hx <= 1; hx++) {
    for (let hz = -1; hz <= 1; hz++) {
      boxes.push({
        id: id(),
        name: `Head ${hx}_${hz}`,
        position: [hx * 0.08, 1.9, hz * 0.06],
        scale: [0.1, 0.12, 0.08],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }

  // Neural interface visor (wraparound)
  for (let i = -3; i <= 3; i++) {
    boxes.push({
      id: id(),
      name: `Visor ${i}`,
      position: [i * 0.05, 1.92, 0.12],
      scale: [0.06, 0.04, 0.02],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "head"
    })
  }

  // Data ports on temples
  for (const side of [-1, 1]) {
    boxes.push({
      id: id(),
      name: `Data Port ${side > 0 ? "R" : "L"}`,
      position: [side * 0.18, 1.9, 0],
      scale: [0.03, 0.06, 0.06],
      colorType: "glow",
      colorMultiplier: 1.5,
      emissive: true,
      emissiveIntensity: 1.5,
      group: "head"
    })
  }

  // Slim torso with exposed circuitry
  for (let ty = 0; ty < 5; ty++) {
    const width = 0.18 - ty * 0.015
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: id(),
        name: `Torso ${ty}_${tx}`,
        position: [tx * 0.08, 1.65 - ty * 0.12, 0],
        scale: [width, 0.12, 0.12],
        colorType: ty % 2 === 0 ? "primary" : "secondary",
        colorMultiplier: ty % 2 === 0 ? 1 : 0.8,
        emissive: false,
        emissiveIntensity: 0,
        group: "torso"
      })
    }
  }

  // Circuit lines on chest
  for (let i = 0; i < 4; i++) {
    boxes.push({
      id: id(),
      name: `Circuit ${i}`,
      position: [0, 1.55 - i * 0.1, 0.08],
      scale: [0.02, 0.08, 0.02],
      colorType: "glow",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "torso"
    })
  }

  // Cybernetic arms
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 5; i++) {
      boxes.push({
        id: id(),
        name: `Arm ${sideName} ${i}`,
        position: [side * 0.28, 1.55 - i * 0.1, 0],
        scale: [0.06, 0.1, 0.06],
        colorType: i % 2 === 0 ? "secondary" : "primary",
        colorMultiplier: 0.8,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
    // Cyber hand
    boxes.push({
      id: id(),
      name: `Hand ${sideName}`,
      position: [side * 0.28, 1.0, 0.02],
      scale: [0.06, 0.08, 0.08],
      colorType: "secondary",
      colorMultiplier: 0.7,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Wrist interface glow
    boxes.push({
      id: id(),
      name: `Wrist Glow ${sideName}`,
      position: [side * 0.3, 1.1, 0.04],
      scale: [0.03, 0.06, 0.03],
      colorType: "glow",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "arms"
    })
  }

  // Legs (slim, hovering slightly)
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 5; i++) {
      boxes.push({
        id: id(),
        name: `Leg ${sideName} ${i}`,
        position: [side * 0.1, 0.85 - i * 0.12, 0],
        scale: [0.07, 0.12, 0.07],
        colorType: "primary",
        colorMultiplier: 0.9,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Boot with hover glow
    boxes.push({
      id: id(),
      name: `Boot ${sideName}`,
      position: [side * 0.1, 0.22, 0.03],
      scale: [0.08, 0.08, 0.12],
      colorType: "secondary",
      colorMultiplier: 0.6,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
    boxes.push({
      id: id(),
      name: `Hover Glow ${sideName}`,
      position: [side * 0.1, 0.12, 0],
      scale: [0.06, 0.04, 0.06],
      colorType: "glow",
      colorMultiplier: 1.5,
      emissive: true,
      emissiveIntensity: 1.5,
      group: "legs"
    })
  }

  // Floating data fragments around head
  for (let frag = 0; frag < 4; frag++) {
    const angle = (frag / 4) * Math.PI * 2
    boxes.push({
      id: id(),
      name: `Data Fragment ${frag}`,
      position: [Math.cos(angle) * 0.35, 2.0 + Math.sin(frag * 2) * 0.1, Math.sin(angle) * 0.35],
      scale: [0.04, 0.06, 0.02],
      colorType: "glow",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["head", "torso", "arms", "legs", "effects"]
  }
}

export const NETRUNNER_HEIGHT = 2.2
