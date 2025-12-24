import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Urban Props Templates
 * Based on: lib/world/urban-props.ts
 * Environmental objects for city/street scenes
 */

let idCounter = 0
function id(prefix: string) { return `${prefix}_${idCounter++}` }

// ============================================
// STREETLIGHT - Neon-lit urban lamp post
// ============================================

export function createStreetlightModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Base plate
  boxes.push({
    id: id("streetlight"),
    name: "Base",
    position: [0, 0.05, 0],
    scale: [0.25, 0.1, 0.25],
    colorType: "secondary",
    colorMultiplier: 0.7,
    emissive: false,
    emissiveIntensity: 0,
    group: "base"
  })

  // Main pole
  for (let seg = 0; seg < 8; seg++) {
    boxes.push({
      id: id("streetlight"),
      name: `Pole ${seg}`,
      position: [0, 0.2 + seg * 0.4, 0],
      scale: [0.08, 0.4, 0.08],
      colorType: "primary",
      colorMultiplier: 0.9,
      emissive: false,
      emissiveIntensity: 0,
      group: "pole"
    })
  }

  // Arm extending out
  for (let arm = 0; arm < 3; arm++) {
    boxes.push({
      id: id("streetlight"),
      name: `Arm ${arm}`,
      position: [arm * 0.15, 3.4, 0],
      scale: [0.15, 0.06, 0.06],
      colorType: "primary",
      colorMultiplier: 0.85,
      emissive: false,
      emissiveIntensity: 0,
      group: "arm"
    })
  }

  // Light housing
  boxes.push({
    id: id("streetlight"),
    name: "Light Housing",
    position: [0.4, 3.35, 0],
    scale: [0.12, 0.08, 0.15],
    colorType: "primary",
    colorMultiplier: 0.8,
    emissive: false,
    emissiveIntensity: 0,
    group: "light"
  })

  // Light bulb (glowing)
  boxes.push({
    id: id("streetlight"),
    name: "Light Bulb",
    position: [0.4, 3.28, 0],
    scale: [0.1, 0.06, 0.12],
    colorType: "glow",
    colorMultiplier: 3,
    emissive: true,
    emissiveIntensity: 3,
    group: "light"
  })

  // Light cone effect
  for (let cone = 0; cone < 3; cone++) {
    const coneSize = 0.12 + cone * 0.08
    boxes.push({
      id: id("streetlight"),
      name: `Light Cone ${cone}`,
      position: [0.4, 3.15 - cone * 0.2, 0],
      scale: [coneSize, 0.15, coneSize],
      colorType: "glow",
      colorMultiplier: 1.5 - cone * 0.3,
      emissive: true,
      emissiveIntensity: 1.5 - cone * 0.3,
      group: "light"
    })
  }

  return {
    boxes,
    groups: ["base", "pole", "arm", "light"]
  }
}

export const STREETLIGHT_HEIGHT = 3.5

// ============================================
// TERMINAL - Interactive computer console
// ============================================

