import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Glitch Sprite / Virus Swarm - Large fragmented digital entity with scan lines and particles
 */
export function createGlitchSpriteModel(): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  // Deterministic pseudo-random
  const random = (i: number) => Math.sin(12345 * 9999 + i * 7777) * 0.5 + 0.5

  // Central corrupted core (larger, pulsing)
  for (let ring = 0; ring < 3; ring++) {
    const ringSize = 0.15 + ring * 0.08
    for (let i = 0; i < 6; i++) {
      const theta = (i / 6) * Math.PI * 2 + ring * 0.5
      boxes.push({
        id: `glitch-sprite-${id++}`,
        name: `core_ring_${ring}_${i}`,
        position: [Math.cos(theta) * ringSize, 1.8, Math.sin(theta) * ringSize],
        scale: [0.12, 0.15, 0.12],
        colorType: ring === 1 ? "glow" : "primary",
        colorMultiplier: ring === 1 ? 3.5 : 1,
        emissive: ring === 1,
        emissiveIntensity: ring === 1 ? 1 : 0,
        group: "core",
      })
    }
  }

  // Core center
  boxes.push({
    id: `glitch-sprite-${id++}`,
    name: "core_center",
    position: [0, 1.8, 0],
    scale: [0.2, 0.25, 0.2],
    colorType: "glow",
    colorMultiplier: 3.5,
    emissive: true,
    emissiveIntensity: 1,
    group: "core",
  })

  // Glitchy fragmented body (more particles, larger spread)
  const glitchColors = ["glow", "custom", "custom", "primary"] as const
  const glitchCustomColors = [undefined, "#00ffff", "#ff00ff", undefined]
  const glitchMultipliers = [3.5, 2.5, 2, 1]

  for (let i = 0; i < 25; i++) {
    const offsetX = (random(i) - 0.5) * 0.7
    const offsetY = random(i + 100) * 1.2
    const offsetZ = (random(i + 200) - 0.5) * 0.7
    const size = 0.08 + random(i + 300) * 0.08
    const colorIdx = i % 4

    boxes.push({
      id: `glitch-sprite-${id++}`,
      name: `fragment_${i}`,
      position: [offsetX, 1.0 + offsetY, offsetZ],
      scale: [size, size, size],
      colorType: glitchColors[colorIdx],
      customColor: glitchCustomColors[colorIdx],
      colorMultiplier: glitchMultipliers[colorIdx],
      emissive: colorIdx < 3,
      emissiveIntensity: colorIdx < 3 ? 1 : 0,
      group: "fragments",
    })
  }

  // Digital scan lines (horizontal, larger)
  for (let line = 0; line < 8; line++) {
    const lineY = 1.2 + line * 0.2
    const lineWidth = 0.4 + random(line + 400) * 0.2
    boxes.push({
      id: `glitch-sprite-${id++}`,
      name: `scan_line_${line}`,
      position: [0, lineY, 0.25],
      scale: [lineWidth, 0.03, 0.03],
      colorType: "custom",
      customColor: "#00ffff",
      colorMultiplier: line % 2 === 0 ? 2.5 : 1.25,
      emissive: true,
      emissiveIntensity: line % 2 === 0 ? 1 : 0.5,
      group: "scanlines",
    })
  }

  // Vertical glitch bars
  for (let bar = 0; bar < 4; bar++) {
    const barX = -0.3 + bar * 0.2
    boxes.push({
      id: `glitch-sprite-${id++}`,
      name: `glitch_bar_${bar}`,
      position: [barX, 1.6, 0.2],
      scale: [0.04, 0.6, 0.03],
      colorType: "custom",
      customColor: "#ff00ff",
      colorMultiplier: 0.6 + random(bar + 500) * 1,
      emissive: true,
      emissiveIntensity: 0.3 + random(bar + 500) * 0.5,
      group: "scanlines",
    })
  }

  // Error/corruption squares
  for (let sq = 0; sq < 6; sq++) {
    const sqX = (random(sq + 600) - 0.5) * 0.6
    const sqY = 1.0 + random(sq + 700) * 1.0
    const sqZ = (random(sq + 800) - 0.5) * 0.4
    boxes.push({
      id: `glitch-sprite-${id++}`,
      name: `error_square_${sq}`,
      position: [sqX, sqY, sqZ],
      scale: [0.15, 0.15, 0.04],
      colorType: "custom",
      customColor: sq % 2 === 0 ? "#ff0000" : undefined,
      colorMultiplier: sq % 2 === 0 ? 2 : 0.5,
      emissive: sq % 2 === 0,
      emissiveIntensity: sq % 2 === 0 ? 1 : 0,
      group: "errors",
    })
  }

  // Floating data fragments around
  for (let frag = 0; frag < 8; frag++) {
    const angle = (frag / 8) * Math.PI * 2
    const radius = 0.5 + random(frag + 900) * 0.2
    boxes.push({
      id: `glitch-sprite-${id++}`,
      name: `data_fragment_${frag}`,
      position: [Math.cos(angle) * radius, 1.5 + Math.sin(frag * 2) * 0.3, Math.sin(angle) * radius],
      scale: [0.06, 0.1, 0.06],
      colorType: "glow",
      colorMultiplier: 2.1,
      emissive: true,
      emissiveIntensity: 0.6,
      group: "fragments",
    })
  }

  // "Face" - two glitchy eye-like elements
  for (const side of [-1, 1]) {
    const sideLabel = side < 0 ? "left" : "right"
    boxes.push({
      id: `glitch-sprite-${id++}`,
      name: `eye_${sideLabel}`,
      position: [side * 0.15, 2.0, 0.2],
      scale: [0.1, 0.06, 0.05],
      colorType: "custom",
      customColor: "#00ffff",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 1,
      group: "face",
    })
    // Eye static
    boxes.push({
      id: `glitch-sprite-${id++}`,
      name: `eye_static_${sideLabel}`,
      position: [side * 0.18, 2.0, 0.18],
      scale: [0.04, 0.03, 0.02],
      colorType: "custom",
      customColor: "#ff00ff",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 1,
      group: "face",
    })
  }

  return {
    boxes,
    groups: ["core", "fragments", "scanlines", "errors", "face"],
  }
}

export const GLITCH_SPRITE_HEIGHT = 2.5
