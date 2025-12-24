import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Wraith / Phantom - Hooded spectral figure with flowing robes and skeletal features
 * Converted from: components/entities/enemies/wraith.ts
 */

let idCounter = 0
function id() { return `wraith_${idCounter++}` }

export function createWraithModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Deep hood (larger, more dramatic)
  for (let layer = 0; layer < 4; layer++) {
    const hoodSize = 0.35 - layer * 0.06
    const hoodDepth = 0.3 - layer * 0.05
    for (let hx = -1; hx <= 1; hx++) {
      boxes.push({
        id: id(),
        name: `Hood Layer ${layer}-${hx}`,
        position: [hx * hoodSize * 0.4, 2.4 - layer * 0.1, -layer * 0.04],
        scale: [hoodSize * 0.5, 0.15, hoodDepth],
        colorType: "primary",
        colorMultiplier: 0.3 + layer * 0.15,
        emissive: false,
        emissiveIntensity: 0,
        group: "hood"
      })
    }
  }

  // Hood peak
  boxes.push({
    id: id(),
    name: "Hood Peak",
    position: [0, 2.6, -0.1],
    scale: [0.15, 0.2, 0.2],
    colorType: "primary",
    colorMultiplier: 0.4,
    emissive: false,
    emissiveIntensity: 0,
    group: "hood"
  })

  // Darkness inside hood
  boxes.push({
    id: id(),
    name: "Hood Darkness",
    position: [0, 2.25, 0.1],
    scale: [0.2, 0.2, 0.1],
    colorType: "primary",
    colorMultiplier: 0.2,
    emissive: false,
    emissiveIntensity: 0,
    group: "hood"
  })

  // Glowing eyes deep in shadow (larger, more menacing)
  for (const side of [-1, 1]) {
    // Eye glow
    boxes.push({
      id: id(),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.1, 2.28, 0.15],
      scale: [0.06, 0.04, 0.04],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "face"
    })
    // Eye trail
    boxes.push({
      id: id(),
      name: `Eye Trail ${side > 0 ? "R" : "L"}`,
      position: [side * 0.14, 2.28, 0.12],
      scale: [0.04, 0.02, 0.02],
      colorType: "glow",
      colorMultiplier: 1.25,
      emissive: true,
      emissiveIntensity: 1.25,
      group: "face"
    })
  }

  // Skeletal jaw hint
  boxes.push({
    id: id(),
    name: "Skeletal Jaw",
    position: [0, 2.1, 0.12],
    scale: [0.12, 0.08, 0.08],
    colorType: "custom",
    customColor: "#ccccaa",
    colorMultiplier: 0.4,
    emissive: false,
    emissiveIntensity: 0,
    group: "face"
  })

  // Neck (skeletal)
  for (let i = 0; i < 2; i++) {
    boxes.push({
      id: id(),
      name: `Neck ${i}`,
      position: [0, 2.0 - i * 0.08, 0],
      scale: [0.08, 0.08, 0.08],
      colorType: "custom",
      customColor: "#ccccaa",
      colorMultiplier: 0.3,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }

  // Ethereal robes (larger, more layers, tapering)
  for (let ty = 0; ty < 12; ty++) {
    const robeWidth = 0.25 + ty * 0.04
    const alpha = 1 - ty * 0.06
    // Main robe body
    for (let rx = -1; rx <= 1; rx++) {
      boxes.push({
        id: id(),
        name: `Robe ${ty}-${rx}`,
        position: [rx * robeWidth * 0.3, 1.85 - ty * 0.14, 0],
        scale: [robeWidth * 0.4, 0.14, robeWidth * 0.35],
        colorType: "primary",
        colorMultiplier: alpha,
        emissive: false,
        emissiveIntensity: 0,
        group: "robes"
      })
    }
  }

  // Robe edges (tattered)
  for (let edge = 0; edge < 6; edge++) {
    const angle = (edge / 6) * Math.PI * 2
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: id(),
        name: `Robe Edge ${edge}-${i}`,
        position: [
          Math.cos(angle) * (0.4 + i * 0.08),
          0.4 - i * 0.15,
          Math.sin(angle) * (0.35 + i * 0.06)
        ],
        scale: [0.08, 0.15, 0.08],
        colorType: "primary",
        colorMultiplier: 0.3 - i * 0.08,
        emissive: false,
        emissiveIntensity: 0,
        group: "robes"
      })
    }
  }

  // Floating skeletal arms with scythe-like claws
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    // Upper arm (bone)
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: id(),
        name: `Upper Arm ${sideName} ${i}`,
        position: [side * (0.35 + i * 0.06), 1.9 - i * 0.12, 0.08],
        scale: [0.06, 0.12, 0.06],
        colorType: "custom",
        customColor: "#ccccaa",
        colorMultiplier: 0.6,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
    // Forearm
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: id(),
        name: `Forearm ${sideName} ${i}`,
        position: [side * (0.5 + i * 0.05), 1.55 - i * 0.1, 0.15],
        scale: [0.05, 0.1, 0.05],
        colorType: "custom",
        customColor: "#ccccaa",
        colorMultiplier: 0.5,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
    // Scythe-like claws (longer, curved)
    for (let claw = 0; claw < 4; claw++) {
      for (let seg = 0; seg < 3; seg++) {
        boxes.push({
          id: id(),
          name: `Claw ${sideName} ${claw}-${seg}`,
          position: [
            side * (0.62 + seg * 0.02),
            1.2 - claw * 0.06 - seg * 0.08,
            0.2 + seg * 0.06
          ],
          scale: [0.02, 0.03, 0.1 - seg * 0.02],
          colorType: seg < 2 ? "custom" : "glow",
          customColor: seg < 2 ? "#ccccaa" : undefined,
          colorMultiplier: seg < 2 ? 1 : 2.5,
          emissive: seg >= 2,
          emissiveIntensity: seg >= 2 ? 2.5 : 0,
          group: "claws"
        })
      }
    }
  }

  // Soul wisps around figure
  for (let wisp = 0; wisp < 4; wisp++) {
    const angle = (wisp / 4) * Math.PI * 2
    boxes.push({
      id: id(),
      name: `Soul Wisp ${wisp}`,
      position: [
        Math.cos(angle) * 0.6,
        1.5 + Math.sin(wisp * 2) * 0.2,
        Math.sin(angle) * 0.5
      ],
      scale: [0.06, 0.08, 0.06],
      colorType: "glow",
      colorMultiplier: 1.25,
      emissive: true,
      emissiveIntensity: 1.25,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["hood", "face", "body", "robes", "arms", "claws", "effects"]
  }
}

export const WRAITH_HEIGHT = 2.8
