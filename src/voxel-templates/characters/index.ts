// Character Voxel Templates Index
// Re-exports all character voxel models for easy access

export { createNPCModel, NPC_HEIGHT } from "./npc"
export { createPlayerModel, PLAYER_HEIGHT } from "./player"

// All character models grouped
export const CHARACTER_MODELS = {
  npc: { create: () => import("./npc").then((m) => m.createNPCModel()), height: 2.0 },
  player: { create: () => import("./player").then((m) => m.createPlayerModel()), height: 1.9 },
} as const

export type CharacterType = keyof typeof CHARACTER_MODELS
