// Enemy Voxel Templates Index
// Re-exports all enemy voxel models for easy access

// Enemy color configurations (exact colors from game)
export * from "./colors"
export type { EnemyColors } from "./colors"
export {
  getEnemyColors,
  ENEMY_COLOR_MAP,
  // Digital
  CORP_SECURITY_COLORS,
  STREET_PUNK_COLORS,
  NETRUNNER_COLORS,
  ENFORCER_COLORS,
  COMBAT_DRONE_COLORS,
  MECH_BOSS_COLORS,
  // Fantasy
  FOREST_SPRITE_COLORS,
  DIRE_WOLF_COLORS,
  CRYSTAL_GOLEM_COLORS,
  MUSHROOM_TENDER_COLORS,
  RUIN_WRAITH_COLORS,
  ANCIENT_GUARDIAN_COLORS,
  BEAST_COLORS,
  SPIRIT_COLORS,
  GOLEM_COLORS,
  WRAITH_COLORS,
  // Mixed
  GLITCH_SPRITE_COLORS,
  CORRUPTED_BEAST_COLORS,
  DATA_PHANTOM_COLORS,
  TECHNO_ELEMENTAL_COLORS,
  VIRUS_SWARM_COLORS,
  SYSTEM_OVERLORD_COLORS,
  HYBRID_COLORS,
  // Volcanic
  LAVA_IMP_COLORS,
  MAGMA_HOUND_COLORS,
  ASH_WRAITH_COLORS,
  VOLCANIC_GOLEM_COLORS,
  FIRE_DRAKE_COLORS,
  // Frozen
  FROST_WISP_COLORS,
  ICE_WOLF_COLORS,
  FROZEN_REVENANT_COLORS,
  ICE_ELEMENTAL_COLORS,
  BLIZZARD_TITAN_COLORS,
} from "./colors"

// Core enemies
export { createDroneModel, DRONE_HEIGHT } from "./drone"
export { createBeastModel, BEAST_HEIGHT } from "./beast"
export { createSpiritModel, SPIRIT_HEIGHT } from "./spirit"
export { createGolemModel, GOLEM_HEIGHT } from "./golem"
export { createDefaultHumanoidModel, DEFAULT_HUMANOID_HEIGHT } from "./default-humanoid"
export { createMechModel, MECH_HEIGHT } from "./mech"
export { createStreetPunkModel, STREET_PUNK_HEIGHT } from "./street-punk"
export { createCorpSecurityModel, CORP_SECURITY_HEIGHT } from "./corp-security"
export { createHybridModel, HYBRID_HEIGHT } from "./hybrid"
export { createCorruptedBeastModel, CORRUPTED_BEAST_HEIGHT } from "./corrupted-beast"
export { createGlitchSpriteModel, GLITCH_SPRITE_HEIGHT } from "./glitch-sprite"

// New enemy types
export { createWraithModel, WRAITH_HEIGHT } from "./wraith"
export { createNetrunnerModel, NETRUNNER_HEIGHT } from "./netrunner"
export { createEnforcerModel, ENFORCER_HEIGHT } from "./enforcer"

// Volcanic enemies
export {
  createLavaImpModel, LAVA_IMP_HEIGHT,
  createMagmaHoundModel, MAGMA_HOUND_HEIGHT,
  createAshWraithModel, ASH_WRAITH_HEIGHT,
  createVolcanicGolemModel, VOLCANIC_GOLEM_HEIGHT,
  createFireDrakeModel, FIRE_DRAKE_HEIGHT
} from "./volcanic"

// Frozen enemies
export {
  createFrostWispModel, FROST_WISP_HEIGHT,
  createIceWolfModel, ICE_WOLF_HEIGHT,
  createFrozenRevenantModel, FROZEN_REVENANT_HEIGHT,
  createIceElementalModel, ICE_ELEMENTAL_HEIGHT,
  createBlizzardTitanModel, BLIZZARD_TITAN_HEIGHT
} from "./frozen"

// Fantasy enemies
export {
  createForestSpriteModel, FOREST_SPRITE_HEIGHT,
  createDireWolfModel, DIRE_WOLF_HEIGHT,
  createCrystalGolemModel, CRYSTAL_GOLEM_HEIGHT,
  createMushroomTenderModel, MUSHROOM_TENDER_HEIGHT,
  createRuinWraithModel, RUIN_WRAITH_HEIGHT,
  createAncientGuardianModel, ANCIENT_GUARDIAN_HEIGHT
} from "./fantasy"

