/**
 * Enemy Color Configurations
 * Pulled from: lib/world/enemy-templates.ts
 * 
 * These are the exact color values used in the game for each enemy type.
 * Templates should reference these to maintain visual consistency.
 */

export interface EnemyColors {
  color: string        // Primary body color
  armorColor: string   // Secondary/armor color  
  glowColor: string    // Emissive/glow color
}

// ============================================
// DIGITAL ENEMIES
// ============================================

export const CORP_SECURITY_COLORS: EnemyColors = {
  color: "#1a3a5c",
  armorColor: "#2a5a8c",
  glowColor: "#00aaff"
}

export const STREET_PUNK_COLORS: EnemyColors = {
  color: "#4a2a4a",
  armorColor: "#6a3a6a",
  glowColor: "#ff00ff"
}

export const NETRUNNER_COLORS: EnemyColors = {
  color: "#0a2a2a",
  armorColor: "#00ffff",
  glowColor: "#00ffff"
}

export const ENFORCER_COLORS: EnemyColors = {
  color: "#2a2a3a",
  armorColor: "#4a4a6a",
  glowColor: "#ff3333"
}

export const COMBAT_DRONE_COLORS: EnemyColors = {
  color: "#3a3a3a",
  armorColor: "#5a5a5a",
  glowColor: "#ffaa00"
}

export const MECH_BOSS_COLORS: EnemyColors = {
  color: "#1a1a2a",
  armorColor: "#3a3a5a",
  glowColor: "#ff0000"
}

// ============================================
// FANTASY ENEMIES
// ============================================

export const FOREST_SPRITE_COLORS: EnemyColors = {
  color: "#88ff88",
  armorColor: "#44aa44",
  glowColor: "#aaffaa"
}

export const DIRE_WOLF_COLORS: EnemyColors = {
  color: "#4a4a5a",
  armorColor: "#3a3a4a",
  glowColor: "#ffaa00"
}

export const CRYSTAL_GOLEM_COLORS: EnemyColors = {
  color: "#aa66ff",
  armorColor: "#8844cc",
  glowColor: "#ff88ff"
}

export const MUSHROOM_TENDER_COLORS: EnemyColors = {
  color: "#ff8866",
  armorColor: "#cc6644",
  glowColor: "#ffaa88"
}

export const RUIN_WRAITH_COLORS: EnemyColors = {
  color: "#aaaacc",
  armorColor: "#8888aa",
  glowColor: "#ddddff"
}

export const ANCIENT_GUARDIAN_COLORS: EnemyColors = {
  color: "#ddaa66",
  armorColor: "#aa8844",
  glowColor: "#ffdd88"
}

// ============================================
// MIXED ENEMIES
// ============================================

export const GLITCH_SPRITE_COLORS: EnemyColors = {
  color: "#00ff88",
  armorColor: "#00aa55",
  glowColor: "#00ffff"
}

export const CORRUPTED_BEAST_COLORS: EnemyColors = {
  color: "#ff0066",
  armorColor: "#aa0044",
  glowColor: "#ff00ff"
}

export const DATA_PHANTOM_COLORS: EnemyColors = {
  color: "#8888ff",
  armorColor: "#6666cc",
  glowColor: "#aaaaff"
}

export const TECHNO_ELEMENTAL_COLORS: EnemyColors = {
  color: "#00ffaa",
  armorColor: "#00aa77",
  glowColor: "#88ffdd"
}

export const VIRUS_SWARM_COLORS: EnemyColors = {
  color: "#ff3366",
  armorColor: "#cc2244",
  glowColor: "#ff6699"
}

export const SYSTEM_OVERLORD_COLORS: EnemyColors = {
  color: "#220033",
  armorColor: "#440055",
  glowColor: "#ff00ff"
}

// ============================================
// VOLCANIC ENEMIES
// ============================================

export const LAVA_IMP_COLORS: EnemyColors = {
  color: "#ff4400",
  armorColor: "#aa2200",
  glowColor: "#ffaa00"
}

export const MAGMA_HOUND_COLORS: EnemyColors = {
  color: "#cc3300",
  armorColor: "#992200",
  glowColor: "#ff6600"
}

export const ASH_WRAITH_COLORS: EnemyColors = {
  color: "#444444",
  armorColor: "#666666",
  glowColor: "#ff8800"
}

export const VOLCANIC_GOLEM_COLORS: EnemyColors = {
  color: "#331100",
  armorColor: "#551100",
  glowColor: "#ff4400"
}

export const FIRE_DRAKE_COLORS: EnemyColors = {
  color: "#aa1100",
  armorColor: "#771100",
  glowColor: "#ff0000"
}

// ============================================
// FROZEN ENEMIES
// ============================================

