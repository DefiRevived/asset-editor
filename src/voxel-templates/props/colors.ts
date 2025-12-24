/**
 * Prop Color Configurations
 * Default colors for urban and environment props
 */

export interface PropColors {
  primaryColor: string    // Main body/structure color
  secondaryColor: string  // Accent/detail color  
  glowColor: string       // Emissive/light color
}

// ============================================
// URBAN PROPS
// ============================================

export const STREETLIGHT_COLORS: PropColors = {
  primaryColor: "#3a3a4a",    // Dark metal pole
  secondaryColor: "#5a5a6a",  // Lighter metal accents
  glowColor: "#ffaa44"        // Warm light
}

export const TERMINAL_COLORS: PropColors = {
  primaryColor: "#2a2a3a",    // Dark casing
  secondaryColor: "#4a4a5a",  // Screen border
  glowColor: "#00ffff"        // Cyan screen glow
}

export const HOLO_AD_COLORS: PropColors = {
  primaryColor: "#1a1a2a",    // Dark frame
  secondaryColor: "#3a3a4a",  // Structure
  glowColor: "#ff00ff"        // Magenta hologram
}

export const VEHICLE_COLORS: PropColors = {
  primaryColor: "#2a3a4a",    // Dark body
  secondaryColor: "#4a5a6a",  // Trim
  glowColor: "#ff3333"        // Red taillights
}

export const TRASH_COLORS: PropColors = {
  primaryColor: "#3a3a2a",    // Dirty brown
  secondaryColor: "#4a4a3a",  // Lighter trash
  glowColor: "#66aa66"        // Toxic glow
}

export const BARREL_COLORS: PropColors = {
  primaryColor: "#4a3a2a",    // Rusty metal
  secondaryColor: "#5a4a3a",  // Rust highlights
  glowColor: "#ff6600"        // Warning glow
}

export const CRATE_COLORS: PropColors = {
  primaryColor: "#5a4a3a",    // Wood/metal
  secondaryColor: "#6a5a4a",  // Lighter wood
  glowColor: "#ffaa00"        // Caution light
}

export const BENCH_COLORS: PropColors = {
  primaryColor: "#4a4a5a",    // Metal frame
  secondaryColor: "#5a5a6a",  // Seat
  glowColor: "#0088ff"        // Blue accent
}

export const VENDING_COLORS: PropColors = {
  primaryColor: "#2a2a4a",    // Body
  secondaryColor: "#4a4a6a",  // Panels
  glowColor: "#00ff88"        // Green ready light
}

export const DRONE_PAD_COLORS: PropColors = {
  primaryColor: "#3a3a3a",    // Platform
  secondaryColor: "#5a5a5a",  // Edge
  glowColor: "#00aaff"        // Landing lights
}

export const POWER_NODE_COLORS: PropColors = {
  primaryColor: "#1a2a3a",    // Core
  secondaryColor: "#3a4a5a",  // Casing
  glowColor: "#00ffff"        // Energy glow
}

export const PIPE_COLORS: PropColors = {
  primaryColor: "#4a4a4a",    // Metal pipe
  secondaryColor: "#5a5a5a",  // Joints
  glowColor: "#88ff88"        // Steam/leak
}

export const VENT_COLORS: PropColors = {
  primaryColor: "#3a3a3a",    // Metal vent
  secondaryColor: "#4a4a4a",  // Grille
  glowColor: "#ffaa00"        // Heat glow
}

// ============================================
// COLOR LOOKUP BY PROP ID
// ============================================

export const PROP_COLOR_MAP: Record<string, PropColors> = {
  "streetlight": STREETLIGHT_COLORS,
  "terminal": TERMINAL_COLORS,
  "holo-ad": HOLO_AD_COLORS,
  "vehicle": VEHICLE_COLORS,
  "trash": TRASH_COLORS,
  "barrel": BARREL_COLORS,
  "crate": CRATE_COLORS,
  "bench": BENCH_COLORS,
  "vending": VENDING_COLORS,
  "vending-machine": VENDING_COLORS,
  "drone-pad": DRONE_PAD_COLORS,
  "power-node": POWER_NODE_COLORS,
  "pipe": PIPE_COLORS,
  "vent": VENT_COLORS,
}

/**
 * Get colors for a prop by ID
 */
export function getPropColors(propId: string): PropColors {
  return PROP_COLOR_MAP[propId] || {
    primaryColor: "#4a4a4a",
    secondaryColor: "#5a5a5a",
    glowColor: "#00ffff"
  }
}