export function createTerminalModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Base stand
  boxes.push({
    id: id("terminal"),
    name: "Base",
    position: [0, 0.08, 0],
    scale: [0.35, 0.16, 0.3],
    colorType: "primary",
    colorMultiplier: 0.8,
    emissive: false,
    emissiveIntensity: 0,
    group: "base"
  })

  // Main body/tower
  for (let seg = 0; seg < 3; seg++) {
    boxes.push({
      id: id("terminal"),
      name: `Tower ${seg}`,
      position: [0, 0.3 + seg * 0.25, 0],
      scale: [0.3, 0.25, 0.25],
      colorType: seg === 1 ? "secondary" : "primary",
      colorMultiplier: seg === 1 ? 0.9 : 0.85,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }

  // Screen housing
  boxes.push({
    id: id("terminal"),
    name: "Screen Housing",
    position: [0, 1.1, 0.05],
    scale: [0.35, 0.3, 0.08],
    colorType: "primary",
    colorMultiplier: 0.7,
    emissive: false,
    emissiveIntensity: 0,
    group: "screen"
  })

  // Screen (glowing)
  boxes.push({
    id: id("terminal"),
    name: "Screen",
    position: [0, 1.1, 0.1],
    scale: [0.3, 0.25, 0.02],
    colorType: "glow",
    colorMultiplier: 2,
    emissive: true,
    emissiveIntensity: 2,
    group: "screen"
  })

  // Screen text lines
  for (let line = 0; line < 4; line++) {
    const lineWidth = 0.2 + Math.random() * 0.08
    boxes.push({
      id: id("terminal"),
      name: `Text Line ${line}`,
      position: [-0.02, 1.18 - line * 0.05, 0.12],
      scale: [lineWidth, 0.015, 0.01],
      colorType: "secondary",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 3,
      group: "screen"
    })
  }

  // Status LED
  boxes.push({
    id: id("terminal"),
    name: "Status LED",
    position: [0.12, 0.95, 0.15],
    scale: [0.03, 0.03, 0.02],
    colorType: "glow",
    colorMultiplier: 4,
    emissive: true,
    emissiveIntensity: 4,
    group: "body"
  })

  return {
    boxes,
    groups: ["base", "body", "screen"]
  }
}

export const TERMINAL_HEIGHT = 1.4

// ============================================
// HOLO-AD - Floating holographic advertisement
// ============================================

export function createHoloAdModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Projector base
  boxes.push({
    id: id("holo_ad"),
    name: "Projector Base",
    position: [0, 0.08, 0],
    scale: [0.2, 0.16, 0.2],
    colorType: "primary",
    colorMultiplier: 0.8,
    emissive: false,
    emissiveIntensity: 0,
    group: "projector"
  })

  // Projector lens
  boxes.push({
    id: id("holo_ad"),
    name: "Projector Lens",
    position: [0, 0.2, 0],
    scale: [0.1, 0.06, 0.1],
    colorType: "glow",
    colorMultiplier: 2,
    emissive: true,
    emissiveIntensity: 2,
    group: "projector"
  })

  // Hologram frame (ethereal)
  for (const side of [-1, 1]) {
    for (let h = 0; h < 3; h++) {
      boxes.push({
        id: id("holo_ad"),
        name: `Frame ${side > 0 ? "R" : "L"} ${h}`,
        position: [side * 0.35, 0.6 + h * 0.4, 0],
        scale: [0.02, 0.4, 0.02],
        colorType: "glow",
        colorMultiplier: 1.5,
        emissive: true,
        emissiveIntensity: 1.5,
        group: "hologram"
      })
    }
  }

  // Hologram top/bottom
  for (let tb = 0; tb < 2; tb++) {
    boxes.push({
      id: id("holo_ad"),
      name: `Frame ${tb === 0 ? "Bottom" : "Top"}`,
      position: [0, tb === 0 ? 0.45 : 1.75, 0],
      scale: [0.7, 0.02, 0.02],
      colorType: "glow",
      colorMultiplier: 1.5,
      emissive: true,
      emissiveIntensity: 1.5,
      group: "hologram"
    })
  }

  // Hologram content (floating panels)
  for (let panel = 0; panel < 3; panel++) {
    boxes.push({
      id: id("holo_ad"),
      name: `Content Panel ${panel}`,
      position: [0, 0.7 + panel * 0.35, 0],
      scale: [0.6, 0.28, 0.02],
      colorType: "glow",
      colorMultiplier: 1.2 + panel * 0.2,
      emissive: true,
      emissiveIntensity: 1.2 + panel * 0.2,
      group: "content"
    })
  }

  // Scanlines effect
  for (let scan = 0; scan < 6; scan++) {
    boxes.push({
      id: id("holo_ad"),
      name: `Scanline ${scan}`,
      position: [0, 0.55 + scan * 0.22, 0.02],
      scale: [0.55, 0.01, 0.01],
      colorType: "secondary",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "content"
    })
  }

  // Floating particles
  for (let p = 0; p < 6; p++) {
    const angle = (p / 6) * Math.PI * 2
    boxes.push({
      id: id("holo_ad"),
      name: `Particle ${p}`,
      position: [Math.cos(angle) * 0.4, 1.1 + Math.sin(p * 2) * 0.2, Math.sin(angle) * 0.15],
      scale: [0.02, 0.02, 0.02],
      colorType: "glow",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "effects"
    })
  }

  return {
    boxes,
    groups: ["projector", "hologram", "content", "effects"]
  }
}

