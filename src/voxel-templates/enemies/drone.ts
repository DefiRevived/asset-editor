import { VoxelModel, VoxelBox } from "@/components/voxel-editor"

/**
 * Combat Drone / Netrunner - Hovering military drone with rotors, sensors, and weapons
 * Converted from: components/entities/enemies/drone.ts
 */

let idCounter = 0
function id() { return `drone_${idCounter++}` }

export function createDroneModel(): VoxelModel {
  idCounter = 0
  const boxes: VoxelBox[] = []

  // Main body (larger, more defined sphere)
  for (let ring = 0; ring < 5; ring++) {
    const ringY = 1.4 + (ring - 2) * 0.12
    const ringSize = 0.35 - Math.abs(ring - 2) * 0.08
    const segments = 8
    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      boxes.push({
        id: id(),
        name: `Body Ring ${ring}-${i}`,
        position: [Math.cos(theta) * ringSize, ringY, Math.sin(theta) * ringSize],
        scale: [0.1, 0.12, 0.1],
        colorType: "primary",
        colorMultiplier: 1,
        emissive: false,
        emissiveIntensity: 0,
        group: "body"
      })
    }
  }

  // Top dome
  for (let i = 0; i < 6; i++) {
    const theta = (i / 6) * Math.PI * 2
    boxes.push({
      id: id(),
      name: `Dome ${i}`,
      position: [Math.cos(theta) * 0.15, 1.7, Math.sin(theta) * 0.15],
      scale: [0.08, 0.08, 0.08],
      colorType: "primary",
      colorMultiplier: 0.8,
      emissive: false,
      emissiveIntensity: 0,
      group: "body"
    })
  }
  boxes.push({
    id: id(),
    name: "Dome Top",
    position: [0, 1.78, 0],
    scale: [0.1, 0.08, 0.1],
    colorType: "primary",
    colorMultiplier: 1,
    emissive: false,
    emissiveIntensity: 0,
    group: "body"
  })

  // Antenna
  boxes.push({
    id: id(),
    name: "Antenna Stem",
    position: [0, 1.9, 0],
    scale: [0.02, 0.12, 0.02],
    colorType: "primary",
    colorMultiplier: 0.6,
    emissive: false,
    emissiveIntensity: 0,
    group: "body"
  })
  boxes.push({
    id: id(),
    name: "Antenna Light",
    position: [0, 2.0, 0],
    scale: [0.04, 0.04, 0.04],
    colorType: "custom",
    customColor: "#ff0000",
    colorMultiplier: 2,
    emissive: true,
    emissiveIntensity: 1,
    group: "body"
  })

  // Central eye (larger, menacing)
  boxes.push({
    id: id(),
    name: "Main Eye",
    position: [0, 1.4, 0.32],
    scale: [0.18, 0.18, 0.06],
    colorType: "glow",
    colorMultiplier: 2.5,
    emissive: true,
    emissiveIntensity: 1,
    group: "sensors"
  })
  // Eye ring
  for (let i = 0; i < 8; i++) {
    const theta = (i / 8) * Math.PI * 2
    boxes.push({
      id: id(),
      name: `Eye Ring ${i}`,
      position: [Math.cos(theta) * 0.12, 1.4 + Math.sin(theta) * 0.12, 0.3],
      scale: [0.04, 0.04, 0.03],
      colorType: "primary",
      colorMultiplier: 0.5,
      emissive: false,
      emissiveIntensity: 0,
      group: "sensors"
    })
  }

  // Secondary sensors
  for (const side of [-1, 1]) {
    boxes.push({
      id: id(),
      name: side === -1 ? "Left Sensor" : "Right Sensor",
      position: [side * 0.25, 1.5, 0.2],
      scale: [0.06, 0.06, 0.04],
      colorType: "custom",
      customColor: "#ff0000",
      colorMultiplier: 1.4,
      emissive: true,
      emissiveIntensity: 0.8,
      group: "sensors"
    })
  }

  // Rotor arms (4, more substantial)
  for (let arm = 0; arm < 4; arm++) {
    const angle = (arm / 4) * Math.PI * 2 + Math.PI / 4
    // Arm structure
    for (let seg = 0; seg < 5; seg++) {
      boxes.push({
        id: id(),
        name: `Rotor Arm ${arm} Seg ${seg}`,
        position: [Math.cos(angle) * (0.2 + seg * 0.12), 1.65, Math.sin(angle) * (0.2 + seg * 0.12)],
        scale: [0.06, 0.04, 0.06],
        colorType: "primary",
        colorMultiplier: 0.7,
        emissive: false,
        emissiveIntensity: 0,
        group: "rotors"
      })
    }
    // Rotor housing
    boxes.push({
      id: id(),
      name: `Rotor Housing ${arm}`,
      position: [Math.cos(angle) * 0.7, 1.68, Math.sin(angle) * 0.7],
      scale: [0.12, 0.06, 0.12],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group: "rotors"
    })
    // Rotor blades (spinning effect)
    for (let blade = 0; blade < 3; blade++) {
      const bladeAngle = angle + (blade / 3) * Math.PI * 2
      boxes.push({
        id: id(),
        name: `Rotor ${arm} Blade ${blade}`,
        position: [Math.cos(angle) * 0.7 + Math.cos(bladeAngle) * 0.15, 1.72, Math.sin(angle) * 0.7 + Math.sin(bladeAngle) * 0.15],
        scale: [0.15, 0.02, 0.04],
        colorType: "glow",
        colorMultiplier: 0.75,
        emissive: false,
        emissiveIntensity: 0,
        group: "rotors"
      })
    }
    // Rotor glow
    boxes.push({
      id: id(),
      name: `Rotor ${arm} Glow`,
      position: [Math.cos(angle) * 0.7, 1.74, Math.sin(angle) * 0.7],
      scale: [0.18, 0.02, 0.18],
      colorType: "glow",
      colorMultiplier: 1.25,
      emissive: true,
      emissiveIntensity: 0.5,
      group: "rotors"
    })
  }

  // Weapon pods underneath (dual)
  for (const side of [-1, 1]) {
    // Pod housing
    boxes.push({
      id: id(),
      name: side === -1 ? "Left Weapon Pod" : "Right Weapon Pod",
      position: [side * 0.15, 1.1, 0.05],
      scale: [0.1, 0.2, 0.1],
      colorType: "primary",
      colorMultiplier: 0.6,
      emissive: false,
      emissiveIntensity: 0,
      group: "weapons"
    })
    // Barrel
    boxes.push({
      id: id(),
      name: side === -1 ? "Left Weapon Barrel" : "Right Weapon Barrel",
      position: [side * 0.15, 0.95, 0.12],
      scale: [0.04, 0.1, 0.04],
      colorType: "primary",
      colorMultiplier: 0.4,
      emissive: false,
      emissiveIntensity: 0,
      group: "weapons"
    })
  }

  // Thruster glow underneath
  boxes.push({
    id: id(),
    name: "Thruster Glow",
    position: [0, 1.0, 0],
    scale: [0.2, 0.06, 0.2],
    colorType: "glow",
    colorMultiplier: 2,
    emissive: true,
    emissiveIntensity: 0.8,
    group: "body"
  })

  return {
    boxes,
    groups: ["body", "sensors", "rotors", "weapons"]
  }
}

export const DRONE_HEIGHT = 2.2