export const FROST_WISP_COLORS: EnemyColors = {
  color: "#aaddff",
  armorColor: "#88bbdd",
  glowColor: "#ffffff"
}

export const ICE_WOLF_COLORS: EnemyColors = {
  color: "#6699cc",
  armorColor: "#4477aa",
  glowColor: "#88ddff"
}

export const FROZEN_REVENANT_COLORS: EnemyColors = {
  color: "#334455",
  armorColor: "#556677",
  glowColor: "#aaccff"
}

export const ICE_ELEMENTAL_COLORS: EnemyColors = {
  color: "#88ccff",
  armorColor: "#66aadd",
  glowColor: "#ffffff"
}

export const BLIZZARD_TITAN_COLORS: EnemyColors = {
  color: "#2244aa",
  armorColor: "#113388",
  glowColor: "#aaddff"
}

// ============================================
// EXISTING CORE ENEMIES (for reference)
// ============================================

export const BEAST_COLORS: EnemyColors = {
  color: "#4a3a2a",  // Brown body
  armorColor: "#6a5a4a",  // Lighter fur
  glowColor: "#ff6600"  // Orange eyes
}

export const SPIRIT_COLORS: EnemyColors = {
  color: "#6666aa",  // Purple-blue ethereal
  armorColor: "#8888cc",  // Lighter accents
  glowColor: "#aaaaff"  // Blue-white glow
}

export const GOLEM_COLORS: EnemyColors = {
  color: "#555566",  // Stone gray
  armorColor: "#777788",  // Lighter stone
  glowColor: "#00ff88"  // Green magical core
}

export const WRAITH_COLORS: EnemyColors = {
  color: "#2a2a3a",  // Dark shroud
  armorColor: "#4a4a5a",  // Lighter cloth
  glowColor: "#8866ff"  // Purple soul glow
}

export const HYBRID_COLORS: EnemyColors = {
  color: "#3a4a3a",  // Dark green-gray
  armorColor: "#5a6a5a",  // Lighter accents
  glowColor: "#00ffaa"  // Cyan-green glow
}

// ============================================
// COLOR LOOKUP BY ENEMY ID
// ============================================

export const ENEMY_COLOR_MAP: Record<string, EnemyColors> = {
  // Digital
  "corp-grunt": CORP_SECURITY_COLORS,
  "corp-security": CORP_SECURITY_COLORS,
  "street-punk": STREET_PUNK_COLORS,
  "netrunner": NETRUNNER_COLORS,
  "enforcer": ENFORCER_COLORS,
  "combat-drone": COMBAT_DRONE_COLORS,
  "drone": COMBAT_DRONE_COLORS,
  "mech-boss": MECH_BOSS_COLORS,
  "mech": MECH_BOSS_COLORS,
  
  // Fantasy
  "forest-sprite": FOREST_SPRITE_COLORS,
  "dire-wolf": DIRE_WOLF_COLORS,
  "crystal-golem": CRYSTAL_GOLEM_COLORS,
  "mushroom-tender": MUSHROOM_TENDER_COLORS,
  "ruin-wraith": RUIN_WRAITH_COLORS,
  "ancient-guardian": ANCIENT_GUARDIAN_COLORS,
  "beast": BEAST_COLORS,
  "spirit": SPIRIT_COLORS,
  "golem": GOLEM_COLORS,
  "wraith": WRAITH_COLORS,
  
  // Mixed
  "glitch-sprite": GLITCH_SPRITE_COLORS,
  "corrupted-beast": CORRUPTED_BEAST_COLORS,
  "data-phantom": DATA_PHANTOM_COLORS,
  "techno-elemental": TECHNO_ELEMENTAL_COLORS,
  "virus-swarm": VIRUS_SWARM_COLORS,
  "system-overlord": SYSTEM_OVERLORD_COLORS,
  "hybrid": HYBRID_COLORS,
  
  // Volcanic
  "lava-imp": LAVA_IMP_COLORS,
  "magma-hound": MAGMA_HOUND_COLORS,
  "ash-wraith": ASH_WRAITH_COLORS,
  "volcanic-golem": VOLCANIC_GOLEM_COLORS,
  "fire-drake": FIRE_DRAKE_COLORS,
  
  // Frozen
  "frost-wisp": FROST_WISP_COLORS,
  "ice-wolf": ICE_WOLF_COLORS,
  "frozen-revenant": FROZEN_REVENANT_COLORS,
  "ice-elemental": ICE_ELEMENTAL_COLORS,
  "blizzard-titan": BLIZZARD_TITAN_COLORS,
}

/**
 * Get colors for an enemy by ID
 */
export function getEnemyColors(enemyId: string): EnemyColors {
  return ENEMY_COLOR_MAP[enemyId] || {
    color: "#555555",
    armorColor: "#777777",
    glowColor: "#00ff00"
  }
}