export const HOLO_AD_HEIGHT = 1.8

// ============================================
// VEHICLE - Parked hover car
// ============================================

export function createVehicleModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Main body base
  for (let bx = -2; bx <= 2; bx++) {
    for (let bz = -1; bz <= 1; bz++) {
      boxes.push({
        id: id("vehicle"),
        name: `Body ${bx}_${bz}`,
        position: [bx * 0.25, 0.45, bz * 0.3],
        scale: [0.25, 0.25, 0.3],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "body"
      })
    }
  }

  // Roof/cabin
  for (let rx = -1; rx <= 1; rx++) {
    boxes.push({
      id: id("vehicle"),
      name: `Cabin ${rx}`,
      position: [rx * 0.25, 0.75, 0],
      scale: [0.25, 0.25, 0.5],
      colorType: "secondary",
      colorMultiplier: 0.9,
      emissive: false,
      emissiveIntensity: 0,
      group: "cabin"
    })
  }

  // Windows (darker, slightly reflective)
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("vehicle"),
      name: `Window ${side > 0 ? "R" : "L"}`,
      position: [0, 0.78, side * 0.28],
      scale: [0.6, 0.18, 0.02],
      colorType: "glow",
      colorMultiplier: 0.8,
      emissive: true,
      emissiveIntensity: 0.5,
      group: "cabin"
    })
  }

  // Front windshield
  boxes.push({
    id: id("vehicle"),
    name: "Windshield",
    position: [0.5, 0.72, 0],
    scale: [0.06, 0.22, 0.45],
    colorType: "glow",
    colorMultiplier: 0.7,
    emissive: true,
    emissiveIntensity: 0.4,
    group: "cabin"
  })

  // Headlights
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("vehicle"),
      name: `Headlight ${side > 0 ? "R" : "L"}`,
      position: [0.65, 0.42, side * 0.22],
      scale: [0.05, 0.08, 0.1],
      colorType: "glow",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 3,
      group: "lights"
    })
  }

  // Taillights
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("vehicle"),
      name: `Taillight ${side > 0 ? "R" : "L"}`,
      position: [-0.65, 0.42, side * 0.22],
      scale: [0.05, 0.08, 0.1],
      colorType: "secondary",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "lights"
    })
  }

  // Hover pads (glowing underside)
  for (const fx of [-1, 1]) {
    for (const fz of [-1, 1]) {
      boxes.push({
        id: id("vehicle"),
        name: `Hover Pad ${fx}_${fz}`,
        position: [fx * 0.4, 0.15, fz * 0.25],
        scale: [0.15, 0.08, 0.15],
        colorType: "glow",
        colorMultiplier: 2,
        emissive: true,
        emissiveIntensity: 2,
        group: "hover"
      })
    }
  }

  return {
    boxes,
    groups: ["body", "cabin", "lights", "hover"]
  }
}

export const VEHICLE_HEIGHT = 1.0

// ============================================
// TRASH - Debris pile
// ============================================

export function createTrashModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Random debris pieces
  for (let i = 0; i < 12; i++) {
    const px = (Math.random() - 0.5) * 0.5
    const pz = (Math.random() - 0.5) * 0.5
    const size = 0.08 + Math.random() * 0.1
    boxes.push({
      id: id("trash"),
      name: `Debris ${i}`,
      position: [px, 0.08 + i * 0.02, pz],
      scale: [size, size * 0.6, size],
      colorType: i % 2 === 0 ? "primary" : "secondary",
      colorMultiplier: 0.6 + Math.random() * 0.3,
      emissive: false,
      emissiveIntensity: 0,
      group: "debris"
    })
  }

  // Glowing tech scraps
  for (let glow = 0; glow < 3; glow++) {
    boxes.push({
      id: id("trash"),
      name: `Tech Scrap ${glow}`,
      position: [(Math.random() - 0.5) * 0.4, 0.15 + glow * 0.05, (Math.random() - 0.5) * 0.4],
      scale: [0.06, 0.04, 0.06],
      colorType: "glow",
      colorMultiplier: 1.5,
      emissive: true,
      emissiveIntensity: 1.5,
      group: "debris"
    })
  }

  return {
    boxes,
    groups: ["debris"]
  }
}

