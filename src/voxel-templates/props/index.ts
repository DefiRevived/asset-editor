// Props Voxel Templates Index
// Re-exports all prop voxel models for easy access

// Prop color configurations
export * from "./colors"
export type { PropColors } from "./colors"
export {
  getPropColors,
  PROP_COLOR_MAP,
  STREETLIGHT_COLORS,
  TERMINAL_COLORS,
  HOLO_AD_COLORS,
  VEHICLE_COLORS,
  TRASH_COLORS,
  BARREL_COLORS,
  CRATE_COLORS,
  BENCH_COLORS,
  VENDING_COLORS,
  DRONE_PAD_COLORS,
  POWER_NODE_COLORS,
  PIPE_COLORS,
  VENT_COLORS,
} from "./colors"

export {
  createStreetlightModel, STREETLIGHT_HEIGHT,
  createTerminalModel, TERMINAL_HEIGHT,
  createHoloAdModel, HOLO_AD_HEIGHT,
  createVehicleModel, VEHICLE_HEIGHT,
  createTrashModel, TRASH_HEIGHT,
  createBarrelModel, BARREL_HEIGHT,
  createCrateModel, CRATE_HEIGHT,
  createBenchModel, BENCH_HEIGHT,
  createVendingModel, VENDING_HEIGHT,
  createDronePadModel, DRONE_PAD_HEIGHT,
  createPowerNodeModel, POWER_NODE_HEIGHT,
  createPipeModel, PIPE_HEIGHT,
  createVentModel, VENT_HEIGHT
} from "./urban-props"

// All prop model creators grouped for iteration
export const PROP_MODELS = {
  streetlight: { create: () => import("./urban-props").then((m) => m.createStreetlightModel()), height: 3.5 },
  terminal: { create: () => import("./urban-props").then((m) => m.createTerminalModel()), height: 1.4 },
  holoAd: { create: () => import("./urban-props").then((m) => m.createHoloAdModel()), height: 1.8 },
  vehicle: { create: () => import("./urban-props").then((m) => m.createVehicleModel()), height: 1.0 },
  trash: { create: () => import("./urban-props").then((m) => m.createTrashModel()), height: 0.4 },
  barrel: { create: () => import("./urban-props").then((m) => m.createBarrelModel()), height: 1.0 },
  crate: { create: () => import("./urban-props").then((m) => m.createCrateModel()), height: 0.7 },
  bench: { create: () => import("./urban-props").then((m) => m.createBenchModel()), height: 0.75 },
  vending: { create: () => import("./urban-props").then((m) => m.createVendingModel()), height: 2.0 },
  dronePad: { create: () => import("./urban-props").then((m) => m.createDronePadModel()), height: 0.35 },
  powerNode: { create: () => import("./urban-props").then((m) => m.createPowerNodeModel()), height: 1.55 },
  pipe: { create: () => import("./urban-props").then((m) => m.createPipeModel()), height: 0.68 },
  vent: { create: () => import("./urban-props").then((m) => m.createVentModel()), height: 0.6 },
} as const

export type PropType = keyof typeof PROP_MODELS
