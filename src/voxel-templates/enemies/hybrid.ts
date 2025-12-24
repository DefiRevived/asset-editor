import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Hybrid / Techno-Elemental - Large humanoid with visible tech/magic split design
 */
export function createHybridModel(): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  // Split head - Tech side (left)
  for (let hy = 0; hy < 3; hy++) {
    boxes.push({
      id: `hybrid-${id++}`,
      name: `tech_head_${hy}`,
      position: [-0.1, 2.15 - hy * 0.1, 0],
      scale: [0.14, 0.12, 0.16],
      colorType: "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "head",
    })
  }

  // Tech helmet details
  boxes.push({
    id: `hybrid-${id++}`,
    name: "tech_helmet_detail",
    position: [-0.15, 2.2, -0.08],
    scale: [0.06, 0.15, 0.06],
    colorType: "secondary",
    colorMultiplier: 0.7,
    emissive: false,
    emissiveIntensity: 0,
    group: "head",
  })

  // Split head - Magic side (right)
  for (let hy = 0; hy < 3; hy++) {
    boxes.push({
      id: `hybrid-${id++}`,
      name: `magic_head_${hy}`,
      position: [0.1, 2.15 - hy * 0.1, 0],
      scale: [0.14, 0.12, 0.16],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "head",
    })
  }

  // Magic horn
  boxes.push({
    id: `hybrid-${id++}`,
    name: "magic_horn",
    position: [0.15, 2.35, -0.05],
    scale: [0.04, 0.18, 0.04],
    colorType: "custom",
    customColor: "#ff88ff",
    colorMultiplier: 2.5,
    emissive: true,
    emissiveIntensity: 1,
    group: "head",
  })

  // Tech eye (angular, scanner)
  boxes.push({
    id: `hybrid-${id++}`,
    name: "tech_eye",
    position: [-0.1, 2.12, 0.14],
    scale: [0.1, 0.04, 0.03],
    colorType: "custom",
    customColor: "#00ffff",
    colorMultiplier: 2.5,
    emissive: true,
    emissiveIntensity: 1,
    group: "head",
  })

  // Scan line
  boxes.push({
    id: `hybrid-${id++}`,
    name: "scan_line",
    position: [-0.15, 2.12, 0.12],
    scale: [0.04, 0.02, 0.02],
    colorType: "custom",
    customColor: "#00ffff",
    colorMultiplier: 1.25,
    emissive: true,
    emissiveIntensity: 0.5,
    group: "head",
  })

  // Magic eye (glowing orb)
  boxes.push({
    id: `hybrid-${id++}`,
    name: "magic_eye",
    position: [0.1, 2.12, 0.14],
    scale: [0.08, 0.08, 0.05],
    colorType: "custom",
    customColor: "#ff88ff",
    colorMultiplier: 2.5,
    emissive: true,
    emissiveIntensity: 1,
    group: "head",
  })

  // Magic particles
  for (let p = 0; p < 3; p++) {
    const angle = (p / 3) * Math.PI * 2
    boxes.push({
      id: `hybrid-${id++}`,
      name: `magic_particle_${p}`,
      position: [0.1 + Math.cos(angle) * 0.08, 2.2 + Math.sin(angle) * 0.06, 0.12],
      scale: [0.03, 0.03, 0.02],
      colorType: "custom",
      customColor: "#ff88ff",
      colorMultiplier: 1.5,
      emissive: true,
      emissiveIntensity: 0.6,
      group: "head",
    })
  }

  // Neck
  boxes.push({
    id: `hybrid-${id++}`,
    name: "neck",
    position: [0, 1.9, 0],
    scale: [0.14, 0.1, 0.12],
    colorType: "primary",
    colorMultiplier: 0.7,
    emissive: false,
    emissiveIntensity: 0,
    group: "body",
  })

  // Torso (clearly split design)
  for (let ty = 0; ty < 6; ty++) {
    // Tech half (left)
    boxes.push({
      id: `hybrid-${id++}`,
      name: `torso_tech_${ty}`,
      position: [-0.12, 1.75 - ty * 0.14, 0],
      scale: [0.15, 0.14, 0.14],
      colorType: "secondary",
      colorMultiplier: ty % 2 === 0 ? 1 : 0.8,
      emissive: false,
      emissiveIntensity: 0,
      group: "body",
    })

    // Magic half (right)
    boxes.push({
      id: `hybrid-${id++}`,
      name: `torso_magic_${ty}`,
      position: [0.12, 1.75 - ty * 0.14, 0],
      scale: [0.15, 0.14, 0.14],
      colorType: "primary",
      colorMultiplier: ty % 2 === 0 ? 1 : 0.85,
      emissive: false,
      emissiveIntensity: 0,
      group: "body",
    })
  }

  // Center line glow
  for (let i = 0; i < 5; i++) {
    boxes.push({
      id: `hybrid-${id++}`,
      name: `center_glow_${i}`,
      position: [0, 1.7 - i * 0.15, 0.1],
      scale: [0.04, 0.12, 0.03],
      colorType: "custom",
      customColor: i % 2 === 0 ? "#00ffff" : "#ff88ff",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 1,
      group: "body",
    })
  }

  // Tech arm (left - mechanical)
  for (let i = 0; i < 6; i++) {
    boxes.push({
      id: `hybrid-${id++}`,
      name: `tech_arm_${i}`,
      position: [-0.35, 1.65 - i * 0.12, 0],
      scale: [0.1, 0.12, 0.1],
      colorType: i % 2 === 0 ? "secondary" : "primary",
      colorMultiplier: i % 2 === 0 ? 1 : 0.6,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms",
    })
  }

  // Tech hand (claw)
  for (let finger = 0; finger < 3; finger++) {
    boxes.push({
      id: `hybrid-${id++}`,
      name: `tech_claw_${finger}`,
      position: [-0.38, 0.9 - finger * 0.04, 0.05 + finger * 0.03],
      scale: [0.04, 0.04, 0.1],
      colorType: "custom",
      customColor: "#00ffff",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 1,
      group: "arms",
    })
  }

  // Arm tech panel
  boxes.push({
    id: `hybrid-${id++}`,
    name: "arm_tech_panel",
    position: [-0.4, 1.3, 0.08],
    scale: [0.04, 0.25, 0.04],
    colorType: "custom",
    customColor: "#00ffff",
    colorMultiplier: 1.75,
    emissive: true,
    emissiveIntensity: 0.7,
    group: "arms",
  })

  // Magic arm (right - ethereal, growing larger)
  for (let i = 0; i < 6; i++) {
    const armWidth = 0.08 + i * 0.015
    boxes.push({
      id: `hybrid-${id++}`,
      name: `magic_arm_${i}`,
      position: [0.35, 1.65 - i * 0.12, 0],
      scale: [armWidth, 0.12, armWidth],
      colorType: "custom",
      customColor: "#ff88ff",
      colorMultiplier: 2.5 * (1 - i * 0.08),
      emissive: true,
      emissiveIntensity: 1 - i * 0.08,
      group: "arms",
    })
  }

  // Magic hand (energy)
  boxes.push({
    id: `hybrid-${id++}`,
    name: "magic_hand",
    position: [0.38, 0.9, 0],
    scale: [0.15, 0.15, 0.15],
    colorType: "custom",
    customColor: "#ff88ff",
    colorMultiplier: 2.5,
    emissive: true,
    emissiveIntensity: 1,
    group: "arms",
  })

  // Magic aura
  for (let aura = 0; aura < 4; aura++) {
    const angle = (aura / 4) * Math.PI * 2
    boxes.push({
      id: `hybrid-${id++}`,
      name: `magic_aura_${aura}`,
      position: [0.38 + Math.cos(angle) * 0.12, 0.9 + Math.sin(angle) * 0.12, 0],
      scale: [0.05, 0.05, 0.05],
      colorType: "custom",
      customColor: "#ff88ff",
      colorMultiplier: 1.25,
      emissive: true,
      emissiveIntensity: 0.5,
      group: "arms",
    })
  }

  // Belt
  for (let bx = -2; bx <= 2; bx++) {
    boxes.push({
      id: `hybrid-${id++}`,
      name: `belt_${bx + 2}`,
      position: [bx * 0.08, 0.95, 0],
      scale: [0.1, 0.08, 0.12],
      colorType: bx < 0 ? "secondary" : "primary",
      colorMultiplier: 0.6,
      emissive: false,
      emissiveIntensity: 0,
      group: "body",
    })
  }

  // Legs (split design continues)
  for (const side of [-1, 1]) {
    const sideLabel = side < 0 ? "left" : "right"
    for (let i = 0; i < 6; i++) {
      boxes.push({
        id: `hybrid-${id++}`,
        name: `leg_${sideLabel}_${i}`,
        position: [side * 0.14, 0.8 - i * 0.14, 0],
        scale: [0.1, 0.14, 0.1],
        colorType: side < 0 ? "secondary" : "primary",
        colorMultiplier: i % 2 === 0 ? 1 : 0.8,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs",
      })
    }

    // Leg accent
    boxes.push({
      id: `hybrid-${id++}`,
      name: `leg_accent_${sideLabel}`,
      position: [side * 0.18, 0.5, 0.06],
      scale: [0.03, 0.3, 0.03],
      colorType: "custom",
      customColor: side < 0 ? "#00ffff" : "#ff88ff",
      colorMultiplier: 1.5,
      emissive: true,
      emissiveIntensity: 0.6,
      group: "legs",
    })

    // Boot
    boxes.push({
      id: `hybrid-${id++}`,
      name: `boot_${sideLabel}`,
      position: [side * 0.14, 0.05, 0.04],
      scale: [0.11, 0.1, 0.16],
      colorType: side < 0 ? "secondary" : "primary",
      colorMultiplier: 0.5,
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

export const HYBRID_HEIGHT = 2.6