export const TRASH_HEIGHT = 0.4

// ============================================
// BARREL - Industrial container
// ============================================

export function createBarrelModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Barrel body (octagonal approximation)
  for (let layer = 0; layer < 4; layer++) {
    const segments = 8
    for (let seg = 0; seg < segments; seg++) {
      const angle = (seg / segments) * Math.PI * 2
      boxes.push({
        id: id("barrel"),
        name: `Body ${layer}_${seg}`,
        position: [Math.cos(angle) * 0.18, 0.15 + layer * 0.2, Math.sin(angle) * 0.18],
        scale: [0.12, 0.2, 0.12],
        colorType: layer === 1 || layer === 2 ? "primary" : "secondary",
        colorMultiplier: layer === 1 || layer === 2 ? 1 : 0.85,
        emissive: false,
        emissiveIntensity: 0,
        group: "body"
      })
    }
  }

  // Top lid
  boxes.push({
    id: id("barrel"),
    name: "Lid",
    position: [0, 0.95, 0],
    scale: [0.35, 0.06, 0.35],
    colorType: "secondary",
    colorMultiplier: 0.8,
    emissive: false,
    emissiveIntensity: 0,
    group: "lid"
  })

  // Warning symbol
  boxes.push({
    id: id("barrel"),
    name: "Warning Symbol",
    position: [0.22, 0.5, 0],
    scale: [0.02, 0.15, 0.15],
    colorType: "glow",
    colorMultiplier: 2,
    emissive: true,
    emissiveIntensity: 2,
    group: "body"
  })

  return {
    boxes,
    groups: ["body", "lid"]
  }
}

export const BARREL_HEIGHT = 1.0

// ============================================
// CRATE - Cargo container
// ============================================

export function createCrateModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Main crate body
  for (let cx = -1; cx <= 1; cx++) {
    for (let cy = 0; cy < 2; cy++) {
      for (let cz = -1; cz <= 1; cz++) {
        boxes.push({
          id: id("crate"),
          name: `Body ${cx}_${cy}_${cz}`,
          position: [cx * 0.22, 0.16 + cy * 0.28, cz * 0.22],
          scale: [0.22, 0.28, 0.22],
          colorType: (cx + cy + cz) % 2 === 0 ? "primary" : "secondary",
          colorMultiplier: (cx + cy + cz) % 2 === 0 ? 1 : 0.9,
          emissive: false,
          emissiveIntensity: 0,
          group: "body"
        })
      }
    }
  }

  // Reinforcement straps
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("crate"),
      name: `Strap V ${side > 0 ? "R" : "L"}`,
      position: [side * 0.35, 0.35, 0],
      scale: [0.02, 0.6, 0.4],
      colorType: "secondary",
      colorMultiplier: 0.6,
      emissive: false,
      emissiveIntensity: 0,
      group: "straps"
    })
  }

  // Tech lock
  boxes.push({
    id: id("crate"),
    name: "Lock",
    position: [0.36, 0.35, 0],
    scale: [0.04, 0.1, 0.1],
    colorType: "glow",
    colorMultiplier: 1.5,
    emissive: true,
    emissiveIntensity: 1.5,
    group: "body"
  })

  return {
    boxes,
    groups: ["body", "straps"]
  }
}

export const CRATE_HEIGHT = 0.7

// ============================================
// BENCH - Street seating
// ============================================

