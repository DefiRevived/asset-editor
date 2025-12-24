// Voxel Templates Master Index
// This is the main entry point for all game voxel asset templates

// ============================================
// ENEMIES
// ============================================
export * from "./enemies"

// ============================================
// NATURE
// ============================================
export * from "./nature"

// ============================================
// CHARACTERS
// ============================================
export * from "./characters"

// ============================================
// ALL TEMPLATES REGISTRY
// ============================================
import { ENEMY_MODELS } from "./enemies"
import { NATURE_MODELS } from "./nature"
import { CHARACTER_MODELS } from "./characters"

/**
 * Complete registry of all voxel asset templates in the game
 */
export const ALL_TEMPLATES = {
  enemies: ENEMY_MODELS,
  nature: NATURE_MODELS,
  characters: CHARACTER_MODELS,
} as const

/**
 * Get a flat list of all template categories and their types
 */
export function getAllTemplatesList(): { category: string; type: string; name: string }[] {
  const list: { category: string; type: string; name: string }[] = []

  // Enemies
  Object.keys(ENEMY_MODELS).forEach((type) => {
    list.push({ category: "enemies", type, name: `Enemy: ${formatName(type)}` })
  })

  // Nature - nested categories
  Object.entries(NATURE_MODELS).forEach(([subCategory, models]) => {
    Object.keys(models).forEach((type) => {
      list.push({
        category: `nature/${subCategory}`,
        type,
        name: `${formatName(subCategory)}: ${formatName(type)}`,
      })
    })
  })

  // Characters
  Object.keys(CHARACTER_MODELS).forEach((type) => {
    list.push({ category: "characters", type, name: `Character: ${formatName(type)}` })
  })

  return list
}

/**
 * Format camelCase/kebab-case to Title Case
 */
function formatName(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/-/g, " ")
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}

// Export types
export type { EnemyType } from "./enemies"
export type { TreeType, CrystalType, MushroomType, VolcanicType, FrozenType, RuinType } from "./nature"
export type { CharacterType } from "./characters"
