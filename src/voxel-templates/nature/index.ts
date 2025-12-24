// Nature Voxel Templates Index
// Re-exports all nature voxel models for easy access

// Trees
export {
  createOakTreeModel,
  createPineTreeModel,
  createWillowTreeModel,
  createCyberTreeModel,
  createCorruptedTreeModel,
  TREE_HEIGHT,
} from "./trees"

// Crystals
export {
  createCrystalClusterModel,
  createCrystalSpireModel,
  createFloatingCrystalModel,
  createDataShardModel,
  CRYSTAL_HEIGHT,
} from "./crystals"

// Mushrooms
export {
  createGiantMushroomModel,
  createCorruptedMushroomModel,
  MUSHROOM_HEIGHT,
} from "./mushrooms"

// Volcanic
export {
  createLavaPillarModel,
  createObsidianSpireModel,
  createVolcanicVentModel,
  createMagmaPoolModel,
  createAshMoundModel,
  createLavaRockModel,
  VOLCANIC_HEIGHT,
} from "./volcanic"

// Frozen
export {
  createIceSpireModel,
  createGlacierModel,
  createSnowMoundModel,
  createFrozenPillarModel,
  createIceCrystalModel,
  createSnowdriftModel,
  FROZEN_HEIGHT,
} from "./frozen"

// Ruins
export {
  createPillarRuinModel,
  createTechPillarModel,
  createArchRuinModel,
  createWallRuinModel,
  createTemplePieceModel,
  createTechTempleModel,
  createStatueRuinModel,
  RUINS_HEIGHT,
} from "./ruins"

// All nature models grouped by category
export const NATURE_MODELS = {
  trees: {
    oak: { create: () => import("./trees").then((m) => m.createOakTreeModel()) },
    pine: { create: () => import("./trees").then((m) => m.createPineTreeModel()) },
    willow: { create: () => import("./trees").then((m) => m.createWillowTreeModel()) },
    cyberTree: { create: () => import("./trees").then((m) => m.createCyberTreeModel()) },
    corruptedTree: { create: () => import("./trees").then((m) => m.createCorruptedTreeModel()) },
  },
  crystals: {
    cluster: { create: () => import("./crystals").then((m) => m.createCrystalClusterModel()) },
    spire: { create: () => import("./crystals").then((m) => m.createCrystalSpireModel()) },
    floating: { create: () => import("./crystals").then((m) => m.createFloatingCrystalModel()) },
    dataShard: { create: () => import("./crystals").then((m) => m.createDataShardModel()) },
  },
  mushrooms: {
    giant: { create: () => import("./mushrooms").then((m) => m.createGiantMushroomModel()) },
    corrupted: { create: () => import("./mushrooms").then((m) => m.createCorruptedMushroomModel()) },
  },
  volcanic: {
    lavaPillar: { create: () => import("./volcanic").then((m) => m.createLavaPillarModel()) },
    obsidianSpire: { create: () => import("./volcanic").then((m) => m.createObsidianSpireModel()) },
    volcanicVent: { create: () => import("./volcanic").then((m) => m.createVolcanicVentModel()) },
    magmaPool: { create: () => import("./volcanic").then((m) => m.createMagmaPoolModel()) },
    ashMound: { create: () => import("./volcanic").then((m) => m.createAshMoundModel()) },
    lavaRock: { create: () => import("./volcanic").then((m) => m.createLavaRockModel()) },
  },
  frozen: {
    iceSpire: { create: () => import("./frozen").then((m) => m.createIceSpireModel()) },
    glacier: { create: () => import("./frozen").then((m) => m.createGlacierModel()) },
    snowMound: { create: () => import("./frozen").then((m) => m.createSnowMoundModel()) },
    frozenPillar: { create: () => import("./frozen").then((m) => m.createFrozenPillarModel()) },
    iceCrystal: { create: () => import("./frozen").then((m) => m.createIceCrystalModel()) },
    snowdrift: { create: () => import("./frozen").then((m) => m.createSnowdriftModel()) },
  },
  ruins: {
    pillar: { create: () => import("./ruins").then((m) => m.createPillarRuinModel()) },
    techPillar: { create: () => import("./ruins").then((m) => m.createTechPillarModel()) },
    arch: { create: () => import("./ruins").then((m) => m.createArchRuinModel()) },
    wall: { create: () => import("./ruins").then((m) => m.createWallRuinModel()) },
    temple: { create: () => import("./ruins").then((m) => m.createTemplePieceModel()) },
    techTemple: { create: () => import("./ruins").then((m) => m.createTechTempleModel()) },
    statue: { create: () => import("./ruins").then((m) => m.createStatueRuinModel()) },
  },
} as const

export type TreeType = keyof typeof NATURE_MODELS.trees
export type CrystalType = keyof typeof NATURE_MODELS.crystals
export type MushroomType = keyof typeof NATURE_MODELS.mushrooms
export type VolcanicType = keyof typeof NATURE_MODELS.volcanic
export type FrozenType = keyof typeof NATURE_MODELS.frozen
export type RuinType = keyof typeof NATURE_MODELS.ruins