export function createBenchModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Legs
  for (const side of [-1, 1]) {
    for (const end of [-1, 1]) {
      boxes.push({
        id: id("bench"),
        name: `Leg ${side > 0 ? "R" : "L"}_${end > 0 ? "F" : "B"}`,
        position: [side * 0.5, 0.15, end * 0.15],
        scale: [0.06, 0.3, 0.06],
        colorType: "secondary",
        colorMultiplier: 0.8,
        emissive: false,
        emissiveIntensity: 0,
        group: "frame"
      })
    }
  }

  // Seat slats
  for (let slat = 0; slat < 4; slat++) {
    boxes.push({
      id: id("bench"),
      name: `Seat Slat ${slat}`,
      position: [0, 0.32, -0.12 + slat * 0.08],
      scale: [1.1, 0.04, 0.07],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "seat"
    })
  }

  // Back rest slats
  for (let slat = 0; slat < 3; slat++) {
    boxes.push({
      id: id("bench"),
      name: `Back Slat ${slat}`,
      position: [0, 0.45 + slat * 0.1, -0.18],
      scale: [1.1, 0.08, 0.04],
      colorType: "primary",
      colorMultiplier: 0.95,
      emissive: false,
      emissiveIntensity: 0,
      group: "back"
    })
  }

  // Armrests
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("bench"),
      name: `Armrest ${side > 0 ? "R" : "L"}`,
      position: [side * 0.52, 0.45, 0],
      scale: [0.04, 0.06, 0.3],
      colorType: "secondary",
      colorMultiplier: 0.85,
      emissive: false,
      emissiveIntensity: 0,
      group: "frame"
    })
  }

  return {
    boxes,
    groups: ["frame", "seat", "back"]
  }
}

export const BENCH_HEIGHT = 0.75

// ============================================
// VENDING - Vending machine
// ============================================

export function createVendingModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Main body
  for (let vx = -1; vx <= 1; vx++) {
    for (let vy = 0; vy < 5; vy++) {
      boxes.push({
        id: id("vending"),
        name: `Body ${vx}_${vy}`,
        position: [vx * 0.2, 0.2 + vy * 0.35, 0],
        scale: [0.2, 0.35, 0.35],
        colorType: vx === 0 ? "primary" : "secondary",
        colorMultiplier: vx === 0 ? 1 : 0.85,
        emissive: false,
        emissiveIntensity: 0,
        group: "body"
      })
    }
  }

  // Display window
  boxes.push({
    id: id("vending"),
    name: "Display",
    position: [0, 1.2, 0.2],
    scale: [0.5, 0.8, 0.02],
    colorType: "glow",
    colorMultiplier: 1.5,
    emissive: true,
    emissiveIntensity: 1.5,
    group: "display"
  })

  // Product rows (behind glass)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      boxes.push({
        id: id("vending"),
        name: `Product ${row}_${col}`,
        position: [(col - 1) * 0.14, 0.9 + row * 0.25, 0.12],
        scale: [0.1, 0.18, 0.1],
        colorType: (row + col) % 2 === 0 ? "secondary" : "glow",
        colorMultiplier: (row + col) % 2 === 0 ? 1 : 1.2,
        emissive: (row + col) % 2 !== 0,
        emissiveIntensity: (row + col) % 2 !== 0 ? 1.2 : 0,
        group: "products"
      })
    }
  }

  // Keypad
  boxes.push({
    id: id("vending"),
    name: "Keypad",
    position: [0.25, 0.7, 0.2],
    scale: [0.12, 0.18, 0.04],
    colorType: "secondary",
    colorMultiplier: 0.7,
    emissive: false,
    emissiveIntensity: 0,
    group: "controls"
  })

  // Keypad buttons
  for (let btn = 0; btn < 4; btn++) {
    boxes.push({
      id: id("vending"),
      name: `Button ${btn}`,
      position: [0.25, 0.62 + btn * 0.04, 0.23],
      scale: [0.08, 0.025, 0.02],
      colorType: "glow",
      colorMultiplier: 2,
      emissive: true,
      emissiveIntensity: 2,
      group: "controls"
    })
  }

  // Dispensing slot
  boxes.push({
    id: id("vending"),
    name: "Slot",
    position: [0, 0.25, 0.2],
    scale: [0.35, 0.15, 0.08],
    colorType: "primary",
    colorMultiplier: 0.5,
    emissive: false,
    emissiveIntensity: 0,
    group: "body"
  })

  return {
    boxes,
    groups: ["body", "display", "products", "controls"]
  }
}

export const VENDING_HEIGHT = 2.0

// ============================================
// DRONE PAD - Landing/charging station for drones
// ============================================

