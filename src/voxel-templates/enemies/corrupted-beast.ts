import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Corrupted Beast - Large mutated wolf with glitched spikes, corruption patches, and tendrils
 */
export function createCorruptedBeastModel(): VoxelModel {
  const boxes: VoxelBox[] = []
  let id = 0

  // Corrupted wolf-like head (larger, more mutated)
  for (let hx = -1; hx <= 1; hx++) {
    for (let hz = 0; hz < 3; hz++) {
      boxes.push({
        id: `corrupted-beast-${id++}`,
        name: `head_${hx + 1}_${hz}`,
        position: [hx * 0.12, 1.6, 0.35 + hz * 0.1],
        scale: [0.14, 0.18, 0.12],
        colorType: hz % 2 === 0 ? "primary" : "custom",
        customColor: hz % 2 !== 0 ? "#ff0066" : undefined,
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head",
      })
    }
  }

  // Mutated snout
  for (let sz = 0; sz < 3; sz++) {
    boxes.push({
      id: `corrupted-beast-${id++}`,
      name: `snout_${sz}`,
      position: [0, 1.5 - sz * 0.03, 0.65 + sz * 0.12],
      scale: [0.12 - sz * 0.02, 0.1, 0.12],
      colorType: sz % 2 === 0 ? "primary" : "custom",
      customColor: sz % 2 !== 0 ? "#ff0066" : undefined,
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "head",
    })
  }

  // Glitched spikes from head (larger, more dramatic)
  for (let spike = 0; spike < 6; spike++) {
    const angle = (spike / 6) * Math.PI
    boxes.push({
      id: `corrupted-beast-${id++}`,
      name: `head_spike_${spike}`,
      position: [Math.cos(angle) * 0.2, 1.75 + spike * 0.08, 0.35],
      scale: [0.05, 0.14 + spike * 0.02, 0.05],
      colorType: "custom",
      customColor: spike % 2 === 0 ? "#ff00ff" : "#ff0066",
      colorMultiplier: spike % 2 === 0 ? 2.5 : 1,
      emissive: spike % 2 === 0,
      emissiveIntensity: spike % 2 === 0 ? 1 : 0,
      group: "head",
    })
  }

  // Corrupted eyes (multiple, glitched)
  for (const side of [-1, 1]) {
    const sideLabel = side < 0 ? "left" : "right"
    // Main eye
    boxes.push({
      id: `corrupted-beast-${id++}`,
      name: `main_eye_${sideLabel}`,
      position: [side * 0.15, 1.65, 0.55],
      scale: [0.08, 0.05, 0.04],
      colorType: "glow",
      customColor: "#ff00ff",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 1,
      group: "head",
    })
    // Extra glitched eye
    boxes.push({
      id: `corrupted-beast-${id++}`,
      name: `glitch_eye_${sideLabel}`,
      position: [side * 0.12, 1.75, 0.5],
      scale: [0.04, 0.03, 0.03],
      colorType: "glow",
      customColor: "#ff00ff",
      colorMultiplier: 1.75,
      emissive: true,
      emissiveIntensity: 0.7,
      group: "head",
    })
  }

  // Neck (corrupted)
  for (let i = 0; i < 3; i++) {
    boxes.push({
      id: `corrupted-beast-${id++}`,
      name: `neck_${i}`,
      position: [0, 1.4 - i * 0.12, 0.2 - i * 0.08],
      scale: [0.22, 0.14, 0.18],
      colorType: i % 2 === 0 ? "primary" : "custom",
      customColor: i % 2 !== 0 ? "#ff0066" : undefined,
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "body",
    })
  }

  // Body with corruption patches (larger)
  for (let seg = 0; seg < 8; seg++) {
    const segWidth = 0.35 - Math.abs(seg - 4) * 0.03
    for (let layer = 0; layer < 2; layer++) {
      boxes.push({
        id: `corrupted-beast-${id++}`,
        name: `body_seg_${seg}_layer_${layer}`,
        position: [0, 1.25 - layer * 0.2, -seg * 0.2],
        scale: [segWidth, 0.22, 0.22],
        colorType: (seg + layer) % 3 === 0 ? "custom" : "primary",
        customColor: (seg + layer) % 3 === 0 ? "#ff0066" : undefined,
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "body",
      })
    }
  }

  // Corruption spines along back
  for (let spine = 0; spine < 5; spine++) {
    boxes.push({
      id: `corrupted-beast-${id++}`,
      name: `back_spine_${spine}`,
      position: [0, 1.5, -0.2 - spine * 0.25],
      scale: [0.05, 0.15 - spine * 0.02, 0.08],
      colorType: "glow",
      customColor: "#ff00ff",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 1,
      group: "body",
    })
  }

  // Four corrupted legs (thicker)
  const legPositions: [number, number, string][] = [
    [0.22, 0.0, "front_right"],
    [-0.22, 0.0, "front_left"],
    [0.22, -1.2, "back_right"],
    [-0.22, -1.2, "back_left"],
  ]
  for (let legIdx = 0; legIdx < 4; legIdx++) {
    const [lx, lz, legName] = legPositions[legIdx]
    for (let i = 0; i < 5; i++) {
      boxes.push({
        id: `corrupted-beast-${id++}`,
        name: `leg_${legName}_${i}`,
        position: [lx, 1.0 - i * 0.2, lz],
        scale: [0.14, 0.2, 0.14],
        colorType: i % 2 === 0 ? "primary" : "custom",
        customColor: i % 2 !== 0 ? "#ff0066" : undefined,
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs",
      })
    }
    // Mutated paw
    boxes.push({
      id: `corrupted-beast-${id++}`,
      name: `paw_${legName}`,
      position: [lx, 0.05, lz + 0.05],
      scale: [0.16, 0.1, 0.2],
      colorType: "primary",
      colorMultiplier: 0.5,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs",
    })
    // Claw spikes
    for (let claw = 0; claw < 2; claw++) {
      boxes.push({
        id: `corrupted-beast-${id++}`,
        name: `claw_${legName}_${claw}`,
        position: [lx + (claw - 0.5) * 0.08, 0.05, lz + 0.18],
        scale: [0.03, 0.04, 0.08],
        colorType: "glow",
        customColor: "#ff00ff",
        colorMultiplier: 2.5,
        emissive: true,
        emissiveIntensity: 1,
        group: "legs",
      })
    }
  }

  // Corruption tendrils (larger, more dramatic)
  for (let tendril = 0; tendril < 5; tendril++) {
    const angle = (tendril / 5) * Math.PI * 2
    for (let seg = 0; seg < 5; seg++) {
      boxes.push({
        id: `corrupted-beast-${id++}`,
        name: `tendril_${tendril}_seg_${seg}`,
        position: [
          Math.cos(angle) * (0.4 + seg * 0.15),
          1.3 - seg * 0.12,
          -0.5 + Math.sin(angle) * 0.3,
        ],
        scale: [0.05, 0.12, 0.05],
        colorType: "glow",
        customColor: "#ff00ff",
        colorMultiplier: 2.5 * (1 - seg * 0.15),
        emissive: true,
        emissiveIntensity: 1 - seg * 0.15,
        group: "tendrils",
      })
    }
  }

  // Corrupted tail
  for (let i = 0; i < 5; i++) {
    boxes.push({
      id: `corrupted-beast-${id++}`,
      name: `tail_${i}`,
      position: [0, 1.3 + i * 0.05, -1.5 - i * 0.1],
      scale: [0.08 - i * 0.01, 0.08, 0.12],
      colorType: i % 2 === 0 ? "primary" : "custom",
      customColor: i % 2 !== 0 ? "#ff0066" : undefined,
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "tail",
    })
  }

  return {
    boxes,
    groups: ["head", "body", "legs", "tendrils", "tail"],
  }
}

export const CORRUPTED_BEAST_HEIGHT = 2.1
