import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Volcanic Zone Enemy Templates
 * Based on: lib/world/enemy-templates.ts VOLCANIC_ENEMIES
 */

// ============================================
// LAVA IMP - Small fire demon born from magma
// ============================================

let idCounter = 0
function id(prefix: string) { return `${prefix}_${idCounter++}` }

export function createLavaImpModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Fiery head (small, demonic)
  for (let hx = -1; hx <= 1; hx++) {
    for (let hz = -1; hz <= 1; hz++) {
      boxes.push({
        id: id("lava_imp"),
        name: `Head ${hx}_${hz}`,
        position: [hx * 0.06, 1.2, hz * 0.05],
        scale: [0.08, 0.1, 0.07],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }

  // Horns
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: id("lava_imp"),
        name: `Horn ${side > 0 ? "R" : "L"} ${i}`,
        position: [side * (0.08 + i * 0.02), 1.3 + i * 0.06, -0.02],
        scale: [0.03, 0.06, 0.03],
        colorType: "custom",
        customColor: "#331100",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }

  // Glowing eyes
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("lava_imp"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.05, 1.22, 0.08],
      scale: [0.04, 0.04, 0.03],
      colorType: "glow",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 3,
      group: "head"
    })
  }

  // Compact torso (glowing core)
  for (let ty = 0; ty < 4; ty++) {
    boxes.push({
      id: id("lava_imp"),
      name: `Torso ${ty}`,
      position: [0, 1.0 - ty * 0.1, 0],
      scale: [0.12, 0.1, 0.1],
      colorType: ty === 1 || ty === 2 ? "glow" : "primary",
      colorMultiplier: ty === 1 || ty === 2 ? 2 : 1,
      emissive: ty === 1 || ty === 2,
      emissiveIntensity: ty === 1 || ty === 2 ? 2 : 0,
      group: "torso"
    })
  }

  // Small clawed arms
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: id("lava_imp"),
        name: `Arm ${sideName} ${i}`,
        position: [side * (0.15 + i * 0.04), 0.95 - i * 0.08, 0.02],
        scale: [0.04, 0.08, 0.04],
        colorType: "primary",
        colorMultiplier: 0.9,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
    // Claws
    for (let claw = 0; claw < 3; claw++) {
      boxes.push({
        id: id("lava_imp"),
        name: `Claw ${sideName} ${claw}`,
        position: [side * 0.25, 0.7 - claw * 0.03, 0.05 + claw * 0.02],
        scale: [0.02, 0.02, 0.05],
        colorType: "glow",
        colorMultiplier: 2,
        emissive: true,
        emissiveIntensity: 2,
        group: "arms"
      })
    }
  }

  // Short legs
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: id("lava_imp"),
        name: `Leg ${sideName} ${i}`,
        position: [side * 0.08, 0.55 - i * 0.1, 0],
        scale: [0.05, 0.1, 0.05],
        colorType: "primary",
        colorMultiplier: 0.85,
        emissive: false,
        emissiveIntensity: 0,
        group: "legs"
      })
    }
    // Foot
    boxes.push({
      id: id("lava_imp"),
      name: `Foot ${sideName}`,
      position: [side * 0.08, 0.22, 0.02],
      scale: [0.05, 0.04, 0.08],
      colorType: "primary",
      colorMultiplier: 0.7,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
  }

  // Fire wisp tail
  for (let i = 0; i < 4; i++) {
    boxes.push({
      id: id("lava_imp"),
      name: `Tail ${i}`,
      position: [0, 0.7 + i * 0.05, -0.12 - i * 0.04],
      scale: [0.04 - i * 0.005, 0.06, 0.04 - i * 0.005],
      colorType: "glow",
      colorMultiplier: 2.5 - i * 0.3,
      emissive: true,
      emissiveIntensity: 2.5 - i * 0.3,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["head", "torso", "arms", "legs", "effects"]
  }
}

export const LAVA_IMP_HEIGHT = 1.5

// ============================================
// MAGMA HOUND - Molten beast that hunts in packs
// ============================================

export function createMagmaHoundModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Wolf-like head with molten cracks
  for (let hx = -1; hx <= 1; hx++) {
    for (let hz = 0; hz < 3; hz++) {
      boxes.push({
        id: id("magma_hound"),
        name: `Head ${hx}_${hz}`,
        position: [hx * 0.1, 1.3, 0.25 + hz * 0.1],
        scale: [0.12, 0.14, 0.12],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }

  // Snout
  for (let sz = 0; sz < 3; sz++) {
    boxes.push({
      id: id("magma_hound"),
      name: `Snout ${sz}`,
      position: [0, 1.22 - sz * 0.03, 0.55 + sz * 0.1],
      scale: [0.1 - sz * 0.015, 0.1, 0.1],
      colorType: sz < 2 ? "primary" : "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "head"
    })
  }

  // Glowing eyes
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("magma_hound"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.12, 1.38, 0.45],
      scale: [0.06, 0.05, 0.04],
      colorType: "glow",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 3,
      group: "head"
    })
  }

  // Lava drip fangs
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("magma_hound"),
      name: `Fang ${side > 0 ? "R" : "L"}`,
      position: [side * 0.05, 1.1, 0.75],
      scale: [0.03, 0.1, 0.03],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "head"
    })
  }

  // Neck with molten cracks
  for (let i = 0; i < 2; i++) {
    boxes.push({
      id: id("magma_hound"),
      name: `Neck ${i}`,
      position: [0, 1.2 - i * 0.1, 0.1 - i * 0.06],
      scale: [0.18, 0.12, 0.16],
      colorType: i === 0 ? "primary" : "glow",
      colorMultiplier: i === 0 ? 1 : 1.5,
      emissive: i === 1,
      emissiveIntensity: i === 1 ? 1.5 : 0,
      group: "body"
    })
  }

  // Body (quadruped with glowing cracks)
  for (let seg = 0; seg < 6; seg++) {
    const segWidth = 0.3 - Math.abs(seg - 2.5) * 0.03
    for (let layer = 0; layer < 2; layer++) {
      boxes.push({
        id: id("magma_hound"),
        name: `Body ${seg}_${layer}`,
        position: [0, 1.05 - layer * 0.18, -seg * 0.18],
        scale: [segWidth, 0.2, 0.2],
        colorType: (seg + layer) % 3 === 0 ? "glow" : "primary",
        colorMultiplier: (seg + layer) % 3 === 0 ? 1.8 : 1,
        emissive: (seg + layer) % 3 === 0,
        emissiveIntensity: (seg + layer) % 3 === 0 ? 1.8 : 0,
        group: "body"
      })
    }
  }

  // Spine ridge (molten)
  for (let i = 0; i < 5; i++) {
    boxes.push({
      id: id("magma_hound"),
      name: `Spine ${i}`,
      position: [0, 1.25, 0 - i * 0.18],
      scale: [0.05, 0.1, 0.08],
      colorType: "glow",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "body"
    })
  }

  // Four legs
  const legPositions: [number, number][] = [
    [0.2, 0.05], [-0.2, 0.05], [0.2, -0.85], [-0.2, -0.85]
  ]
  for (let legIdx = 0; legIdx < 4; legIdx++) {
    const [lx, lz] = legPositions[legIdx]
    const legName = legIdx < 2 ? (legIdx === 0 ? "FR" : "FL") : (legIdx === 2 ? "BR" : "BL")
    
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: id("magma_hound"),
        name: `Leg ${legName} ${i}`,
        position: [lx, 0.85 - i * 0.15, lz],
        scale: [0.12, 0.15, 0.12],
        colorType: i === 1 ? "glow" : "primary",
        colorMultiplier: i === 1 ? 1.5 : 1,
        emissive: i === 1,
        emissiveIntensity: i === 1 ? 1.5 : 0,
        group: "legs"
      })
    }
    // Paw
    boxes.push({
      id: id("magma_hound"),
      name: `Paw ${legName}`,
      position: [lx, 0.35, lz + 0.03],
      scale: [0.1, 0.08, 0.14],
      colorType: "secondary",
      colorMultiplier: 0.8,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
    // Lava drip from paw
    boxes.push({
      id: id("magma_hound"),
      name: `Lava Drip ${legName}`,
      position: [lx, 0.28, lz],
      scale: [0.04, 0.06, 0.04],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "effects"
    })
  }

  // Flaming tail
  for (let i = 0; i < 5; i++) {
    boxes.push({
      id: id("magma_hound"),
      name: `Tail ${i}`,
      position: [0, 1.1 + i * 0.05, -1.05 - i * 0.1],
      scale: [0.08 - i * 0.01, 0.08, 0.12],
      colorType: i < 2 ? "primary" : "glow",
      colorMultiplier: i < 2 ? 1 : 2 + i * 0.2,
      emissive: i >= 2,
      emissiveIntensity: i >= 2 ? 2 + i * 0.2 : 0,
      group: "body"
    })
  }

  return {
    boxes,
    groups: ["head", "body", "legs", "effects"]
  }
}