export function createDronePadModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Base platform
  for (let px = -2; px <= 2; px++) {
    for (let pz = -2; pz <= 2; pz++) {
      const isEdge = Math.abs(px) === 2 || Math.abs(pz) === 2
      boxes.push({
        id: id("drone_pad"),
        name: `Platform ${px}_${pz}`,
        position: [px * 0.18, 0.05, pz * 0.18],
        scale: [0.18, 0.1, 0.18],
        colorType: isEdge ? "secondary" : "primary",
        colorMultiplier: isEdge ? 0.8 : 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "platform"
      })
    }
  }

  // Landing lights (corner markers)
  for (const cx of [-1, 1]) {
    for (const cz of [-1, 1]) {
      boxes.push({
        id: id("drone_pad"),
        name: `Corner Light ${cx}_${cz}`,
        position: [cx * 0.35, 0.12, cz * 0.35],
        scale: [0.06, 0.04, 0.06],
        colorType: "glow",
        colorMultiplier: 2.5,
        emissive: true,
        emissiveIntensity: 2.5,
        group: "lights"
      })
    }
  }

  // Center charging node
  boxes.push({
    id: id("drone_pad"),
    name: "Charge Node Base",
    position: [0, 0.12, 0],
    scale: [0.15, 0.08, 0.15],
    colorType: "secondary",
    colorMultiplier: 0.9,
    emissive: false,
    emissiveIntensity: 0,
    group: "charger"
  })

  boxes.push({
    id: id("drone_pad"),
    name: "Charge Node Core",
    position: [0, 0.22, 0],
    scale: [0.08, 0.12, 0.08],
    colorType: "glow",
    colorMultiplier: 2,
    emissive: true,
    emissiveIntensity: 2,
    group: "charger"
  })

  // Guidance lines
  for (let line = 0; line < 4; line++) {
    const angle = (line / 4) * Math.PI * 2
    boxes.push({
      id: id("drone_pad"),
      name: `Guide Line ${line}`,
      position: [Math.cos(angle) * 0.25, 0.12, Math.sin(angle) * 0.25],
      scale: [0.25, 0.02, 0.03],
      colorType: "glow",
      colorMultiplier: 1.5,
      emissive: true,
      emissiveIntensity: 1.5,
      group: "lights"
    })
  }

  return {
    boxes,
    groups: ["platform", "lights", "charger"]
  }
}

export const DRONE_PAD_HEIGHT = 0.35

// ============================================
// POWER NODE - Energy distribution point
// ============================================

export function createPowerNodeModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Base
  boxes.push({
    id: id("power_node"),
    name: "Base",
    position: [0, 0.08, 0],
    scale: [0.3, 0.16, 0.3],
    colorType: "secondary",
    colorMultiplier: 0.75,
    emissive: false,
    emissiveIntensity: 0,
    group: "base"
  })

  // Main pillar
  for (let seg = 0; seg < 4; seg++) {
    boxes.push({
      id: id("power_node"),
      name: `Pillar ${seg}`,
      position: [0, 0.25 + seg * 0.25, 0],
      scale: [0.15, 0.25, 0.15],
      colorType: seg === 2 ? "glow" : "primary",
      colorMultiplier: seg === 2 ? 1.5 : 1,
      emissive: seg === 2,
      emissiveIntensity: seg === 2 ? 1.5 : 0,
      group: "pillar"
    })
  }

  // Energy core
  boxes.push({
    id: id("power_node"),
    name: "Energy Core",
    position: [0, 1.35, 0],
    scale: [0.2, 0.2, 0.2],
    colorType: "glow",
    colorMultiplier: 3,
    emissive: true,
    emissiveIntensity: 3,
    group: "core"
  })

  // Energy arcs
  for (let arc = 0; arc < 4; arc++) {
    const angle = (arc / 4) * Math.PI * 2
    boxes.push({
      id: id("power_node"),
      name: `Energy Arc ${arc}`,
      position: [Math.cos(angle) * 0.25, 1.35, Math.sin(angle) * 0.25],
      scale: [0.03, 0.15, 0.03],
      colorType: "glow",
      colorMultiplier: 2.5,
      emissive: true,
      emissiveIntensity: 2.5,
      group: "core"
    })
  }

  // Warning lights at base
  for (const side of [-1, 1]) {
    boxes.push({
      id: id("power_node"),
      name: `Warning ${side > 0 ? "R" : "L"}`,
      position: [side * 0.18, 0.2, 0.18],
      scale: [0.04, 0.04, 0.04],
      colorType: "secondary",
      colorMultiplier: 3,
      emissive: true,
      emissiveIntensity: 3,
      group: "base"
    })
  }

  return {
    boxes,
    groups: ["base", "pillar", "core"]
  }
}