// Mixed/Hybrid enemies
export {
  createDataPhantomModel, DATA_PHANTOM_HEIGHT,
  createTechnoElementalModel, TECHNO_ELEMENTAL_HEIGHT,
  createVirusSwarmModel, VIRUS_SWARM_HEIGHT,
  createSystemOverlordModel, SYSTEM_OVERLORD_HEIGHT
} from "./mixed"

// All enemy model creators grouped for iteration
export const ENEMY_MODELS = {
  // Core digital enemies
  drone: { create: () => import("./drone").then((m) => m.createDroneModel()), height: 1.5 },
  streetPunk: { create: () => import("./street-punk").then((m) => m.createStreetPunkModel()), height: 2.1 },
  corpSecurity: { create: () => import("./corp-security").then((m) => m.createCorpSecurityModel()), height: 2.2 },
  netrunner: { create: () => import("./netrunner").then((m) => m.createNetrunnerModel()), height: 2.1 },
  enforcer: { create: () => import("./enforcer").then((m) => m.createEnforcerModel()), height: 2.4 },
  mech: { create: () => import("./mech").then((m) => m.createMechModel()), height: 4.0 },
  
  // Fantasy enemies
  beast: { create: () => import("./beast").then((m) => m.createBeastModel()), height: 1.6 },
  spirit: { create: () => import("./spirit").then((m) => m.createSpiritModel()), height: 2.3 },
  golem: { create: () => import("./golem").then((m) => m.createGolemModel()), height: 3.5 },
  wraith: { create: () => import("./wraith").then((m) => m.createWraithModel()), height: 2.6 },
  forestSprite: { create: () => import("./fantasy").then((m) => m.createForestSpriteModel()), height: 1.8 },
  direWolf: { create: () => import("./fantasy").then((m) => m.createDireWolfModel()), height: 2.0 },
  crystalGolem: { create: () => import("./fantasy").then((m) => m.createCrystalGolemModel()), height: 3.0 },
  mushroomTender: { create: () => import("./fantasy").then((m) => m.createMushroomTenderModel()), height: 2.2 },
  ruinWraith: { create: () => import("./fantasy").then((m) => m.createRuinWraithModel()), height: 2.4 },
  ancientGuardian: { create: () => import("./fantasy").then((m) => m.createAncientGuardianModel()), height: 5.1 },
  
  // Mixed enemies
  defaultHumanoid: { create: () => import("./default-humanoid").then((m) => m.createDefaultHumanoidModel()), height: 2.0 },
  hybrid: { create: () => import("./hybrid").then((m) => m.createHybridModel()), height: 2.6 },
  corruptedBeast: { create: () => import("./corrupted-beast").then((m) => m.createCorruptedBeastModel()), height: 2.1 },
  glitchSprite: { create: () => import("./glitch-sprite").then((m) => m.createGlitchSpriteModel()), height: 2.5 },
  dataPhantom: { create: () => import("./mixed").then((m) => m.createDataPhantomModel()), height: 2.3 },
  technoElemental: { create: () => import("./mixed").then((m) => m.createTechnoElementalModel()), height: 3.1 },
  virusSwarm: { create: () => import("./mixed").then((m) => m.createVirusSwarmModel()), height: 2.0 },
  systemOverlord: { create: () => import("./mixed").then((m) => m.createSystemOverlordModel()), height: 5.3 },
  
  // Volcanic enemies
  lavaImp: { create: () => import("./volcanic").then((m) => m.createLavaImpModel()), height: 1.5 },
  magmaHound: { create: () => import("./volcanic").then((m) => m.createMagmaHoundModel()), height: 1.5 },
  ashWraith: { create: () => import("./volcanic").then((m) => m.createAshWraithModel()), height: 2.6 },
  volcanicGolem: { create: () => import("./volcanic").then((m) => m.createVolcanicGolemModel()), height: 3.6 },
  fireDrake: { create: () => import("./volcanic").then((m) => m.createFireDrakeModel()), height: 4.5 },
  
  // Frozen enemies
  frostWisp: { create: () => import("./frozen").then((m) => m.createFrostWispModel()), height: 1.9 },
  iceWolf: { create: () => import("./frozen").then((m) => m.createIceWolfModel()), height: 1.6 },
  frozenRevenant: { create: () => import("./frozen").then((m) => m.createFrozenRevenantModel()), height: 2.3 },
  iceElemental: { create: () => import("./frozen").then((m) => m.createIceElementalModel()), height: 3.2 },
  blizzardTitan: { create: () => import("./frozen").then((m) => m.createBlizzardTitanModel()), height: 5.2 },
} as const

export type EnemyType = keyof typeof ENEMY_MODELS