export const MAGMA_HOUND_HEIGHT = 1.5

// ============================================
// ASH WRAITH - Spirit of those consumed by fire
// ============================================

export function createAshWraithModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Ashen hood (similar to wraith but with ember particles)
  for (let layer = 0; layer < 4; layer++) {
    const hoodSize = 0.3 - layer * 0.05
    for (let hx = -1; hx <= 1; hx++) {
      boxes.push({
        id: id("ash_wraith"),
        name: `Hood ${layer}_${hx}`,
        position: [hx * hoodSize * 0.4, 2.3 - layer * 0.1, -layer * 0.04],
        scale: [hoodSize * 0.45, 0.14, hoodSize * 0.4],
        colorType: "primary",
        colorMultiplier: 0.4 + layer * 0.1,
        emissive: false,
        emissiveIntensity: 0,
        group: "hood"
      })
    }
  }

  // Ember eyes
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("ash_wraith"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.08, 2.18, 0.12],
      scale: [0.05, 0.04, 0.03],
      colorType: "glow",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 3,
      group: "face"
    })
  }

  // Ashen robes (billowing)
  for (let ty = 0; ty < 10; ty++) {
    const robeWidth = 0.22 + ty * 0.035
    const alpha = 0.9 - ty * 0.05
    for (let rx = -1; rx <= 1; rx++) {
      boxes.push({
        id: id("ash_wraith"),
        name: `Robe ${ty}_${rx}`,
        position: [rx * robeWidth * 0.28, 1.75 - ty * 0.14, 0],
        scale: [robeWidth * 0.35, 0.14, robeWidth * 0.3],
        colorType: "primary",
        colorMultiplier: alpha,
        emissive: false,
        emissiveIntensity: 0,
        group: "robes"
      })
    }
  }

  // Skeletal arms with ember claws
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 5; i++) {
      boxes.push({
        id: id("ash_wraith"),
        name: `Arm ${sideName} ${i}`,
        position: [side * (0.3 + i * 0.05), 1.8 - i * 0.1, 0.05],
        scale: [0.04, 0.1, 0.04],
        colorType: "custom",
        customColor: "#555555",
        colorMultiplier: 0.8,
        emissive: false,
        emissiveIntensity: 0,
        group: "arms"
      })
    }
    // Ember claws
    for (let claw = 0; claw < 3; claw++) {
      boxes.push({
        id: id("ash_wraith"),
        name: `Claw ${sideName} ${claw}`,
        position: [side * 0.55, 1.25 - claw * 0.04, 0.1 + claw * 0.03],
        scale: [0.02, 0.02, 0.08],
        colorType: "glow",
        colorMultiplier: 2.5,
        emissive: true,
        emissiveIntensity: 2.5,
        group: "arms"
      })
    }
  }

  // Floating ember particles
  for (let ember = 0; ember < 8; ember++) {
    const angle = (ember / 8) * Math.PI * 2
    const height = 1.5 + Math.sin(ember * 1.5) * 0.4
    boxes.push({
      id: id("ash_wraith"),
      name: `Ember ${ember}`,
      position: [Math.cos(angle) * 0.5, height, Math.sin(angle) * 0.4],
      scale: [0.03, 0.04, 0.03],
      colorType: "glow",
      colorMultiplier: 2 + Math.random(),
      emissive: true,
      emissiveIntensity: 2 + Math.random(),
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["hood", "face", "robes", "arms", "effects"]
  }
}

export const ASH_WRAITH_HEIGHT = 2.6

// ============================================
// VOLCANIC GOLEM - Living rock infused with molten core
// ============================================

export function createVolcanicGolemModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Rocky head with molten cracks
  for (let ring = 0; ring < 2; ring++) {
    const headAngles = [0, Math.PI/3, 2*Math.PI/3, Math.PI, 4*Math.PI/3, 5*Math.PI/3]
    for (const angle of headAngles) {
      boxes.push({
        id: id("volcanic_golem"),
        name: `Head ${ring}_${angle.toFixed(1)}`,
        position: [Math.cos(angle) * 0.2, 3.2 + ring * 0.18, Math.sin(angle) * 0.2],
        scale: [0.15, 0.28, 0.15],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }

  // Head molten core
  boxes.push({
    id: id("volcanic_golem"),
    name: "Head Core",
    position: [0, 3.3, 0],
    scale: [0.15, 0.22, 0.15],
    colorType: "glow",
    colorMultiplier: 2.5,
    emissive: true,
    emissiveIntensity: 2.5,
    group: "head"
  })

  // Molten eye sockets
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("volcanic_golem"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.1, 3.25, 0.2],
      scale: [0.08, 0.1, 0.05],
      colorType: "glow",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 3,
      group: "head"
    })
  }

  // Massive rocky torso with lava veins
  for (let ty = 0; ty < 7; ty++) {
    const width = 0.5 - Math.abs(ty - 3) * 0.04
    for (let tx = -1; tx <= 1; tx++) {
      boxes.push({
        id: id("volcanic_golem"),
        name: `Torso ${ty}_${tx}`,
        position: [tx * width * 0.35, 2.6 - ty * 0.22, 0],
        scale: [width * 0.38, 0.22, width * 0.32],
        colorType: ty % 3 === 1 ? "glow" : "primary",
        colorMultiplier: ty % 3 === 1 ? 2 : 1,
        emissive: ty % 3 === 1,
        emissiveIntensity: ty % 3 === 1 ? 2 : 0,
        group: "torso"
      })
    }
  }

  // Molten chest core
  boxes.push({
    id: id("volcanic_golem"),
    name: "Chest Core",
    position: [0, 2.4, 0.28],
    scale: [0.2, 0.25, 0.08],
    colorType: "glow",
    colorMultiplier: 3,
    emissive: true,
    emissiveIntensity: 3,
    group: "torso"
  })

  // Massive rocky arms with lava seams
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 5; i++) {
      const armWidth = 0.2 - i * 0.015
      boxes.push({
        id: id("volcanic_golem"),
        name: `Arm ${sideName} ${i}`,
        position: [side * 0.58, 2.4 - i * 0.22, 0],
        scale: [armWidth, 0.22, armWidth],
        colorType: i % 2 === 1 ? "glow" : "primary",
        colorMultiplier: i % 2 === 1 ? 1.8 : 1,
        emissive: i % 2 === 1,
        emissiveIntensity: i % 2 === 1 ? 1.8 : 0,
        group: "arms"
      })
    }
    // Rocky fist
    boxes.push({
      id: id("volcanic_golem"),
      name: `Fist ${sideName}`,
      position: [side * 0.58, 1.25, 0],
      scale: [0.25, 0.25, 0.25],
      colorType: "primary",
      colorMultiplier: 0.9,
      emissive: false,
      emissiveIntensity: 0,
      group: "arms"
    })
    // Fist glow
    boxes.push({
      id: id("volcanic_golem"),
      name: `Fist Glow ${sideName}`,
      position: [side * 0.58, 1.25, 0.14],
      scale: [0.1, 0.1, 0.05],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "arms"
    })
  }

  // Sturdy rocky legs
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id("volcanic_golem"),
        name: `Leg ${sideName} ${i}`,
        position: [side * 0.26, 1.2 - i * 0.22, 0],
        scale: [0.22, 0.22, 0.22],
        colorType: i === 2 ? "glow" : "primary",
        colorMultiplier: i === 2 ? 1.8 : 1,
        emissive: i === 2,
        emissiveIntensity: i === 2 ? 1.8 : 0,
        group: "legs"
      })
    }
    // Foot
    boxes.push({
      id: id("volcanic_golem"),
      name: `Foot ${sideName}`,
      position: [side * 0.26, 0.3, 0.1],
      scale: [0.28, 0.15, 0.38],
      colorType: "primary",
      colorMultiplier: 0.7,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
  }

  // Lava drips
  for (let drip = 0; drip < 6; drip++) {
    const angle = (drip / 6) * Math.PI * 2
    boxes.push({
      id: id("volcanic_golem"),
      name: `Lava Drip ${drip}`,
      position: [Math.cos(angle) * 0.4, 0.15, Math.sin(angle) * 0.35],
      scale: [0.04, 0.08, 0.04],
      colorType: "glow",
      colorMultiplier: 2.8,
      emissive: true,
      emissiveIntensity: 2.8,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["head", "torso", "arms", "legs", "effects"]
  }
}

export const VOLCANIC_GOLEM_HEIGHT = 3.6

// ============================================
// FIRE DRAKE - Ancient dragon of the volcanic wastes
// ============================================

export function createFireDrakeModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Dragon head (elongated snout)
  for (let hx = -1; hx <= 1; hx++) {
    for (let hz = 0; hz < 4; hz++) {
      const headWidth = 0.18 - hz * 0.03
      boxes.push({
        id: id("fire_drake"),
        name: `Head ${hx}_${hz}`,
        position: [hx * headWidth, 4.0, 0.3 + hz * 0.15],
        scale: [headWidth, 0.2, 0.16],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "head"
      })
    }
  }

  // Horns
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id("fire_drake"),
        name: `Horn ${side > 0 ? "R" : "L"} ${i}`,
        position: [side * (0.15 + i * 0.03), 4.2 + i * 0.08, 0.1 - i * 0.05],
        scale: [0.04, 0.1, 0.04],
        colorType: i < 2 ? "secondary" : "glow",
        colorMultiplier: i < 2 ? 0.8 : 2,
        emissive: i >= 2,
        emissiveIntensity: i >= 2 ? 2 : 0,
        group: "head"
      })
    }
  }

  // Fiery eyes
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("fire_drake"),
      name: `Eye ${side > 0 ? "R" : "L"}`,
      position: [side * 0.12, 4.05, 0.55],
      scale: [0.08, 0.08, 0.05],
      colorType: "glow",
      colorMultiplier: 3.5,
      emissive: true,
      emissiveIntensity: 3.5,
      group: "head"
    })
  }

  // Open maw with fire glow
  boxes.push({
    id: id("fire_drake"),
    name: "Maw Glow",
    position: [0, 3.85, 0.85],
    scale: [0.12, 0.1, 0.1],
    colorType: "glow",
    colorMultiplier: 3,
    emissive: true,
    emissiveIntensity: 3,
    group: "head"
  })

  // Long serpentine neck
  for (let i = 0; i < 5; i++) {
    boxes.push({
      id: id("fire_drake"),
      name: `Neck ${i}`,
      position: [0, 3.7 - i * 0.15, 0.1 - i * 0.08],
      scale: [0.22, 0.18, 0.2],
      colorType: i % 2 === 0 ? "primary" : "secondary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "neck"
    })
  }

  // Massive body
  for (let seg = 0; seg < 8; seg++) {
    const segWidth = 0.6 - Math.abs(seg - 3.5) * 0.05
    for (let layer = 0; layer < 2; layer++) {
      boxes.push({
        id: id("fire_drake"),
        name: `Body ${seg}_${layer}`,
        position: [0, 2.8 - layer * 0.3, -0.4 - seg * 0.25],
        scale: [segWidth, 0.32, 0.28],
        colorType: (seg + layer) % 4 === 0 ? "glow" : (seg % 2 === 0 ? "primary" : "secondary"),
        colorMultiplier: (seg + layer) % 4 === 0 ? 1.5 : 1,
        emissive: (seg + layer) % 4 === 0,
        emissiveIntensity: (seg + layer) % 4 === 0 ? 1.5 : 0,
        group: "body"
      })
    }
  }

  // Spine ridges
  for (let i = 0; i < 10; i++) {
    boxes.push({
      id: id("fire_drake"),
      name: `Spine ${i}`,
      position: [0, 3.15, -0.2 - i * 0.22],
      scale: [0.06, 0.15 - i * 0.01, 0.1],
      colorType: i % 2 === 0 ? "glow" : "secondary",
      colorMultiplier: i % 2 === 0 ? 2 : 0.9,
      emissive: i % 2 === 0,
      emissiveIntensity: i % 2 === 0 ? 2 : 0,
      group: "body"
    })
  }

  // Wings
  for (const side of [-1, 1]) {
    const sideName = side > 0 ? "R" : "L"
    // Wing arm
    for (let i = 0; i < 4; i++) {
      boxes.push({
        id: id("fire_drake"),
        name: `Wing Arm ${sideName} ${i}`,
        position: [side * (0.4 + i * 0.25), 3.0 + i * 0.15, -0.6],
        scale: [0.08, 0.1, 0.2],
        colorType: "secondary",
        colorMultiplier: 0.9,
        emissive: false,
        emissiveIntensity: 0,
        group: "wings"
      })
    }
    // Wing membrane
    for (let seg = 0; seg < 4; seg++) {
      for (let vert = 0; vert < 3; vert++) {
        boxes.push({
          id: id("fire_drake"),
          name: `Wing Membrane ${sideName} ${seg}_${vert}`,
          position: [side * (0.5 + seg * 0.2), 2.7 - vert * 0.3, -0.5 - seg * 0.15],
          scale: [0.15, 0.25, 0.02],
          colorType: "glow",
          colorMultiplier: 0.8 + vert * 0.2,
          emissive: true,
          emissiveIntensity: 0.8 + vert * 0.2,
          group: "wings"
        })
      }
    }
  }

  // Four legs
  const legPos: [number, number][] = [[0.35, -0.3], [-0.35, -0.3], [0.35, -1.8], [-0.35, -1.8]]
  for (let legIdx = 0; legIdx < 4; legIdx++) {
    const [lx, lz] = legPos[legIdx]
    const legName = legIdx < 2 ? (legIdx === 0 ? "FR" : "FL") : (legIdx === 2 ? "BR" : "BL")
    
    for (let i = 0; i < 3; i++) {
      boxes.push({
        id: id("fire_drake"),
        name: `Leg ${legName} ${i}`,
        position: [lx, 2.3 - i * 0.25, lz],
        scale: [0.18, 0.25, 0.18],
        colorType: i === 1 ? "glow" : "primary",
        colorMultiplier: i === 1 ? 1.5 : 1,
        emissive: i === 1,
        emissiveIntensity: i === 1 ? 1.5 : 0,
        group: "legs"
      })
    }
    // Clawed foot
    boxes.push({
      id: id("fire_drake"),
      name: `Foot ${legName}`,
      position: [lx, 1.5, lz + 0.08],
      scale: [0.2, 0.15, 0.28],
      colorType: "secondary",
      colorMultiplier: 0.7,
      emissive: false,
      emissiveIntensity: 0,
      group: "legs"
    })
  }

  // Tail
  for (let i = 0; i < 8; i++) {
    const tailWidth = 0.15 - i * 0.015
    boxes.push({
      id: id("fire_drake"),
      name: `Tail ${i}`,
      position: [0, 2.4 + i * 0.04, -2.4 - i * 0.2],
      scale: [tailWidth, 0.12, 0.2],
      colorType: i % 3 === 0 ? "glow" : "primary",
      colorMultiplier: i % 3 === 0 ? 2 : 1,
      emissive: i % 3 === 0,
      emissiveIntensity: i % 3 === 0 ? 2 : 0,
      group: "tail"
    })
  }

  // Fire breath particles
  for (let fire = 0; fire < 5; fire++) {
    boxes.push({
      id: id("fire_drake"),
      name: `Fire Breath ${fire}`,
      position: [
        (Math.random() - 0.5) * 0.2,
        3.75 - fire * 0.04,
        1.0 + fire * 0.08
      ],
      scale: [0.06 + fire * 0.02, 0.06, 0.06],
      colorType: "glow",
      colorMultiplier: 3 - fire * 0.3,
      emissive: true,
      emissiveIntensity: 3 - fire * 0.3,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["head", "neck", "body", "wings", "legs", "tail", "effects"]
  }
}

export const FIRE_DRAKE_HEIGHT = 4.5