export const POWER_NODE_HEIGHT = 1.55

// ============================================
// PIPE - Industrial piping
// ============================================

export function createPipeModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Main horizontal pipe
  for (let seg = 0; seg < 8; seg++) {
    const isJoint = seg === 0 || seg === 7 || seg === 3
    boxes.push({
      id: id("pipe"),
      name: `Segment ${seg}`,
      position: [-0.7 + seg * 0.2, 0.5, 0],
      scale: [0.2, isJoint ? 0.18 : 0.14, isJoint ? 0.18 : 0.14],
      colorType: isJoint ? "secondary" : "primary",
      colorMultiplier: isJoint ? 0.85 : 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "pipe"
    })
  }

  // Support brackets
  for (const x of [-0.5, 0.5]) {
    boxes.push({
      id: id("pipe"),
      name: `Bracket ${x > 0 ? "R" : "L"}`,
      position: [x, 0.35, 0],
      scale: [0.06, 0.2, 0.08],
      colorType: "secondary",
      colorMultiplier: 0.7,
      emissive: false,
      emissiveIntensity: 0,
      group: "supports"
    })
    boxes.push({
      id: id("pipe"),
      name: `Bracket Base ${x > 0 ? "R" : "L"}`,
      position: [x, 0.15, 0],
      scale: [0.1, 0.1, 0.1],
      colorType: "secondary",
      colorMultiplier: 0.65,
      emissive: false,
      emissiveIntensity: 0,
      group: "supports"
    })
  }

  // Pressure gauge
  boxes.push({
    id: id("pipe"),
    name: "Gauge",
    position: [0, 0.65, 0.1],
    scale: [0.1, 0.1, 0.06],
    colorType: "secondary",
    colorMultiplier: 0.8,
    emissive: false,
    emissiveIntensity: 0,
    group: "pipe"
  })

  // Gauge reading
  boxes.push({
    id: id("pipe"),
    name: "Gauge Display",
    position: [0, 0.65, 0.14],
    scale: [0.06, 0.06, 0.02],
    colorType: "glow",
    colorMultiplier: 2,
    emissive: true,
    emissiveIntensity: 2,
    group: "pipe"
  })

  return {
    boxes,
    groups: ["pipe", "supports"]
  }
}

export const PIPE_HEIGHT = 0.68

// ============================================
// VENT - Wall/floor ventilation grate
// ============================================

export function createVentModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Outer frame
  for (const side of ["top", "bottom", "left", "right"]) {
    const isHorizontal = side === "top" || side === "bottom"
    const y = side === "top" ? 0.55 : side === "bottom" ? 0.05 : 0.3
    const x = side === "left" ? -0.35 : side === "right" ? 0.35 : 0
    boxes.push({
      id: id("vent"),
      name: `Frame ${side}`,
      position: [x, y, 0],
      scale: isHorizontal ? [0.75, 0.06, 0.08] : [0.06, 0.5, 0.08],
      colorType: "secondary",
      colorMultiplier: 0.75,
      emissive: false,
      emissiveIntensity: 0,
      group: "frame"
    })
  }

  // Slats
  for (let slat = 0; slat < 6; slat++) {
    boxes.push({
      id: id("vent"),
      name: `Slat ${slat}`,
      position: [0, 0.12 + slat * 0.07, 0],
      scale: [0.6, 0.04, 0.05],
      colorType: "primary",
      colorMultiplier: 0.85,
      emissive: false,
      emissiveIntensity: 0,
      group: "slats"
    })
  }

  // Inner glow (air flow indicator)
  boxes.push({
    id: id("vent"),
    name: "Air Flow",
    position: [0, 0.3, -0.04],
    scale: [0.5, 0.35, 0.02],
    colorType: "glow",
    colorMultiplier: 0.8,
    emissive: true,
    emissiveIntensity: 0.8,
    group: "interior"
  })

  return {
    boxes,
    groups: ["frame", "slats", "interior"]
  }
}

export const VENT_HEIGHT = 0.6
