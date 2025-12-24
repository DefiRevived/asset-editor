/**
 * Voxel Animation System
 * 
 * Supports keyframe-based animations for voxel model groups.
 * Animations can transform position, rotation, and scale of groups over time.
 */

// ============================================
// ANIMATION DATA TYPES
// ============================================

export type EasingFunction = 
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "bounce"
  | "elastic"

export interface Transform {
  position?: [number, number, number]
  rotation?: [number, number, number]  // Euler angles in radians
  scale?: [number, number, number]
}

export interface Keyframe {
  /** Time in seconds from animation start */
  time: number
  /** Target groups to animate (empty = all groups) */
  groups: string[]
  /** Transform to apply */
  transform: Transform
  /** Easing function for interpolation to this keyframe */
  easing: EasingFunction
}

export interface AnimationClip {
  /** Unique identifier */
  id: string
  /** Display name */
  name: string
  /** Duration in seconds */
  duration: number
  /** Whether to loop the animation */
  loop: boolean
  /** Keyframes sorted by time */
  keyframes: Keyframe[]
}

export interface AnimationSet {
  /** All animation clips for this model */
  clips: AnimationClip[]
  /** Default/idle animation clip id */
  defaultClip?: string
}

// ============================================
// MODEL GROUP DEFINITIONS
// ============================================

/**
 * Group names used in voxel templates:
 * 
 * HUMANOID (default-humanoid, mech, golem):
 *   - head, body, arms, legs, shoulders, shards, weapons
 * 
 * BEAST:
 *   - head, body, legs, tail
 * 
 * DRONE:
 *   - body, sensors, rotors, weapons
 * 
 * SPIRIT:
 *   - core, body, head, orbs, trails, arms
 * 
 * PROPS (urban-props):
 *   - base, pole, arm, light, screen, body, projector, hologram, content, effects, cabin
 */

export type ModelType = "humanoid" | "mech" | "golem" | "beast" | "drone" | "spirit" | "prop" | "generic"

export const MODEL_GROUPS: Record<ModelType, string[]> = {
  humanoid: ["head", "body", "arms", "legs"],  // default-humanoid
  mech: ["head", "body", "arms", "legs", "weapons"],  // mech with mounted weapons
  golem: ["head", "body", "arms", "legs", "shoulders", "shards"],  // golem with crystals
  beast: ["head", "body", "legs", "tail"],
  drone: ["body", "sensors", "rotors", "weapons"],
  spirit: ["core", "body", "head", "orbs", "trails", "arms"],
  prop: ["base", "pole", "arm", "light", "screen", "body", "projector", "hologram", "content", "effects", "cabin"],
  generic: ["body", "head", "arms", "legs"],
}

// ============================================
// PRESET ANIMATIONS
// ============================================

export const ANIMATION_PRESETS: Record<string, () => AnimationClip> = {
  // ========== UNIVERSAL ANIMATIONS ==========
  idle: () => ({
    id: "idle",
    name: "Idle",
    duration: 2,
    loop: true,
    keyframes: [
      { time: 0, groups: ["body"], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
      { time: 1, groups: ["body"], transform: { position: [0, 0.05, 0] }, easing: "easeInOut" },
      { time: 2, groups: ["body"], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
    ]
  }),
  
  hit: () => ({
    id: "hit",
    name: "Hit Reaction",
    duration: 0.4,
    loop: false,
    keyframes: [
      { time: 0, groups: ["body"], transform: { position: [0, 0, 0], rotation: [0, 0, 0] }, easing: "linear" },
      { time: 0.1, groups: ["body"], transform: { position: [0, 0, -0.1], rotation: [-0.1, 0, 0] }, easing: "easeOut" },
      { time: 0.25, groups: ["body"], transform: { position: [0, 0, -0.05], rotation: [-0.05, 0, 0] }, easing: "easeInOut" },
      { time: 0.4, groups: ["body"], transform: { position: [0, 0, 0], rotation: [0, 0, 0] }, easing: "easeIn" },
    ]
  }),
  
  death: () => ({
    id: "death",
    name: "Death",
    duration: 1.2,
    loop: false,
    keyframes: [
      { time: 0, groups: ["body"], transform: { position: [0, 0, 0], rotation: [0, 0, 0] }, easing: "linear" },
      { time: 0.3, groups: ["body"], transform: { position: [0, -0.2, 0], rotation: [-0.3, 0, 0.1] }, easing: "easeOut" },
      { time: 0.6, groups: ["body"], transform: { position: [0, -0.5, 0.2], rotation: [-0.8, 0, 0.2] }, easing: "easeIn" },
      { time: 1.0, groups: ["body"], transform: { position: [0, -0.8, 0.3], rotation: [-1.5, 0, 0.3] }, easing: "easeOut" },
      { time: 1.2, groups: ["body"], transform: { position: [0, -0.9, 0.35], rotation: [-1.57, 0, 0.3] }, easing: "bounce" },
    ]
  }),
  
  spin: () => ({
    id: "spin",
    name: "Spin Attack",
    duration: 0.5,
    loop: false,
    keyframes: [
      { time: 0, groups: ["body"], transform: { rotation: [0, 0, 0] }, easing: "linear" },
      { time: 0.25, groups: ["body"], transform: { rotation: [0, Math.PI, 0] }, easing: "easeInOut" },
      { time: 0.5, groups: ["body"], transform: { rotation: [0, Math.PI * 2, 0] }, easing: "easeOut" },
    ]
  }),
  
  // ========== HUMANOID ANIMATIONS (head, body, arms, legs) ==========
  walk: () => ({
    id: "walk",
    name: "Walk (Humanoid)",
    duration: 0.8,
    loop: true,
    keyframes: [
      // Forward stride - legs and arms swing together, head bobs slightly
      { time: 0, groups: ["legs"], transform: { rotation: [0.3, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["arms"], transform: { rotation: [-0.2, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["body"], transform: { position: [0, 0.02, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["head"], transform: { rotation: [0, 0.02, 0] }, easing: "easeInOut" },
      // Mid stride
      { time: 0.2, groups: ["body"], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
      { time: 0.2, groups: ["head"], transform: { rotation: [0.02, 0, 0] }, easing: "easeInOut" },
      // Back stride
      { time: 0.4, groups: ["legs"], transform: { rotation: [-0.3, 0, 0] }, easing: "easeInOut" },
      { time: 0.4, groups: ["arms"], transform: { rotation: [0.2, 0, 0] }, easing: "easeInOut" },
      { time: 0.4, groups: ["body"], transform: { position: [0, 0.02, 0] }, easing: "easeInOut" },
      { time: 0.4, groups: ["head"], transform: { rotation: [0, -0.02, 0] }, easing: "easeInOut" },
      // Mid stride
      { time: 0.6, groups: ["body"], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
      { time: 0.6, groups: ["head"], transform: { rotation: [0.02, 0, 0] }, easing: "easeInOut" },
      // Return to start
      { time: 0.8, groups: ["legs"], transform: { rotation: [0.3, 0, 0] }, easing: "easeInOut" },
      { time: 0.8, groups: ["arms"], transform: { rotation: [-0.2, 0, 0] }, easing: "easeInOut" },
      { time: 0.8, groups: ["body"], transform: { position: [0, 0.02, 0] }, easing: "easeInOut" },
      { time: 0.8, groups: ["head"], transform: { rotation: [0, 0.02, 0] }, easing: "easeInOut" },
    ]
  }),
  
  run: () => ({
    id: "run",
    name: "Run (Humanoid)",
    duration: 0.5,
    loop: true,
    keyframes: [
      // Forward stride with body bob and head tilt
      { time: 0, groups: ["legs"], transform: { rotation: [0.5, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["arms"], transform: { rotation: [-0.4, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["body"], transform: { position: [0, 0.08, 0], rotation: [0.05, 0, 0] }, easing: "easeOut" },
      { time: 0, groups: ["head"], transform: { rotation: [-0.05, 0.03, 0] }, easing: "easeOut" },
      // Mid stride
      { time: 0.125, groups: ["body"], transform: { position: [0, 0, 0], rotation: [0, 0, 0] }, easing: "easeIn" },
      { time: 0.125, groups: ["head"], transform: { rotation: [0, 0, 0] }, easing: "easeIn" },
      // Back stride
      { time: 0.25, groups: ["legs"], transform: { rotation: [-0.5, 0, 0] }, easing: "easeInOut" },
      { time: 0.25, groups: ["arms"], transform: { rotation: [0.4, 0, 0] }, easing: "easeInOut" },
      { time: 0.25, groups: ["body"], transform: { position: [0, 0.08, 0], rotation: [0.05, 0, 0] }, easing: "easeOut" },
      { time: 0.25, groups: ["head"], transform: { rotation: [-0.05, -0.03, 0] }, easing: "easeOut" },
      // Mid stride
      { time: 0.375, groups: ["body"], transform: { position: [0, 0, 0], rotation: [0, 0, 0] }, easing: "easeIn" },
      { time: 0.375, groups: ["head"], transform: { rotation: [0, 0, 0] }, easing: "easeIn" },
      // Loop back
      { time: 0.5, groups: ["legs"], transform: { rotation: [0.5, 0, 0] }, easing: "easeInOut" },
      { time: 0.5, groups: ["arms"], transform: { rotation: [-0.4, 0, 0] }, easing: "easeInOut" },
      { time: 0.5, groups: ["body"], transform: { position: [0, 0.08, 0], rotation: [0.05, 0, 0] }, easing: "easeOut" },
      { time: 0.5, groups: ["head"], transform: { rotation: [-0.05, 0.03, 0] }, easing: "easeOut" },
    ]
  }),
  
  attack: () => ({
    id: "attack",
    name: "Attack (Humanoid)",
    duration: 0.6,
    loop: false,
    keyframes: [
      // Wind up - head looks at target
      { time: 0, groups: ["arms"], transform: { rotation: [-0.5, 0, -0.3] }, easing: "easeOut" },
      { time: 0, groups: ["body"], transform: { rotation: [0, -0.2, 0] }, easing: "easeOut" },
      { time: 0, groups: ["head"], transform: { rotation: [0.1, 0.2, 0] }, easing: "easeOut" },
      { time: 0, groups: ["legs"], transform: { rotation: [0.1, -0.1, 0] }, easing: "easeOut" },
      // Strike
      { time: 0.2, groups: ["arms"], transform: { rotation: [0.8, 0, 0.2] }, easing: "easeIn" },
      { time: 0.2, groups: ["body"], transform: { rotation: [0, 0.3, 0] }, easing: "easeIn" },
      { time: 0.2, groups: ["head"], transform: { rotation: [-0.1, 0.1, 0] }, easing: "easeIn" },
      { time: 0.2, groups: ["legs"], transform: { rotation: [-0.1, 0.1, 0] }, easing: "easeIn" },
      // Hold
      { time: 0.35, groups: ["arms"], transform: { rotation: [0.8, 0, 0.2] }, easing: "linear" },
      { time: 0.35, groups: ["head"], transform: { rotation: [-0.1, 0.1, 0] }, easing: "linear" },
      // Return
      { time: 0.6, groups: ["arms"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 0.6, groups: ["body"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 0.6, groups: ["head"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 0.6, groups: ["legs"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
    ]
  }),
  
  jump: () => ({
    id: "jump",
    name: "Jump (Humanoid)",
    duration: 0.8,
    loop: false,
    keyframes: [
      // Crouch
      { time: 0, groups: ["body"], transform: { position: [0, -0.1, 0], scale: [1, 0.9, 1] }, easing: "easeOut" },
      { time: 0, groups: ["legs"], transform: { rotation: [0.3, 0, 0] }, easing: "easeOut" },
      // Launch
      { time: 0.15, groups: ["body"], transform: { position: [0, 0.5, 0], scale: [1, 1.1, 1] }, easing: "easeOut" },
      { time: 0.15, groups: ["legs"], transform: { rotation: [-0.2, 0, 0] }, easing: "easeOut" },
      { time: 0.15, groups: ["arms"], transform: { rotation: [-0.5, 0, 0] }, easing: "easeOut" },
      // Peak
      { time: 0.4, groups: ["body"], transform: { position: [0, 0.6, 0], scale: [1, 1, 1] }, easing: "easeInOut" },
      // Fall
      { time: 0.65, groups: ["body"], transform: { position: [0, 0.1, 0], scale: [1, 1, 1] }, easing: "easeIn" },
      // Land
      { time: 0.75, groups: ["body"], transform: { position: [0, -0.1, 0], scale: [1, 0.9, 1] }, easing: "easeOut" },
      { time: 0.75, groups: ["legs"], transform: { rotation: [0.2, 0, 0] }, easing: "easeOut" },
      // Recover
      { time: 0.8, groups: ["body"], transform: { position: [0, 0, 0], scale: [1, 1, 1] }, easing: "easeOut" },
      { time: 0.8, groups: ["legs"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 0.8, groups: ["arms"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
    ]
  }),
  
  // ========== BEAST ANIMATIONS (head, body, legs, tail) ==========
  roar: () => ({
    id: "roar",
    name: "Roar (Beast)",
    duration: 1.0,
    loop: false,
    keyframes: [
      { time: 0, groups: ["head"], transform: { rotation: [0, 0, 0] }, easing: "linear" },
      { time: 0, groups: ["body"], transform: { scale: [1, 1, 1] }, easing: "linear" },
      // Rear back
      { time: 0.2, groups: ["head"], transform: { rotation: [-0.3, 0, 0] }, easing: "easeOut" },
      { time: 0.2, groups: ["body"], transform: { scale: [1.05, 1.1, 1.05] }, easing: "easeOut" },
      // Roar
      { time: 0.35, groups: ["head"], transform: { rotation: [0.4, 0, 0] }, easing: "easeIn" },
      { time: 0.35, groups: ["body"], transform: { scale: [1.1, 0.95, 1.1] }, easing: "easeIn" },
      // Hold
      { time: 0.6, groups: ["head"], transform: { rotation: [0.35, 0, 0] }, easing: "linear" },
      { time: 0.6, groups: ["body"], transform: { scale: [1.08, 0.97, 1.08] }, easing: "linear" },
      // Return
      { time: 1.0, groups: ["head"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 1.0, groups: ["body"], transform: { scale: [1, 1, 1] }, easing: "easeOut" },
    ]
  }),
  
  prowl: () => ({
    id: "prowl",
    name: "Prowl (Beast)",
    duration: 1.2,
    loop: true,
    keyframes: [
      // Low crouch walk
      { time: 0, groups: ["body"], transform: { position: [0, -0.1, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["legs"], transform: { rotation: [0.2, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["head"], transform: { rotation: [0.1, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["tail"], transform: { rotation: [0, 0.1, 0] }, easing: "easeInOut" },
      // Mid stride
      { time: 0.3, groups: ["legs"], transform: { rotation: [-0.1, 0, 0] }, easing: "easeInOut" },
      { time: 0.3, groups: ["tail"], transform: { rotation: [0, -0.1, 0] }, easing: "easeInOut" },
      // Forward
      { time: 0.6, groups: ["legs"], transform: { rotation: [0.2, 0, 0] }, easing: "easeInOut" },
      { time: 0.6, groups: ["tail"], transform: { rotation: [0, 0.15, 0] }, easing: "easeInOut" },
      // Mid stride
      { time: 0.9, groups: ["legs"], transform: { rotation: [-0.1, 0, 0] }, easing: "easeInOut" },
      { time: 0.9, groups: ["tail"], transform: { rotation: [0, -0.15, 0] }, easing: "easeInOut" },
      // Loop
      { time: 1.2, groups: ["body"], transform: { position: [0, -0.1, 0] }, easing: "easeInOut" },
      { time: 1.2, groups: ["legs"], transform: { rotation: [0.2, 0, 0] }, easing: "easeInOut" },
      { time: 1.2, groups: ["tail"], transform: { rotation: [0, 0.1, 0] }, easing: "easeInOut" },
    ]
  }),
  
  pounce: () => ({
    id: "pounce",
    name: "Pounce (Beast)",
    duration: 0.8,
    loop: false,
    keyframes: [
      // Wind up - crouch low
      { time: 0, groups: ["body"], transform: { position: [0, -0.2, -0.1], scale: [1, 0.8, 1.1] }, easing: "easeOut" },
      { time: 0, groups: ["legs"], transform: { rotation: [0.4, 0, 0] }, easing: "easeOut" },
      { time: 0, groups: ["head"], transform: { rotation: [-0.2, 0, 0] }, easing: "easeOut" },
      // Launch
      { time: 0.2, groups: ["body"], transform: { position: [0, 0.4, 0.3], scale: [1, 1.2, 0.9] }, easing: "easeOut" },
      { time: 0.2, groups: ["legs"], transform: { rotation: [-0.3, 0, 0] }, easing: "easeOut" },
      { time: 0.2, groups: ["head"], transform: { rotation: [0.2, 0, 0] }, easing: "easeOut" },
      // Peak - extend
      { time: 0.4, groups: ["body"], transform: { position: [0, 0.3, 0.5], scale: [1, 1, 1] }, easing: "easeInOut" },
      // Land
      { time: 0.6, groups: ["body"], transform: { position: [0, -0.1, 0.6], scale: [1, 0.9, 1] }, easing: "easeIn" },
      { time: 0.6, groups: ["legs"], transform: { rotation: [0.2, 0, 0] }, easing: "easeIn" },
      // Recover
      { time: 0.8, groups: ["body"], transform: { position: [0, 0, 0], scale: [1, 1, 1] }, easing: "easeOut" },
      { time: 0.8, groups: ["legs"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 0.8, groups: ["head"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
    ]
  }),
  
  tailSwipe: () => ({
    id: "tailSwipe",
    name: "Tail Swipe (Beast)",
    duration: 0.6,
    loop: false,
    keyframes: [
      { time: 0, groups: ["tail"], transform: { rotation: [0, 0.3, 0] }, easing: "easeOut" },
      { time: 0, groups: ["body"], transform: { rotation: [0, 0.1, 0] }, easing: "easeOut" },
      // Swing
      { time: 0.2, groups: ["tail"], transform: { rotation: [0, -0.8, 0] }, easing: "easeIn" },
      { time: 0.2, groups: ["body"], transform: { rotation: [0, -0.2, 0] }, easing: "easeIn" },
      // Follow through
      { time: 0.35, groups: ["tail"], transform: { rotation: [0, -0.6, 0] }, easing: "easeOut" },
      // Return
      { time: 0.6, groups: ["tail"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
      { time: 0.6, groups: ["body"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
    ]
  }),
  
  // ========== DRONE ANIMATIONS (body, sensors, rotors, weapons) ==========
  hover: () => ({
    id: "hover",
    name: "Hover (Drone)",
    duration: 2,
    loop: true,
    keyframes: [
      { time: 0, groups: ["body"], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["rotors"], transform: { rotation: [0, 0, 0] }, easing: "linear" },
      { time: 0.5, groups: ["body"], transform: { position: [0.02, 0.05, 0] }, easing: "easeInOut" },
      { time: 0.5, groups: ["rotors"], transform: { rotation: [0, Math.PI, 0] }, easing: "linear" },
      { time: 1, groups: ["body"], transform: { position: [0, 0.08, 0] }, easing: "easeInOut" },
      { time: 1, groups: ["rotors"], transform: { rotation: [0, Math.PI * 2, 0] }, easing: "linear" },
      { time: 1.5, groups: ["body"], transform: { position: [-0.02, 0.05, 0] }, easing: "easeInOut" },
      { time: 1.5, groups: ["rotors"], transform: { rotation: [0, Math.PI * 3, 0] }, easing: "linear" },
      { time: 2, groups: ["body"], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
      { time: 2, groups: ["rotors"], transform: { rotation: [0, Math.PI * 4, 0] }, easing: "linear" },
    ]
  }),
  
  scan: () => ({
    id: "scan",
    name: "Scan (Drone)",
    duration: 2,
    loop: true,
    keyframes: [
      { time: 0, groups: ["sensors"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["body"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
      // Look left
      { time: 0.5, groups: ["sensors"], transform: { rotation: [0, -0.4, 0] }, easing: "easeInOut" },
      { time: 0.5, groups: ["body"], transform: { rotation: [0, -0.1, 0] }, easing: "easeInOut" },
      // Center
      { time: 1, groups: ["sensors"], transform: { rotation: [0.1, 0, 0] }, easing: "easeInOut" },
      { time: 1, groups: ["body"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
      // Look right
      { time: 1.5, groups: ["sensors"], transform: { rotation: [0, 0.4, 0] }, easing: "easeInOut" },
      { time: 1.5, groups: ["body"], transform: { rotation: [0, 0.1, 0] }, easing: "easeInOut" },
      // Return
      { time: 2, groups: ["sensors"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
      { time: 2, groups: ["body"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
    ]
  }),
  
  droneAttack: () => ({
    id: "droneAttack",
    name: "Attack (Drone)",
    duration: 0.6,
    loop: false,
    keyframes: [
      // Target lock
      { time: 0, groups: ["sensors"], transform: { scale: [1, 1, 1] }, easing: "easeOut" },
      { time: 0, groups: ["weapons"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      // Aim
      { time: 0.15, groups: ["sensors"], transform: { scale: [0.9, 0.9, 0.9] }, easing: "easeIn" },
      { time: 0.15, groups: ["weapons"], transform: { rotation: [-0.1, 0, 0] }, easing: "easeIn" },
      // Fire - recoil
      { time: 0.25, groups: ["body"], transform: { position: [0, 0, -0.05] }, easing: "easeOut" },
      { time: 0.25, groups: ["weapons"], transform: { rotation: [0.1, 0, 0] }, easing: "easeOut" },
      { time: 0.25, groups: ["sensors"], transform: { scale: [1.1, 1.1, 1.1] }, easing: "easeOut" },
      // Recover
      { time: 0.45, groups: ["body"], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
      { time: 0.6, groups: ["weapons"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 0.6, groups: ["sensors"], transform: { scale: [1, 1, 1] }, easing: "easeOut" },
    ]
  }),
  
  // ========== SPIRIT ANIMATIONS (core, body, head, orbs, trails, arms) ==========
  float: () => ({
    id: "float",
    name: "Float (Spirit)",
    duration: 3,
    loop: true,
    keyframes: [
      { time: 0, groups: ["body"], transform: { position: [0, 0, 0], rotation: [0, 0, 0.05] }, easing: "easeInOut" },
      { time: 0, groups: ["orbs"], transform: { rotation: [0, 0, 0] }, easing: "linear" },
      { time: 0, groups: ["trails"], transform: { scale: [1, 1, 1] }, easing: "easeInOut" },
      { time: 0.75, groups: ["body"], transform: { position: [0.05, 0.1, 0], rotation: [0, 0, -0.05] }, easing: "easeInOut" },
      { time: 0.75, groups: ["orbs"], transform: { rotation: [0, Math.PI * 0.5, 0] }, easing: "linear" },
      { time: 0.75, groups: ["trails"], transform: { scale: [1.1, 0.9, 1.1] }, easing: "easeInOut" },
      { time: 1.5, groups: ["body"], transform: { position: [0, 0.15, 0], rotation: [0, 0, 0.05] }, easing: "easeInOut" },
      { time: 1.5, groups: ["orbs"], transform: { rotation: [0, Math.PI, 0] }, easing: "linear" },
      { time: 1.5, groups: ["trails"], transform: { scale: [1, 1.1, 1] }, easing: "easeInOut" },
      { time: 2.25, groups: ["body"], transform: { position: [-0.05, 0.1, 0], rotation: [0, 0, -0.05] }, easing: "easeInOut" },
      { time: 2.25, groups: ["orbs"], transform: { rotation: [0, Math.PI * 1.5, 0] }, easing: "linear" },
      { time: 2.25, groups: ["trails"], transform: { scale: [1.1, 0.9, 1.1] }, easing: "easeInOut" },
      { time: 3, groups: ["body"], transform: { position: [0, 0, 0], rotation: [0, 0, 0.05] }, easing: "easeInOut" },
      { time: 3, groups: ["orbs"], transform: { rotation: [0, Math.PI * 2, 0] }, easing: "linear" },
      { time: 3, groups: ["trails"], transform: { scale: [1, 1, 1] }, easing: "easeInOut" },
    ]
  }),
  
  spiritAttack: () => ({
    id: "spiritAttack",
    name: "Attack (Spirit)",
    duration: 0.8,
    loop: false,
    keyframes: [
      // Gather energy
      { time: 0, groups: ["core"], transform: { scale: [1, 1, 1] }, easing: "easeIn" },
      { time: 0, groups: ["orbs"], transform: { position: [0, 0, 0] }, easing: "easeIn" },
      { time: 0, groups: ["arms"], transform: { rotation: [0, 0, -0.3] }, easing: "easeIn" },
      // Charge up
      { time: 0.25, groups: ["core"], transform: { scale: [1.3, 1.3, 1.3] }, easing: "easeOut" },
      { time: 0.25, groups: ["orbs"], transform: { position: [0, 0, -0.1] }, easing: "easeOut" },
      { time: 0.25, groups: ["arms"], transform: { rotation: [0, 0, -0.5] }, easing: "easeOut" },
      // Release
      { time: 0.4, groups: ["core"], transform: { scale: [0.8, 0.8, 0.8] }, easing: "easeIn" },
      { time: 0.4, groups: ["orbs"], transform: { position: [0, 0, 0.3] }, easing: "easeIn" },
      { time: 0.4, groups: ["arms"], transform: { rotation: [0, 0, 0.3] }, easing: "easeIn" },
      // Recover
      { time: 0.8, groups: ["core"], transform: { scale: [1, 1, 1] }, easing: "easeOut" },
      { time: 0.8, groups: ["orbs"], transform: { position: [0, 0, 0] }, easing: "easeOut" },
      { time: 0.8, groups: ["arms"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
    ]
  }),
  
  phase: () => ({
    id: "phase",
    name: "Phase (Spirit)",
    duration: 1.0,
    loop: false,
    keyframes: [
      // Begin phase
      { time: 0, groups: ["body"], transform: { scale: [1, 1, 1] }, easing: "easeIn" },
      { time: 0, groups: ["trails"], transform: { scale: [1, 1, 1] }, easing: "easeIn" },
      // Fade out
      { time: 0.3, groups: ["body"], transform: { scale: [1.2, 1.2, 1.2] }, easing: "easeOut" },
      { time: 0.3, groups: ["trails"], transform: { scale: [1.5, 1.5, 1.5] }, easing: "easeOut" },
      // Teleport (invisible moment)
      { time: 0.5, groups: ["body"], transform: { scale: [0.1, 0.1, 0.1] }, easing: "easeIn" },
      { time: 0.5, groups: ["trails"], transform: { scale: [0.1, 0.1, 0.1] }, easing: "easeIn" },
      // Reappear
      { time: 0.7, groups: ["body"], transform: { scale: [1.1, 1.1, 1.1] }, easing: "easeOut" },
      { time: 0.7, groups: ["trails"], transform: { scale: [1.3, 1.3, 1.3] }, easing: "easeOut" },
      // Settle
      { time: 1.0, groups: ["body"], transform: { scale: [1, 1, 1] }, easing: "easeInOut" },
      { time: 1.0, groups: ["trails"], transform: { scale: [1, 1, 1] }, easing: "easeInOut" },
    ]
  }),
  
  // ========== PROP ANIMATIONS (light, screen, hologram, effects) ==========
  flicker: () => ({
    id: "flicker",
    name: "Flicker (Props)",
    duration: 0.5,
    loop: true,
    keyframes: [
      { time: 0, groups: ["light", "screen", "hologram"], transform: { scale: [1, 1, 1] }, easing: "linear" },
      { time: 0.1, groups: ["light", "screen", "hologram"], transform: { scale: [0.95, 0.95, 0.95] }, easing: "linear" },
      { time: 0.15, groups: ["light", "screen", "hologram"], transform: { scale: [1.02, 1.02, 1.02] }, easing: "linear" },
      { time: 0.2, groups: ["light", "screen", "hologram"], transform: { scale: [0.98, 0.98, 0.98] }, easing: "linear" },
      { time: 0.35, groups: ["light", "screen", "hologram"], transform: { scale: [1, 1, 1] }, easing: "linear" },
      { time: 0.4, groups: ["light", "screen", "hologram"], transform: { scale: [0.9, 0.9, 0.9] }, easing: "linear" },
      { time: 0.5, groups: ["light", "screen", "hologram"], transform: { scale: [1, 1, 1] }, easing: "linear" },
    ]
  }),
  
  hologramPulse: () => ({
    id: "hologramPulse",
    name: "Pulse (Hologram)",
    duration: 2,
    loop: true,
    keyframes: [
      { time: 0, groups: ["hologram", "content"], transform: { scale: [1, 1, 1], position: [0, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["effects"], transform: { rotation: [0, 0, 0] }, easing: "linear" },
      { time: 0.5, groups: ["hologram", "content"], transform: { scale: [1.05, 1.05, 1.05], position: [0, 0.02, 0] }, easing: "easeInOut" },
      { time: 0.5, groups: ["effects"], transform: { rotation: [0, Math.PI * 0.5, 0] }, easing: "linear" },
      { time: 1, groups: ["hologram", "content"], transform: { scale: [1, 1, 1], position: [0, 0.04, 0] }, easing: "easeInOut" },
      { time: 1, groups: ["effects"], transform: { rotation: [0, Math.PI, 0] }, easing: "linear" },
      { time: 1.5, groups: ["hologram", "content"], transform: { scale: [1.05, 1.05, 1.05], position: [0, 0.02, 0] }, easing: "easeInOut" },
      { time: 1.5, groups: ["effects"], transform: { rotation: [0, Math.PI * 1.5, 0] }, easing: "linear" },
      { time: 2, groups: ["hologram", "content"], transform: { scale: [1, 1, 1], position: [0, 0, 0] }, easing: "easeInOut" },
      { time: 2, groups: ["effects"], transform: { rotation: [0, Math.PI * 2, 0] }, easing: "linear" },
    ]
  }),
  
  // ========== MECH ANIMATIONS (head, body, arms, legs, weapons) ==========
  mechIdle: () => ({
    id: "mechIdle",
    name: "Idle (Mech)",
    duration: 2.5,
    loop: true,
    keyframes: [
      // Slow hydraulic hum
      { time: 0, groups: ["body"], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["head"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["weapons"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["arms"], transform: { rotation: [0.02, 0, 0] }, easing: "easeInOut" },
      // Slight sway
      { time: 0.8, groups: ["body"], transform: { position: [0, 0.02, 0] }, easing: "easeInOut" },
      { time: 0.8, groups: ["head"], transform: { rotation: [0, 0.05, 0] }, easing: "easeInOut" },
      { time: 0.8, groups: ["weapons"], transform: { rotation: [0.01, 0, 0] }, easing: "easeInOut" },
      // Scan
      { time: 1.6, groups: ["head"], transform: { rotation: [0, -0.05, 0] }, easing: "easeInOut" },
      { time: 1.6, groups: ["body"], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
      { time: 1.6, groups: ["arms"], transform: { rotation: [-0.02, 0, 0] }, easing: "easeInOut" },
      // Return
      { time: 2.5, groups: ["body"], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
      { time: 2.5, groups: ["head"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
      { time: 2.5, groups: ["weapons"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
      { time: 2.5, groups: ["arms"], transform: { rotation: [0.02, 0, 0] }, easing: "easeInOut" },
    ]
  }),
  
  mechWalk: () => ({
    id: "mechWalk",
    name: "Walk (Mech)",
    duration: 1.2,
    loop: true,
    keyframes: [
      // Heavy footstep left
      { time: 0, groups: ["legs"], transform: { rotation: [0.2, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["body"], transform: { position: [0, 0.05, 0], rotation: [0, 0, 0.02] }, easing: "easeOut" },
      { time: 0, groups: ["arms"], transform: { rotation: [-0.15, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["head"], transform: { rotation: [0.02, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["weapons"], transform: { rotation: [0.03, 0, 0] }, easing: "easeInOut" },
      // Impact
      { time: 0.15, groups: ["body"], transform: { position: [0, -0.03, 0], rotation: [0, 0, 0.02] }, easing: "easeIn" },
      // Lift right
      { time: 0.3, groups: ["body"], transform: { position: [0, 0.02, 0], rotation: [0, 0, 0] }, easing: "easeOut" },
      // Heavy footstep right
      { time: 0.6, groups: ["legs"], transform: { rotation: [-0.2, 0, 0] }, easing: "easeInOut" },
      { time: 0.6, groups: ["body"], transform: { position: [0, 0.05, 0], rotation: [0, 0, -0.02] }, easing: "easeOut" },
      { time: 0.6, groups: ["arms"], transform: { rotation: [0.15, 0, 0] }, easing: "easeInOut" },
      { time: 0.6, groups: ["head"], transform: { rotation: [0.02, 0, 0] }, easing: "easeInOut" },
      { time: 0.6, groups: ["weapons"], transform: { rotation: [-0.03, 0, 0] }, easing: "easeInOut" },
      // Impact
      { time: 0.75, groups: ["body"], transform: { position: [0, -0.03, 0], rotation: [0, 0, -0.02] }, easing: "easeIn" },
      // Lift left
      { time: 0.9, groups: ["body"], transform: { position: [0, 0.02, 0], rotation: [0, 0, 0] }, easing: "easeOut" },
      // Loop
      { time: 1.2, groups: ["legs"], transform: { rotation: [0.2, 0, 0] }, easing: "easeInOut" },
      { time: 1.2, groups: ["body"], transform: { position: [0, 0.05, 0], rotation: [0, 0, 0.02] }, easing: "easeOut" },
      { time: 1.2, groups: ["arms"], transform: { rotation: [-0.15, 0, 0] }, easing: "easeInOut" },
      { time: 1.2, groups: ["weapons"], transform: { rotation: [0.03, 0, 0] }, easing: "easeInOut" },
    ]
  }),
  
  mechAttack: () => ({
    id: "mechAttack",
    name: "Attack (Mech)",
    duration: 1.0,
    loop: false,
    keyframes: [
      // Lock on target
      { time: 0, groups: ["head"], transform: { rotation: [0.1, 0, 0] }, easing: "easeOut" },
      { time: 0, groups: ["weapons"], transform: { rotation: [-0.15, 0, 0] }, easing: "easeOut" },
      { time: 0, groups: ["body"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 0, groups: ["legs"], transform: { rotation: [0.1, 0, 0] }, easing: "easeOut" },
      { time: 0, groups: ["arms"], transform: { rotation: [-0.2, 0, -0.1] }, easing: "easeOut" },
      // Charge weapons
      { time: 0.2, groups: ["weapons"], transform: { rotation: [-0.2, 0, 0], scale: [1.05, 1.05, 1.05] }, easing: "easeIn" },
      { time: 0.2, groups: ["body"], transform: { rotation: [-0.05, 0, 0] }, easing: "easeIn" },
      // Fire - recoil
      { time: 0.35, groups: ["weapons"], transform: { rotation: [0.2, 0, 0], scale: [1, 1, 1] }, easing: "easeOut" },
      { time: 0.35, groups: ["body"], transform: { position: [0, 0, -0.08], rotation: [-0.1, 0, 0] }, easing: "easeOut" },
      { time: 0.35, groups: ["arms"], transform: { rotation: [0.3, 0, 0.1] }, easing: "easeOut" },
      { time: 0.35, groups: ["head"], transform: { rotation: [-0.05, 0, 0] }, easing: "easeOut" },
      // Recover
      { time: 0.6, groups: ["body"], transform: { position: [0, 0, -0.03], rotation: [-0.03, 0, 0] }, easing: "easeInOut" },
      { time: 0.6, groups: ["weapons"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
      // Return
      { time: 1.0, groups: ["body"], transform: { position: [0, 0, 0], rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 1.0, groups: ["head"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 1.0, groups: ["weapons"], transform: { rotation: [0, 0, 0], scale: [1, 1, 1] }, easing: "easeOut" },
      { time: 1.0, groups: ["arms"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 1.0, groups: ["legs"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
    ]
  }),
  
  // ========== GOLEM ANIMATIONS (head, body, arms, legs, shoulders, shards) ==========
  golemIdle: () => ({
    id: "golemIdle",
    name: "Idle (Golem)",
    duration: 3,
    loop: true,
    keyframes: [
      // Crystal resonance
      { time: 0, groups: ["body"], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["shards"], transform: { scale: [1, 1, 1], rotation: [0, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["shoulders"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["head"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["arms"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
      // Pulse
      { time: 0.75, groups: ["shards"], transform: { scale: [1.1, 1.15, 1.1], rotation: [0, 0.05, 0] }, easing: "easeInOut" },
      { time: 0.75, groups: ["body"], transform: { position: [0, 0.02, 0] }, easing: "easeInOut" },
      { time: 0.75, groups: ["shoulders"], transform: { rotation: [0, 0, 0.02] }, easing: "easeInOut" },
      // Settle
      { time: 1.5, groups: ["shards"], transform: { scale: [1, 1, 1], rotation: [0, 0, 0] }, easing: "easeInOut" },
      { time: 1.5, groups: ["body"], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
      { time: 1.5, groups: ["head"], transform: { rotation: [0, 0.03, 0] }, easing: "easeInOut" },
      // Pulse again
      { time: 2.25, groups: ["shards"], transform: { scale: [1.08, 1.12, 1.08], rotation: [0, -0.05, 0] }, easing: "easeInOut" },
      { time: 2.25, groups: ["body"], transform: { position: [0, 0.015, 0] }, easing: "easeInOut" },
      { time: 2.25, groups: ["shoulders"], transform: { rotation: [0, 0, -0.02] }, easing: "easeInOut" },
      // Return
      { time: 3, groups: ["body"], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
      { time: 3, groups: ["shards"], transform: { scale: [1, 1, 1], rotation: [0, 0, 0] }, easing: "easeInOut" },
      { time: 3, groups: ["shoulders"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
      { time: 3, groups: ["head"], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
    ]
  }),
  
  golemWalk: () => ({
    id: "golemWalk",
    name: "Walk (Golem)",
    duration: 1.4,
    loop: true,
    keyframes: [
      // Massive step left - shards and shoulders react
      { time: 0, groups: ["legs"], transform: { rotation: [0.2, 0, 0] }, easing: "easeInOut" },
      { time: 0, groups: ["body"], transform: { position: [0, 0.06, 0], rotation: [0, 0, 0.03] }, easing: "easeOut" },
      { time: 0, groups: ["arms"], transform: { rotation: [-0.15, 0, 0.1] }, easing: "easeInOut" },
      { time: 0, groups: ["shoulders"], transform: { rotation: [0, 0, 0.05] }, easing: "easeInOut" },
      { time: 0, groups: ["shards"], transform: { rotation: [0, 0.02, 0.02] }, easing: "easeInOut" },
      { time: 0, groups: ["head"], transform: { rotation: [0, 0, -0.02] }, easing: "easeInOut" },
      // Stomp impact
      { time: 0.2, groups: ["body"], transform: { position: [0, -0.05, 0], rotation: [0, 0, 0.03] }, easing: "easeIn" },
      { time: 0.2, groups: ["shards"], transform: { scale: [1.05, 0.95, 1.05], rotation: [0.02, 0.02, 0.02] }, easing: "easeIn" },
      // Recover
      { time: 0.35, groups: ["body"], transform: { position: [0, 0.02, 0], rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 0.35, groups: ["shards"], transform: { scale: [1, 1, 1], rotation: [0, 0, 0] }, easing: "easeOut" },
      // Massive step right
      { time: 0.7, groups: ["legs"], transform: { rotation: [-0.2, 0, 0] }, easing: "easeInOut" },
      { time: 0.7, groups: ["body"], transform: { position: [0, 0.06, 0], rotation: [0, 0, -0.03] }, easing: "easeOut" },
      { time: 0.7, groups: ["arms"], transform: { rotation: [0.15, 0, -0.1] }, easing: "easeInOut" },
      { time: 0.7, groups: ["shoulders"], transform: { rotation: [0, 0, -0.05] }, easing: "easeInOut" },
      { time: 0.7, groups: ["shards"], transform: { rotation: [0, -0.02, -0.02] }, easing: "easeInOut" },
      { time: 0.7, groups: ["head"], transform: { rotation: [0, 0, 0.02] }, easing: "easeInOut" },
      // Stomp impact
      { time: 0.9, groups: ["body"], transform: { position: [0, -0.05, 0], rotation: [0, 0, -0.03] }, easing: "easeIn" },
      { time: 0.9, groups: ["shards"], transform: { scale: [1.05, 0.95, 1.05], rotation: [-0.02, -0.02, -0.02] }, easing: "easeIn" },
      // Recover
      { time: 1.05, groups: ["body"], transform: { position: [0, 0.02, 0], rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 1.05, groups: ["shards"], transform: { scale: [1, 1, 1], rotation: [0, 0, 0] }, easing: "easeOut" },
      // Loop
      { time: 1.4, groups: ["legs"], transform: { rotation: [0.2, 0, 0] }, easing: "easeInOut" },
      { time: 1.4, groups: ["body"], transform: { position: [0, 0.06, 0], rotation: [0, 0, 0.03] }, easing: "easeOut" },
      { time: 1.4, groups: ["arms"], transform: { rotation: [-0.15, 0, 0.1] }, easing: "easeInOut" },
      { time: 1.4, groups: ["shoulders"], transform: { rotation: [0, 0, 0.05] }, easing: "easeInOut" },
      { time: 1.4, groups: ["shards"], transform: { rotation: [0, 0.02, 0.02] }, easing: "easeInOut" },
    ]
  }),
  
  golemAttack: () => ({
    id: "golemAttack",
    name: "Attack (Golem)",
    duration: 1.2,
    loop: false,
    keyframes: [
      // Wind up - crystals charge
      { time: 0, groups: ["arms"], transform: { rotation: [-0.4, 0, -0.3] }, easing: "easeOut" },
      { time: 0, groups: ["shoulders"], transform: { rotation: [-0.1, 0, -0.1] }, easing: "easeOut" },
      { time: 0, groups: ["shards"], transform: { scale: [1, 1, 1] }, easing: "easeOut" },
      { time: 0, groups: ["body"], transform: { rotation: [0, -0.2, 0] }, easing: "easeOut" },
      { time: 0, groups: ["head"], transform: { rotation: [0.1, 0.1, 0] }, easing: "easeOut" },
      { time: 0, groups: ["legs"], transform: { rotation: [0.1, 0, 0] }, easing: "easeOut" },
      // Charge crystals
      { time: 0.25, groups: ["shards"], transform: { scale: [1.2, 1.3, 1.2] }, easing: "easeIn" },
      { time: 0.25, groups: ["shoulders"], transform: { rotation: [-0.15, 0, -0.15] }, easing: "easeIn" },
      // Slam down
      { time: 0.45, groups: ["arms"], transform: { rotation: [0.6, 0, 0.2] }, easing: "easeIn" },
      { time: 0.45, groups: ["shoulders"], transform: { rotation: [0.2, 0, 0.1] }, easing: "easeIn" },
      { time: 0.45, groups: ["body"], transform: { rotation: [0.15, 0.1, 0], position: [0, -0.1, 0.1] }, easing: "easeIn" },
      { time: 0.45, groups: ["head"], transform: { rotation: [-0.1, 0, 0] }, easing: "easeIn" },
      { time: 0.45, groups: ["legs"], transform: { rotation: [-0.15, 0, 0] }, easing: "easeIn" },
      // Impact - shards explode outward
      { time: 0.55, groups: ["shards"], transform: { scale: [1.4, 0.7, 1.4] }, easing: "easeOut" },
      { time: 0.55, groups: ["body"], transform: { position: [0, -0.15, 0.1] }, easing: "easeOut" },
      // Recover
      { time: 0.8, groups: ["shards"], transform: { scale: [1.1, 1, 1.1] }, easing: "easeInOut" },
      { time: 0.8, groups: ["body"], transform: { rotation: [0, 0, 0], position: [0, -0.05, 0] }, easing: "easeInOut" },
      { time: 0.8, groups: ["arms"], transform: { rotation: [0.1, 0, 0] }, easing: "easeInOut" },
      // Return
      { time: 1.2, groups: ["arms"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 1.2, groups: ["shoulders"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 1.2, groups: ["shards"], transform: { scale: [1, 1, 1] }, easing: "easeOut" },
      { time: 1.2, groups: ["body"], transform: { rotation: [0, 0, 0], position: [0, 0, 0] }, easing: "easeOut" },
      { time: 1.2, groups: ["head"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 1.2, groups: ["legs"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
    ]
  }),
  
  golemRoar: () => ({
    id: "golemRoar",
    name: "Roar (Golem)",
    duration: 1.4,
    loop: false,
    keyframes: [
      // Build up - crystals pulse
      { time: 0, groups: ["body"], transform: { scale: [1, 1, 1] }, easing: "linear" },
      { time: 0, groups: ["shards"], transform: { scale: [1, 1, 1] }, easing: "linear" },
      { time: 0, groups: ["shoulders"], transform: { rotation: [0, 0, 0] }, easing: "linear" },
      { time: 0, groups: ["head"], transform: { rotation: [0, 0, 0] }, easing: "linear" },
      { time: 0, groups: ["arms"], transform: { rotation: [0, 0, 0] }, easing: "linear" },
      // Inhale - crouch
      { time: 0.25, groups: ["body"], transform: { scale: [1.05, 0.95, 1.05], position: [0, -0.05, 0] }, easing: "easeOut" },
      { time: 0.25, groups: ["shoulders"], transform: { rotation: [0.1, 0, 0.1] }, easing: "easeOut" },
      { time: 0.25, groups: ["shards"], transform: { scale: [0.9, 1.1, 0.9] }, easing: "easeOut" },
      { time: 0.25, groups: ["head"], transform: { rotation: [-0.2, 0, 0] }, easing: "easeOut" },
      // ROAR - expand
      { time: 0.45, groups: ["body"], transform: { scale: [1.15, 1.1, 1.15], position: [0, 0.05, 0] }, easing: "easeIn" },
      { time: 0.45, groups: ["shoulders"], transform: { rotation: [-0.2, 0, -0.15] }, easing: "easeIn" },
      { time: 0.45, groups: ["shards"], transform: { scale: [1.4, 1.4, 1.4] }, easing: "easeIn" },
      { time: 0.45, groups: ["head"], transform: { rotation: [0.35, 0, 0] }, easing: "easeIn" },
      { time: 0.45, groups: ["arms"], transform: { rotation: [0, 0, -0.4] }, easing: "easeIn" },
      // Hold roar
      { time: 0.8, groups: ["shards"], transform: { scale: [1.35, 1.35, 1.35] }, easing: "linear" },
      { time: 0.8, groups: ["head"], transform: { rotation: [0.3, 0, 0] }, easing: "linear" },
      { time: 0.8, groups: ["body"], transform: { scale: [1.12, 1.08, 1.12] }, easing: "linear" },
      // Settle
      { time: 1.1, groups: ["shards"], transform: { scale: [1.1, 1.1, 1.1] }, easing: "easeOut" },
      { time: 1.1, groups: ["body"], transform: { scale: [1.02, 1.02, 1.02], position: [0, 0, 0] }, easing: "easeOut" },
      { time: 1.1, groups: ["head"], transform: { rotation: [0.1, 0, 0] }, easing: "easeOut" },
      { time: 1.1, groups: ["arms"], transform: { rotation: [0, 0, -0.1] }, easing: "easeOut" },
      // Return
      { time: 1.4, groups: ["body"], transform: { scale: [1, 1, 1], position: [0, 0, 0] }, easing: "easeOut" },
      { time: 1.4, groups: ["shards"], transform: { scale: [1, 1, 1] }, easing: "easeOut" },
      { time: 1.4, groups: ["shoulders"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 1.4, groups: ["head"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
      { time: 1.4, groups: ["arms"], transform: { rotation: [0, 0, 0] }, easing: "easeOut" },
    ]
  }),
}

// ============================================
// EASING FUNCTIONS
// ============================================

export const EASING_FUNCTIONS: Record<EasingFunction, (t: number) => number> = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => t * (2 - t),
  easeInOut: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  bounce: (t) => {
    const n1 = 7.5625
    const d1 = 2.75
    if (t < 1 / d1) return n1 * t * t
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375
    return n1 * (t -= 2.625 / d1) * t + 0.984375
  },
  elastic: (t) => {
    if (t === 0 || t === 1) return t
    return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI)
  }
}

// ============================================
// ANIMATION UTILITIES
// ============================================

/**
 * Create a new empty animation clip
 */
export function createAnimationClip(name: string, duration: number = 1): AnimationClip {
  return {
    id: name.toLowerCase().replace(/\s+/g, "_"),
    name,
    duration,
    loop: true,
    keyframes: []
  }
}

/**
 * Add a keyframe to an animation clip
 */
export function addKeyframe(
  clip: AnimationClip,
  time: number,
  groups: string[],
  transform: Transform,
  easing: EasingFunction = "easeInOut"
): AnimationClip {
  const keyframe: Keyframe = { time, groups, transform, easing }
  const keyframes = [...clip.keyframes, keyframe].sort((a, b) => a.time - b.time)
  return { ...clip, keyframes }
}

/**
 * Get transform at a specific time in the animation
 */
export function getTransformAtTime(
  clip: AnimationClip,
  group: string,
  time: number
): Transform {
  // Normalize time for looping
  let normalizedTime = time
  if (clip.loop && time > clip.duration) {
    normalizedTime = time % clip.duration
  } else if (time > clip.duration) {
    normalizedTime = clip.duration
  }
  
  // Find keyframes for this group
  const groupKeyframes = clip.keyframes.filter(
    kf => kf.groups.length === 0 || kf.groups.includes(group)
  )
  
  if (groupKeyframes.length === 0) {
    return {}
  }
  
  // Find surrounding keyframes
  let prevKeyframe: Keyframe | null = null
  let nextKeyframe: Keyframe | null = null
  
  for (const kf of groupKeyframes) {
    if (kf.time <= normalizedTime) {
      prevKeyframe = kf
    }
    if (kf.time > normalizedTime && !nextKeyframe) {
      nextKeyframe = kf
    }
  }
  
  // If no previous keyframe, use first
  if (!prevKeyframe) {
    prevKeyframe = groupKeyframes[0]
  }
  
  // If no next keyframe, return previous transform
  if (!nextKeyframe) {
    return prevKeyframe.transform
  }
  
  // Interpolate between keyframes
  const duration = nextKeyframe.time - prevKeyframe.time
  const elapsed = normalizedTime - prevKeyframe.time
  const rawT = duration > 0 ? elapsed / duration : 1
  const easingFn = EASING_FUNCTIONS[nextKeyframe.easing]
  const t = easingFn(rawT)
  
  return interpolateTransform(prevKeyframe.transform, nextKeyframe.transform, t)
}

/**
 * Interpolate between two transforms
 */
function interpolateTransform(a: Transform, b: Transform, t: number): Transform {
  const result: Transform = {}
  
  if (a.position || b.position) {
    const ap = a.position || [0, 0, 0]
    const bp = b.position || [0, 0, 0]
    result.position = [
      ap[0] + (bp[0] - ap[0]) * t,
      ap[1] + (bp[1] - ap[1]) * t,
      ap[2] + (bp[2] - ap[2]) * t
    ]
  }
  
  if (a.rotation || b.rotation) {
    const ar = a.rotation || [0, 0, 0]
    const br = b.rotation || [0, 0, 0]
    result.rotation = [
      ar[0] + (br[0] - ar[0]) * t,
      ar[1] + (br[1] - ar[1]) * t,
      ar[2] + (br[2] - ar[2]) * t
    ]
  }
  
  if (a.scale || b.scale) {
    const as = a.scale || [1, 1, 1]
    const bs = b.scale || [1, 1, 1]
    result.scale = [
      as[0] + (bs[0] - as[0]) * t,
      as[1] + (bs[1] - as[1]) * t,
      as[2] + (bs[2] - as[2]) * t
    ]
  }
  
  return result
}

/**
 * Export animation clip to JSON
 */
export function exportAnimationClip(clip: AnimationClip): string {
  return JSON.stringify(clip, null, 2)
}

/**
 * Export animation set to JSON
 */
export function exportAnimationSet(set: AnimationSet): string {
  return JSON.stringify(set, null, 2)
}

/**
 * Import animation clip from JSON
 */
export function importAnimationClip(json: string): AnimationClip {
  return JSON.parse(json)
}

// Generic interface that accepts any object with boxes containing group property
interface VoxelModelLike {
  boxes: Array<{ group?: string }>
  groups?: string[]
}

/**
 * Detect model type from voxel model groups
 */
export function detectModelType(voxelModel: VoxelModelLike): ModelType {
  const groups = new Set(voxelModel.boxes.map(v => v.group).filter(Boolean) as string[])
  
  // Check for specific group combinations
  if (groups.has("rotors") || groups.has("sensors")) {
    return "drone"
  }
  if (groups.has("core") || groups.has("orbs") || groups.has("trails")) {
    return "spirit"
  }
  if (groups.has("tail")) {
    return "beast"
  }
  if (groups.has("hologram") || groups.has("projector") || groups.has("screen") || groups.has("pole")) {
    return "prop"
  }
  // Distinguish between mech (has weapons), golem (has shards/shoulders), and humanoid
  if (groups.has("shards") || groups.has("shoulders")) {
    return "golem"
  }
  if (groups.has("weapons")) {
    return "mech"
  }
  if (groups.has("arms") || groups.has("legs")) {
    return "humanoid"
  }
  
  return "generic"
}

/**
 * Get recommended animations for a model type
 */
export function getRecommendedAnimations(modelType: ModelType): string[] {
  switch (modelType) {
    case "humanoid":
      return ["idle", "walk", "run", "attack", "hit", "death", "jump", "spin"]
    case "mech":
      return ["mechIdle", "mechWalk", "mechAttack", "hit", "death", "spin"]
    case "golem":
      return ["golemIdle", "golemWalk", "golemAttack", "golemRoar", "hit", "death"]
    case "beast":
      return ["idle", "roar", "prowl", "pounce", "tailSwipe", "hit", "death"]
    case "drone":
      return ["hover", "scan", "droneAttack", "hit", "death", "spin"]
    case "spirit":
      return ["float", "spiritAttack", "phase", "hit", "death"]
    case "prop":
      return ["flicker", "hologramPulse"]
    default:
      return ["idle", "hit", "death", "spin"]
  }
}

/**
 * Get all groups present in a voxel model
 */
export function getModelGroups(voxelModel: VoxelModelLike): string[] {
  // First try to use the groups array if defined
  if (voxelModel.groups && voxelModel.groups.length > 0) {
    return [...voxelModel.groups].sort()
  }
  // Otherwise extract from boxes
  const groups = new Set<string>()
  for (const box of voxelModel.boxes) {
    if (box.group) {
      groups.add(box.group)
    }
  }
  return Array.from(groups).sort()
}

/**
 * Validate animation clip against model groups
 * Returns groups referenced in animation that don't exist in model
 */
export function validateAnimationGroups(
  clip: AnimationClip, 
  voxelModel: VoxelModelLike
): string[] {
  const modelGroups = new Set(getModelGroups(voxelModel))
  const missingGroups = new Set<string>()
  
  for (const keyframe of clip.keyframes) {
    for (const group of keyframe.groups) {
      if (!modelGroups.has(group)) {
        missingGroups.add(group)
      }
    }
  }
  
  return Array.from(missingGroups)
}

// ============================================
// DYNAMIC ANIMATION GENERATORS
// ============================================

// ---- SMART GROUP PARSING ----
// Parses group names to understand anatomy: left/right, hierarchy, position

interface ParsedGroup {
  name: string
  baseType: string // body, leg, arm, hand, foot, head, neck, wing, tail, effect, etc.
  side: 'left' | 'right' | 'center' | 'both' // Which side of body
  position: 'front' | 'back' | 'center' // For quadrupeds
  isExtremity: boolean // hand, foot, claw, paw, finger, toe
  isUpper: boolean // upper arm vs forearm, thigh vs calf
  hierarchyLevel: number // 0=body, 1=limb, 2=extremity, 3=digits
}

function parseGroupName(name: string): ParsedGroup {
  const lower = name.toLowerCase()
  
  // Detect side
  let side: ParsedGroup['side'] = 'center'
  if (lower.includes('left') || lower.startsWith('l_') || lower.endsWith('_l') || lower.includes('_l_')) {
    side = 'left'
  } else if (lower.includes('right') || lower.startsWith('r_') || lower.endsWith('_r') || lower.includes('_r_')) {
    side = 'right'
  }
  
  // Detect front/back position (for quadrupeds)
  let position: ParsedGroup['position'] = 'center'
  if (lower.includes('front') || lower.includes('fore')) {
    position = 'front'
  } else if (lower.includes('back') || lower.includes('hind') || lower.includes('rear')) {
    position = 'back'
  }
  
  // Detect extremities
  const isExtremity = /hand|foot|paw|claw|hoof|finger|toe|talon/i.test(lower)
  
  // Detect upper vs lower segments
  const isUpper = /upper|shoulder|thigh|bicep/i.test(lower)
  
  // Determine base type and hierarchy
  let baseType = 'generic'
  let hierarchyLevel = 1
  
  if (/body|torso|core|chest|trunk|pelvis|hip/i.test(lower)) {
    baseType = 'body'
    hierarchyLevel = 0
  } else if (/leg|thigh|calf|shin|knee/i.test(lower)) {
    baseType = 'leg'
    hierarchyLevel = 1
  } else if (/foot|feet|paw|hoof/i.test(lower)) {
    baseType = 'foot'
    hierarchyLevel = 2
  } else if (/toe|talon/i.test(lower)) {
    baseType = 'toe'
    hierarchyLevel = 3
  } else if (/arm|bicep|forearm|elbow/i.test(lower)) {
    baseType = 'arm'
    hierarchyLevel = 1
  } else if (/hand|claw|fist/i.test(lower)) {
    baseType = 'hand'
    hierarchyLevel = 2
  } else if (/finger|digit/i.test(lower)) {
    baseType = 'finger'
    hierarchyLevel = 3
  } else if (/head|face|jaw|snout|muzzle/i.test(lower)) {
    baseType = 'head'
    hierarchyLevel = 1
  } else if (/neck/i.test(lower)) {
    baseType = 'neck'
    hierarchyLevel = 1
  } else if (/wing/i.test(lower)) {
    baseType = 'wing'
    hierarchyLevel = 1
  } else if (/tail/i.test(lower)) {
    baseType = 'tail'
    hierarchyLevel = 1
  } else if (/shoulder/i.test(lower)) {
    baseType = 'shoulder'
    hierarchyLevel = 1
  } else if (/effect|trail|particle|aura|glow|light/i.test(lower)) {
    baseType = 'effect'
    hierarchyLevel = 2
  } else if (/weapon|gun|cannon|blade|sword/i.test(lower)) {
    baseType = 'weapon'
    hierarchyLevel = 2
  } else if (/rotor|propeller/i.test(lower)) {
    baseType = 'rotor'
    hierarchyLevel = 1
  } else if (/sensor|eye|visor/i.test(lower)) {
    baseType = 'sensor'
    hierarchyLevel = 2
  }
  
  return { name, baseType, side, position, isExtremity, isUpper, hierarchyLevel }
}

interface GroupAnalysis {
  hasLeftRight: boolean
  isQuadruped: boolean
  hasWings: boolean
  hasTail: boolean
  hasArms: boolean
  parsed: Map<string, ParsedGroup>
}

function analyzeGroups(groups: string[]): GroupAnalysis {
  const parsed = new Map<string, ParsedGroup>()
  let hasLeft = false, hasRight = false
  let hasFront = false, hasBack = false
  let hasWings = false, hasTail = false, hasArms = false
  
  for (const g of groups) {
    const p = parseGroupName(g)
    parsed.set(g, p)
    if (p.side === 'left') hasLeft = true
    if (p.side === 'right') hasRight = true
    if (p.position === 'front') hasFront = true
    if (p.position === 'back') hasBack = true
    if (p.baseType === 'wing') hasWings = true
    if (p.baseType === 'tail') hasTail = true
    if (p.baseType === 'arm' || p.baseType === 'hand') hasArms = true
  }
  
  return {
    hasLeftRight: hasLeft && hasRight,
    isQuadruped: hasFront && hasBack,
    hasWings,
    hasTail,
    hasArms,
    parsed
  }
}

/**
 * Calculate walk phase for proper limb coordination
 * - Left side starts at 0, right at 0.5
 * - Arms swing opposite to same-side leg
 * - Quadruped: front/back offset by 0.25
 * - Extremities lag slightly for follow-through
 */
function getWalkPhase(parsed: ParsedGroup, analysis: GroupAnalysis): number {
  let phase = 0
  
  // Side offset: left=0, right=0.5
  if (parsed.side === 'right') phase += 0.5
  
  // Quadruped front/back offset
  if (analysis.isQuadruped && parsed.position === 'front') phase += 0.25
  
  // Arms counter-swing: add 0.5 to be opposite of same-side leg
  if (parsed.baseType === 'arm' || parsed.baseType === 'hand' || parsed.baseType === 'finger') {
    phase += 0.5
  }
  
  // Extremities lag slightly for follow-through effect
  if (parsed.isExtremity) phase += 0.05
  if (parsed.hierarchyLevel >= 3) phase += 0.03 // Digits lag even more
  
  return phase % 1
}

/**
 * Get rotation direction multiplier for left/right mirroring
 */
function getRotationDir(parsed: ParsedGroup): { x: number, y: number, z: number } {
  const flip = parsed.side === 'left' ? 1 : -1
  return {
    x: 1, // Pitch same for both sides
    y: flip, // Yaw mirrors
    z: flip // Roll mirrors  
  }
}

// ---- END SMART GROUP PARSING ----

/**
 * Group animation behaviors - how different group types should animate
 */
interface GroupBehavior {
  /** Animation intensity multiplier */
  intensity: number
  /** Primary animation axis: 'x' = pitch, 'y' = yaw, 'z' = roll */
  primaryAxis: 'x' | 'y' | 'z'
  /** Whether this group should bob up/down */
  bobs: boolean
  /** Whether this group should sway side to side */
  sways: boolean
  /** Whether this group should pulse/scale */
  pulses: boolean
  /** Phase offset (0-1) for staggered animations */
  phase: number
  /** Whether this moves opposite to main body */
  counterMotion: boolean
}

/**
 * Get animation behavior for a group based on its name
 */
function getGroupBehavior(groupName: string): GroupBehavior {
  const name = groupName.toLowerCase()
  
  // Core/central groups - subtle movement
  if (name === 'body' || name === 'core' || name === 'torso' || name === 'base') {
    return { intensity: 0.5, primaryAxis: 'y', bobs: true, sways: false, pulses: false, phase: 0, counterMotion: false }
  }
  
  // Head - looks around, bobs
  if (name === 'head' || name === 'face' || name === 'skull') {
    return { intensity: 0.7, primaryAxis: 'y', bobs: true, sways: false, pulses: false, phase: 0.1, counterMotion: false }
  }
  
  // Neck - follows head but less
  if (name === 'neck') {
    return { intensity: 0.4, primaryAxis: 'x', bobs: false, sways: false, pulses: false, phase: 0.05, counterMotion: false }
  }
  
  // Arms/hands - swing opposite to legs
  if (name === 'arms' || name === 'arm' || name === 'hands' || name === 'claws') {
    return { intensity: 0.8, primaryAxis: 'x', bobs: false, sways: false, pulses: false, phase: 0.5, counterMotion: true }
  }
  
  // Legs/feet - primary locomotion
  if (name === 'legs' || name === 'leg' || name === 'feet' || name === 'paws') {
    return { intensity: 1.0, primaryAxis: 'x', bobs: false, sways: false, pulses: false, phase: 0, counterMotion: false }
  }
  
  // Wings - flap up/down
  if (name === 'wings' || name === 'wing') {
    return { intensity: 1.2, primaryAxis: 'z', bobs: false, sways: false, pulses: false, phase: 0.2, counterMotion: false }
  }
  
  // Tail - sways side to side, counter to body
  if (name === 'tail') {
    return { intensity: 0.9, primaryAxis: 'y', bobs: false, sways: true, pulses: false, phase: 0.3, counterMotion: true }
  }
  
  // Shoulders - tilt with body
  if (name === 'shoulders' || name === 'shoulder') {
    return { intensity: 0.4, primaryAxis: 'z', bobs: false, sways: false, pulses: false, phase: 0.15, counterMotion: false }
  }
  
  // Weapons - recoil, aim
  if (name === 'weapons' || name === 'weapon' || name === 'gun' || name === 'cannon') {
    return { intensity: 0.6, primaryAxis: 'x', bobs: false, sways: false, pulses: false, phase: 0.1, counterMotion: false }
  }
  
  // Sensors/eyes - scan around
  if (name === 'sensors' || name === 'eyes' || name === 'eye' || name === 'visor') {
    return { intensity: 0.5, primaryAxis: 'y', bobs: false, sways: false, pulses: true, phase: 0.4, counterMotion: false }
  }
  
  // Rotors/propellers - spin continuously
  if (name === 'rotors' || name === 'rotor' || name === 'propeller') {
    return { intensity: 1.0, primaryAxis: 'y', bobs: false, sways: false, pulses: false, phase: 0, counterMotion: false }
  }
  
  // Crystals/shards/orbs - pulse and float
  if (name === 'shards' || name === 'crystals' || name === 'orbs' || name === 'gems') {
    return { intensity: 0.6, primaryAxis: 'y', bobs: true, sways: false, pulses: true, phase: 0.25, counterMotion: false }
  }
  
  // Trails/effects - flow, pulse
  if (name === 'trails' || name === 'effects' || name === 'particles' || name === 'aura') {
    return { intensity: 0.7, primaryAxis: 'y', bobs: false, sways: true, pulses: true, phase: 0.35, counterMotion: false }
  }
  
  // Lights/glow - pulse
  if (name === 'light' || name === 'lights' || name === 'glow' || name === 'lamp') {
    return { intensity: 0.3, primaryAxis: 'y', bobs: false, sways: false, pulses: true, phase: 0.5, counterMotion: false }
  }
  
  // Screens/holograms - flicker
  if (name === 'screen' || name === 'hologram' || name === 'display') {
    return { intensity: 0.4, primaryAxis: 'y', bobs: true, sways: false, pulses: true, phase: 0.2, counterMotion: false }
  }
  
  // Default behavior for unknown groups
  return { intensity: 0.5, primaryAxis: 'y', bobs: true, sways: false, pulses: false, phase: Math.random() * 0.5, counterMotion: false }
}

/**
 * Generate a dynamic IDLE animation with smart group handling
 * - Breathing motion for body
 * - Subtle look-around for head
 * - Natural arm/leg rest positions
 * - Wings folded, tail gentle sway
 */
export function generateIdleAnimation(groups: string[]): AnimationClip {
  const keyframes: Keyframe[] = []
  const duration = 2.5
  const analysis = analyzeGroups(groups)
  
  for (const group of groups) {
    const parsed = analysis.parsed.get(group)!
    const dir = getRotationDir(parsed)
    
    // Phase offset for variation - use hierarchy and side
    const phaseOffset = (parsed.hierarchyLevel * 0.1 + (parsed.side === 'right' ? 0.15 : 0)) * duration
    
    switch (parsed.baseType) {
      case 'body':
        // Breathing - subtle rise/fall
        keyframes.push(
          { time: 0, groups: [group], transform: { position: [0, 0, 0], scale: [1, 1, 1] }, easing: "easeInOut" },
          { time: duration * 0.5, groups: [group], transform: { position: [0, 0.015, 0], scale: [1.01, 1.01, 1.01] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { position: [0, 0, 0], scale: [1, 1, 1] }, easing: "easeInOut" }
        )
        break
        
      case 'head':
        // Look around subtly
        keyframes.push(
          { time: 0, groups: [group], transform: { rotation: [0, 0.03, 0] }, easing: "easeInOut" },
          { time: duration * 0.35, groups: [group], transform: { rotation: [0.02, -0.02, 0] }, easing: "easeInOut" },
          { time: duration * 0.7, groups: [group], transform: { rotation: [-0.01, 0.04, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0, 0.03, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'neck':
        // Follow head subtly
        keyframes.push(
          { time: 0, groups: [group], transform: { rotation: [0, 0.015, 0] }, easing: "easeInOut" },
          { time: duration * 0.35, groups: [group], transform: { rotation: [0.01, -0.01, 0] }, easing: "easeInOut" },
          { time: duration * 0.7, groups: [group], transform: { rotation: [-0.005, 0.02, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0, 0.015, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'arm':
        // Slight shift at rest
        keyframes.push(
          { time: phaseOffset % duration, groups: [group], transform: { rotation: [0, 0, 0.01 * dir.z] }, easing: "easeInOut" },
          { time: (phaseOffset + duration * 0.5) % duration, groups: [group], transform: { rotation: [0.02, 0, 0.015 * dir.z] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0, 0, 0.01 * dir.z] }, easing: "easeInOut" }
        )
        break
        
      case 'hand':
        // Subtle finger curl
        keyframes.push(
          { time: phaseOffset % duration, groups: [group], transform: { rotation: [0.02, 0, 0] }, easing: "easeInOut" },
          { time: (phaseOffset + duration * 0.5) % duration, groups: [group], transform: { rotation: [0.04, 0, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0.02, 0, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'leg':
        // Very subtle weight shift
        keyframes.push(
          { time: phaseOffset % duration, groups: [group], transform: { rotation: [0, 0, 0.005 * dir.z] }, easing: "easeInOut" },
          { time: (phaseOffset + duration * 0.5) % duration, groups: [group], transform: { rotation: [0, 0, -0.005 * dir.z] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0, 0, 0.005 * dir.z] }, easing: "easeInOut" }
        )
        break
        
      case 'foot':
        // Grounded, minimal motion
        keyframes.push(
          { time: 0, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" },
          { time: duration * 0.5, groups: [group], transform: { rotation: [0.005, 0, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'wing':
        // Folded, slight shift
        keyframes.push(
          { time: 0, groups: [group], transform: { rotation: [0, 0, 0.06 * dir.z] }, easing: "easeInOut" },
          { time: duration * 0.5, groups: [group], transform: { rotation: [0.02, 0, 0.08 * dir.z] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0, 0, 0.06 * dir.z] }, easing: "easeInOut" }
        )
        break
        
      case 'tail':
        // Gentle sway
        keyframes.push(
          { time: 0, groups: [group], transform: { rotation: [0, 0.06, 0] }, easing: "easeInOut" },
          { time: duration * 0.33, groups: [group], transform: { rotation: [0.02, 0, 0] }, easing: "easeInOut" },
          { time: duration * 0.66, groups: [group], transform: { rotation: [0, -0.06, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0, 0.06, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'effect':
        // Pulse gently
        keyframes.push(
          { time: phaseOffset % duration, groups: [group], transform: { scale: [1, 1, 1] }, easing: "easeInOut" },
          { time: (phaseOffset + duration * 0.5) % duration, groups: [group], transform: { scale: [1.05, 1.05, 1.05] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { scale: [1, 1, 1] }, easing: "easeInOut" }
        )
        break
        
      case 'sensor':
        // Scan around
        keyframes.push(
          { time: 0, groups: [group], transform: { rotation: [0, 0.05, 0] }, easing: "easeInOut" },
          { time: duration * 0.5, groups: [group], transform: { rotation: [0, -0.05, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0, 0.05, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'rotor':
        // Spin continuously
        keyframes.push(
          { time: 0, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "linear" },
          { time: duration * 0.25, groups: [group], transform: { rotation: [0, 1.57, 0] }, easing: "linear" },
          { time: duration * 0.5, groups: [group], transform: { rotation: [0, 3.14, 0] }, easing: "linear" },
          { time: duration * 0.75, groups: [group], transform: { rotation: [0, 4.71, 0] }, easing: "linear" },
          { time: duration, groups: [group], transform: { rotation: [0, 6.28, 0] }, easing: "linear" }
        )
        break
        
      default:
        // Generic subtle bob
        keyframes.push(
          { time: phaseOffset % duration, groups: [group], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
          { time: (phaseOffset + duration * 0.5) % duration, groups: [group], transform: { position: [0, 0.01, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { position: [0, 0, 0] }, easing: "easeInOut" }
        )
    }
  }
  
  return {
    id: "idle_dynamic",
    name: "Idle",
    duration,
    loop: true,
    keyframes: keyframes.sort((a, b) => a.time - b.time)
  }
}

/**
 * Generate a dynamic WALK animation with proper limb coordination
 * - Left leg forward + right arm forward (proper walking gait)
 * - Hands follow arms with slight delay
 * - Feet follow legs with ground contact
 */
export function generateWalkAnimation(groups: string[]): AnimationClip {
  const keyframes: Keyframe[] = []
  const duration = 0.8
  const analysis = analyzeGroups(groups)
  
  for (const group of groups) {
    const parsed = analysis.parsed.get(group)!
    const phase = getWalkPhase(parsed, analysis)
    const dir = getRotationDir(parsed)
    
    // Calculate timing based on phase
    const t0 = (phase * duration) % duration
    const t2 = ((phase + 0.5) * duration) % duration
    
    // Intensity scales by hierarchy
    const baseInt = 0.3
    const intensity = baseInt * (parsed.isExtremity ? 1.2 : 1) * (parsed.hierarchyLevel === 0 ? 0.3 : 1)
    
    switch (parsed.baseType) {
      case 'body':
        // Body bobs with each step
        keyframes.push(
          { time: 0, groups: [group], transform: { position: [0, 0.02, 0] }, easing: "easeInOut" },
          { time: duration * 0.25, groups: [group], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
          { time: duration * 0.5, groups: [group], transform: { position: [0, 0.02, 0] }, easing: "easeInOut" },
          { time: duration * 0.75, groups: [group], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { position: [0, 0.02, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'leg':
        // Legs swing forward/back - upper leg swings less
        const legInt = intensity * (parsed.isUpper ? 0.7 : 1)
        keyframes.push(
          { time: t0, groups: [group], transform: { rotation: [legInt, 0, 0] }, easing: "easeInOut" },
          { time: t2, groups: [group], transform: { rotation: [-legInt, 0, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [legInt, 0, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'foot':
        // Feet follow legs with delay, flex on ground contact
        const footPhase = (phase + 0.05) % 1
        const ft0 = (footPhase * duration) % duration
        const ft2 = ((footPhase + 0.5) * duration) % duration
        keyframes.push(
          { time: ft0, groups: [group], transform: { rotation: [-intensity * 0.3, 0, 0] }, easing: "easeInOut" },
          { time: (ft0 + duration * 0.25) % duration, groups: [group], transform: { rotation: [intensity * 0.5, 0, 0] }, easing: "easeOut" },
          { time: ft2, groups: [group], transform: { rotation: [-intensity * 0.2, 0, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [-intensity * 0.3, 0, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'arm':
        // Arms swing opposite to same-side leg (handled in phase calc)
        const armInt = intensity * 0.7
        keyframes.push(
          { time: t0, groups: [group], transform: { rotation: [armInt, 0, 0] }, easing: "easeInOut" },
          { time: t2, groups: [group], transform: { rotation: [-armInt, 0, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [armInt, 0, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'hand':
        // Hands follow arms with wrist flex
        const handPhase = (phase + 0.08) % 1
        const ht0 = (handPhase * duration) % duration
        const ht2 = ((handPhase + 0.5) * duration) % duration
        keyframes.push(
          { time: ht0, groups: [group], transform: { rotation: [intensity * 0.4, 0, 0.02 * dir.z] }, easing: "easeInOut" },
          { time: ht2, groups: [group], transform: { rotation: [-intensity * 0.3, 0, -0.02 * dir.z] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [intensity * 0.4, 0, 0.02 * dir.z] }, easing: "easeInOut" }
        )
        break
        
      case 'head':
        // Head stays stable with slight look-around
        keyframes.push(
          { time: 0, groups: [group], transform: { rotation: [0.01, 0.02, 0] }, easing: "easeInOut" },
          { time: duration * 0.5, groups: [group], transform: { rotation: [0.01, -0.02, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0.01, 0.02, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'neck':
        // Neck follows body slightly
        keyframes.push(
          { time: 0, groups: [group], transform: { rotation: [0.02, 0, 0] }, easing: "easeInOut" },
          { time: duration * 0.5, groups: [group], transform: { rotation: [0.01, 0, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0.02, 0, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'wing':
        // Wings folded during walk, slight shift
        keyframes.push(
          { time: 0, groups: [group], transform: { rotation: [0, 0, 0.08 * dir.z] }, easing: "easeInOut" },
          { time: duration * 0.5, groups: [group], transform: { rotation: [0.02, 0, 0.05 * dir.z] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0, 0, 0.08 * dir.z] }, easing: "easeInOut" }
        )
        break
        
      case 'tail':
        // Tail sways counter to body
        keyframes.push(
          { time: 0, groups: [group], transform: { rotation: [0, 0.1, 0] }, easing: "easeInOut" },
          { time: duration * 0.25, groups: [group], transform: { rotation: [0.03, 0.05, 0] }, easing: "easeInOut" },
          { time: duration * 0.5, groups: [group], transform: { rotation: [0, -0.1, 0] }, easing: "easeInOut" },
          { time: duration * 0.75, groups: [group], transform: { rotation: [0.03, -0.05, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0, 0.1, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'effect':
        // Effects follow body
        keyframes.push(
          { time: 0, groups: [group], transform: { position: [0, 0.01, 0] }, easing: "easeInOut" },
          { time: duration * 0.5, groups: [group], transform: { position: [0, -0.01, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { position: [0, 0.01, 0] }, easing: "easeInOut" }
        )
        break
        
      default:
        // Generic groups - subtle synced motion
        keyframes.push(
          { time: t0, groups: [group], transform: { rotation: [0.02, 0, 0] }, easing: "easeInOut" },
          { time: t2, groups: [group], transform: { rotation: [-0.02, 0, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0.02, 0, 0] }, easing: "easeInOut" }
        )
    }
  }
  
  return {
    id: "walk_dynamic",
    name: "Walk",
    duration,
    loop: true,
    keyframes: keyframes.sort((a, b) => a.time - b.time)
  }
}

/**
 * Generate a dynamic RUN animation with proper limb coordination
 * Like walk but faster, more intense, body leans forward
 */
export function generateRunAnimation(groups: string[]): AnimationClip {
  const keyframes: Keyframe[] = []
  const duration = 0.5
  const analysis = analyzeGroups(groups)
  
  for (const group of groups) {
    const parsed = analysis.parsed.get(group)!
    const phase = getWalkPhase(parsed, analysis)
    const dir = getRotationDir(parsed)
    
    // Calculate timing based on phase
    const t0 = (phase * duration) % duration
    const t2 = ((phase + 0.5) * duration) % duration
    
    // More intense than walk
    const baseInt = 0.5
    const intensity = baseInt * (parsed.isExtremity ? 1.2 : 1) * (parsed.hierarchyLevel === 0 ? 0.4 : 1)
    
    switch (parsed.baseType) {
      case 'body':
        // Body leans forward and bobs more
        keyframes.push(
          { time: 0, groups: [group], transform: { position: [0, 0.06, 0], rotation: [0.1, 0, 0] }, easing: "easeOut" },
          { time: duration * 0.25, groups: [group], transform: { position: [0, 0, 0], rotation: [0.1, 0, 0] }, easing: "easeIn" },
          { time: duration * 0.5, groups: [group], transform: { position: [0, 0.06, 0], rotation: [0.1, 0, 0] }, easing: "easeOut" },
          { time: duration * 0.75, groups: [group], transform: { position: [0, 0, 0], rotation: [0.1, 0, 0] }, easing: "easeIn" },
          { time: duration, groups: [group], transform: { position: [0, 0.06, 0], rotation: [0.1, 0, 0] }, easing: "easeOut" }
        )
        break
        
      case 'leg':
        // Legs pump harder
        const legInt = intensity * (parsed.isUpper ? 0.8 : 1)
        keyframes.push(
          { time: t0, groups: [group], transform: { rotation: [legInt, 0, 0] }, easing: "easeInOut" },
          { time: t2, groups: [group], transform: { rotation: [-legInt, 0, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [legInt, 0, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'foot':
        // Feet kick back more
        const footPhase = (phase + 0.05) % 1
        const ft0 = (footPhase * duration) % duration
        const ft2 = ((footPhase + 0.5) * duration) % duration
        keyframes.push(
          { time: ft0, groups: [group], transform: { rotation: [-intensity * 0.4, 0, 0] }, easing: "easeInOut" },
          { time: (ft0 + duration * 0.25) % duration, groups: [group], transform: { rotation: [intensity * 0.7, 0, 0] }, easing: "easeOut" },
          { time: ft2, groups: [group], transform: { rotation: [-intensity * 0.3, 0, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [-intensity * 0.4, 0, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'arm':
        // Arms pump harder
        const armInt = intensity * 0.8
        keyframes.push(
          { time: t0, groups: [group], transform: { rotation: [armInt, 0, 0] }, easing: "easeInOut" },
          { time: t2, groups: [group], transform: { rotation: [-armInt, 0, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [armInt, 0, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'hand':
        // Hands pump with arms
        const handPhase = (phase + 0.06) % 1
        const ht0 = (handPhase * duration) % duration
        const ht2 = ((handPhase + 0.5) * duration) % duration
        keyframes.push(
          { time: ht0, groups: [group], transform: { rotation: [intensity * 0.5, 0, 0.03 * dir.z] }, easing: "easeInOut" },
          { time: ht2, groups: [group], transform: { rotation: [-intensity * 0.4, 0, -0.03 * dir.z] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [intensity * 0.5, 0, 0.03 * dir.z] }, easing: "easeInOut" }
        )
        break
        
      case 'head':
        // Head stays focused forward
        keyframes.push(
          { time: 0, groups: [group], transform: { rotation: [-0.08, 0, 0] }, easing: "easeInOut" },
          { time: duration * 0.5, groups: [group], transform: { rotation: [-0.05, 0, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [-0.08, 0, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'neck':
        // Neck follows body
        keyframes.push(
          { time: 0, groups: [group], transform: { rotation: [-0.05, 0, 0] }, easing: "easeInOut" },
          { time: duration * 0.5, groups: [group], transform: { rotation: [-0.03, 0, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [-0.05, 0, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'wing':
        // Wings tuck more while running
        keyframes.push(
          { time: 0, groups: [group], transform: { rotation: [0.05, 0, 0.12 * dir.z] }, easing: "easeInOut" },
          { time: duration * 0.5, groups: [group], transform: { rotation: [0.08, 0, 0.08 * dir.z] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0.05, 0, 0.12 * dir.z] }, easing: "easeInOut" }
        )
        break
        
      case 'tail':
        // Tail streams behind
        keyframes.push(
          { time: 0, groups: [group], transform: { rotation: [-0.15, 0.12, 0] }, easing: "easeInOut" },
          { time: duration * 0.5, groups: [group], transform: { rotation: [-0.15, -0.12, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [-0.15, 0.12, 0] }, easing: "easeInOut" }
        )
        break
        
      case 'effect':
        // Effects stream
        keyframes.push(
          { time: 0, groups: [group], transform: { scale: [1.1, 0.9, 1.2] }, easing: "easeInOut" },
          { time: duration * 0.5, groups: [group], transform: { scale: [0.9, 1.1, 1.3] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { scale: [1.1, 0.9, 1.2] }, easing: "easeInOut" }
        )
        break
        
      default:
        // Generic groups - synced motion
        keyframes.push(
          { time: t0, groups: [group], transform: { rotation: [0.04, 0, 0] }, easing: "easeInOut" },
          { time: t2, groups: [group], transform: { rotation: [-0.04, 0, 0] }, easing: "easeInOut" },
          { time: duration, groups: [group], transform: { rotation: [0.04, 0, 0] }, easing: "easeInOut" }
        )
    }
  }
  
  return {
    id: "run_dynamic",
    name: "Run",
    duration,
    loop: true,
    keyframes: keyframes.sort((a, b) => a.time - b.time)
  }
}

/**
 * Generate a dynamic ATTACK animation for any set of groups
 */
export function generateAttackAnimation(groups: string[]): AnimationClip {
  const keyframes: Keyframe[] = []
  const duration = 0.7
  
  for (const group of groups) {
    const behavior = getGroupBehavior(group)
    const intensity = behavior.intensity * 0.6
    
    // Arms/claws strike
    if (group.match(/arm|hand|claw/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [-intensity, 0, -intensity * 0.3] }, easing: "easeOut" },
        { time: duration * 0.3, groups: [group], transform: { rotation: [intensity * 1.2, 0, intensity * 0.2] }, easing: "easeIn" },
        { time: duration * 0.5, groups: [group], transform: { rotation: [intensity * 1.2, 0, intensity * 0.2] }, easing: "linear" },
        { time: duration, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "easeOut" }
      )
    }
    // Weapons fire/swing
    else if (group.match(/weapon|gun|cannon|blade/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [-intensity * 0.3, 0, 0] }, easing: "easeOut" },
        { time: duration * 0.25, groups: [group], transform: { rotation: [-intensity * 0.4, 0, 0], scale: [1.05, 1.05, 1.05] }, easing: "easeIn" },
        { time: duration * 0.35, groups: [group], transform: { rotation: [intensity * 0.3, 0, 0], scale: [1, 1, 1] }, easing: "easeOut" },
        { time: duration, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "easeOut" }
      )
    }
    // Head looks at target
    else if (group.match(/head|face/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [intensity * 0.2, intensity * 0.3, 0] }, easing: "easeOut" },
        { time: duration * 0.3, groups: [group], transform: { rotation: [-intensity * 0.1, intensity * 0.1, 0] }, easing: "easeIn" },
        { time: duration, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "easeOut" }
      )
    }
    // Body lunges
    else if (group.match(/body|torso|core/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, -intensity * 0.3, 0] }, easing: "easeOut" },
        { time: duration * 0.3, groups: [group], transform: { rotation: [intensity * 0.15, intensity * 0.4, 0], position: [0, 0, 0.1] }, easing: "easeIn" },
        { time: duration * 0.5, groups: [group], transform: { rotation: [intensity * 0.1, intensity * 0.3, 0], position: [0, 0, 0.05] }, easing: "linear" },
        { time: duration, groups: [group], transform: { rotation: [0, 0, 0], position: [0, 0, 0] }, easing: "easeOut" }
      )
    }
    // Legs brace
    else if (group.match(/leg|feet|paw/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [intensity * 0.2, 0, 0] }, easing: "easeOut" },
        { time: duration * 0.3, groups: [group], transform: { rotation: [-intensity * 0.2, 0, 0] }, easing: "easeIn" },
        { time: duration, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "easeOut" }
      )
    }
    // Wings flare
    else if (group.match(/wing/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, 0, -intensity * 0.5] }, easing: "easeOut" },
        { time: duration * 0.3, groups: [group], transform: { rotation: [0, 0, intensity * 0.8], scale: [1.1, 1.1, 1] }, easing: "easeIn" },
        { time: duration * 0.5, groups: [group], transform: { rotation: [0, 0, intensity * 0.6], scale: [1.05, 1.05, 1] }, easing: "linear" },
        { time: duration, groups: [group], transform: { rotation: [0, 0, 0], scale: [1, 1, 1] }, easing: "easeOut" }
      )
    }
    // Tail whips
    else if (group.match(/tail/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, intensity * 0.4, 0] }, easing: "easeOut" },
        { time: duration * 0.3, groups: [group], transform: { rotation: [0, -intensity * 0.8, 0] }, easing: "easeIn" },
        { time: duration * 0.5, groups: [group], transform: { rotation: [0, -intensity * 0.5, 0] }, easing: "easeOut" },
        { time: duration, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "easeInOut" }
      )
    }
    // Crystals/effects flare
    else if (group.match(/shard|crystal|orb|effect|aura/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { scale: [1, 1, 1] }, easing: "easeIn" },
        { time: duration * 0.25, groups: [group], transform: { scale: [1.3, 1.3, 1.3] }, easing: "easeOut" },
        { time: duration * 0.4, groups: [group], transform: { scale: [0.9, 0.9, 0.9] }, easing: "easeIn" },
        { time: duration, groups: [group], transform: { scale: [1, 1, 1] }, easing: "easeOut" }
      )
    }
    // Other groups - follow body slightly
    else {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, -intensity * 0.1, 0] }, easing: "easeOut" },
        { time: duration * 0.3, groups: [group], transform: { rotation: [0, intensity * 0.15, 0] }, easing: "easeIn" },
        { time: duration, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "easeOut" }
      )
    }
  }
  
  return {
    id: "attack_dynamic",
    name: "Attack",
    duration,
    loop: false,
    keyframes: keyframes.sort((a, b) => a.time - b.time)
  }
}

/**
 * Generate a dynamic HIT/HURT animation for any set of groups
 */
export function generateHitAnimation(groups: string[]): AnimationClip {
  const keyframes: Keyframe[] = []
  const duration = 0.4
  
  for (const group of groups) {
    const behavior = getGroupBehavior(group)
    const intensity = behavior.intensity * 0.3
    
    // Everything recoils back
    keyframes.push(
      { time: 0, groups: [group], transform: { position: [0, 0, 0], rotation: [0, 0, 0] }, easing: "linear" },
      { time: duration * 0.2, groups: [group], transform: { position: [0, 0, -intensity * 0.3], rotation: [-intensity * 0.5, 0, intensity * 0.2 * (behavior.counterMotion ? -1 : 1)] }, easing: "easeOut" },
      { time: duration * 0.5, groups: [group], transform: { position: [0, 0, -intensity * 0.1], rotation: [-intensity * 0.2, 0, intensity * 0.1 * (behavior.counterMotion ? -1 : 1)] }, easing: "easeInOut" },
      { time: duration, groups: [group], transform: { position: [0, 0, 0], rotation: [0, 0, 0] }, easing: "easeIn" }
    )
  }
  
  return {
    id: "hit_dynamic",
    name: "Hit",
    duration,
    loop: false,
    keyframes: keyframes.sort((a, b) => a.time - b.time)
  }
}

/**
 * Generate a dynamic DEATH animation for any set of groups
 */
export function generateDeathAnimation(groups: string[]): AnimationClip {
  const keyframes: Keyframe[] = []
  const duration = 1.2
  
  for (const group of groups) {
    const behavior = getGroupBehavior(group)
    const randomOffset = behavior.phase * 0.2
    const intensity = behavior.intensity
    
    // Everything collapses
    if (group.match(/body|torso|core/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { position: [0, 0, 0], rotation: [0, 0, 0] }, easing: "linear" },
        { time: duration * 0.3, groups: [group], transform: { position: [0, -0.15, 0], rotation: [-0.3, 0, 0.15] }, easing: "easeOut" },
        { time: duration * 0.6, groups: [group], transform: { position: [0, -0.4, 0.15], rotation: [-0.8, 0, 0.25] }, easing: "easeIn" },
        { time: duration * 0.9, groups: [group], transform: { position: [0, -0.7, 0.25], rotation: [-1.4, 0, 0.3] }, easing: "easeOut" },
        { time: duration, groups: [group], transform: { position: [0, -0.8, 0.3], rotation: [-1.57, 0, 0.3] }, easing: "bounce" }
      )
    }
    // Wings droop
    else if (group.match(/wing/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "linear" },
        { time: duration * 0.3, groups: [group], transform: { rotation: [0.2, 0, intensity * 0.5] }, easing: "easeOut" },
        { time: duration * 0.7, groups: [group], transform: { rotation: [0.4, 0, intensity * 0.8] }, easing: "easeIn" },
        { time: duration, groups: [group], transform: { rotation: [0.5, 0, intensity] }, easing: "easeOut" }
      )
    }
    // Limbs go limp
    else if (group.match(/arm|leg|hand|feet|claw|paw/i)) {
      const dir = behavior.counterMotion ? -1 : 1
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "linear" },
        { time: duration * 0.4, groups: [group], transform: { rotation: [intensity * 0.3 * dir, 0, intensity * 0.2] }, easing: "easeOut" },
        { time: duration, groups: [group], transform: { rotation: [intensity * 0.5 * dir, 0, intensity * 0.4] }, easing: "easeIn" }
      )
    }
    // Head droops
    else if (group.match(/head|neck|face/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "linear" },
        { time: duration * 0.4, groups: [group], transform: { rotation: [intensity * 0.4, 0, intensity * 0.15] }, easing: "easeOut" },
        { time: duration, groups: [group], transform: { rotation: [intensity * 0.7, 0, intensity * 0.2] }, easing: "easeIn" }
      )
    }
    // Tail goes limp
    else if (group.match(/tail/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "linear" },
        { time: duration * 0.5, groups: [group], transform: { rotation: [intensity * 0.4, intensity * 0.2, 0] }, easing: "easeOut" },
        { time: duration, groups: [group], transform: { rotation: [intensity * 0.6, intensity * 0.1, 0] }, easing: "easeIn" }
      )
    }
    // Effects fade/shrink
    else if (group.match(/effect|trail|aura|shard|crystal|orb|glow|light/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { scale: [1, 1, 1] }, easing: "linear" },
        { time: duration * 0.3, groups: [group], transform: { scale: [1.2, 1.2, 1.2] }, easing: "easeOut" },
        { time: duration * 0.7, groups: [group], transform: { scale: [0.5, 0.5, 0.5] }, easing: "easeIn" },
        { time: duration, groups: [group], transform: { scale: [0.1, 0.1, 0.1] }, easing: "easeIn" }
      )
    }
    // Everything else follows body
    else {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "linear" },
        { time: duration * 0.5, groups: [group], transform: { rotation: [intensity * 0.2, 0, intensity * 0.1] }, easing: "easeOut" },
        { time: duration, groups: [group], transform: { rotation: [intensity * 0.4, 0, intensity * 0.2] }, easing: "easeIn" }
      )
    }
  }
  
  return {
    id: "death_dynamic",
    name: "Death",
    duration,
    loop: false,
    keyframes: keyframes.sort((a, b) => a.time - b.time)
  }
}

/**
 * Generate a dynamic ROAR/INTIMIDATE animation for any set of groups
 */
export function generateRoarAnimation(groups: string[]): AnimationClip {
  const keyframes: Keyframe[] = []
  const duration = 1.2
  
  for (const group of groups) {
    const behavior = getGroupBehavior(group)
    const intensity = behavior.intensity * 0.5
    
    // Head rears back then forward
    if (group.match(/head|face/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "linear" },
        { time: duration * 0.2, groups: [group], transform: { rotation: [-intensity * 0.6, 0, 0] }, easing: "easeOut" },
        { time: duration * 0.4, groups: [group], transform: { rotation: [intensity * 0.8, 0, 0] }, easing: "easeIn" },
        { time: duration * 0.7, groups: [group], transform: { rotation: [intensity * 0.7, 0, 0] }, easing: "linear" },
        { time: duration, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "easeOut" }
      )
    }
    // Neck follows head
    else if (group.match(/neck/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "linear" },
        { time: duration * 0.2, groups: [group], transform: { rotation: [-intensity * 0.3, 0, 0] }, easing: "easeOut" },
        { time: duration * 0.4, groups: [group], transform: { rotation: [intensity * 0.4, 0, 0] }, easing: "easeIn" },
        { time: duration * 0.7, groups: [group], transform: { rotation: [intensity * 0.35, 0, 0] }, easing: "linear" },
        { time: duration, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "easeOut" }
      )
    }
    // Body expands
    else if (group.match(/body|torso|core/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { scale: [1, 1, 1] }, easing: "linear" },
        { time: duration * 0.2, groups: [group], transform: { scale: [1.05, 0.95, 1.05], position: [0, -0.05, 0] }, easing: "easeOut" },
        { time: duration * 0.4, groups: [group], transform: { scale: [1.15, 1.1, 1.15], position: [0, 0.05, 0] }, easing: "easeIn" },
        { time: duration * 0.7, groups: [group], transform: { scale: [1.12, 1.08, 1.12] }, easing: "linear" },
        { time: duration, groups: [group], transform: { scale: [1, 1, 1], position: [0, 0, 0] }, easing: "easeOut" }
      )
    }
    // Wings flare wide
    else if (group.match(/wing/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, 0, 0], scale: [1, 1, 1] }, easing: "linear" },
        { time: duration * 0.3, groups: [group], transform: { rotation: [0, 0, -intensity * 1.2], scale: [1.2, 1.2, 1] }, easing: "easeOut" },
        { time: duration * 0.7, groups: [group], transform: { rotation: [0, 0, -intensity * 1.0], scale: [1.15, 1.15, 1] }, easing: "linear" },
        { time: duration, groups: [group], transform: { rotation: [0, 0, 0], scale: [1, 1, 1] }, easing: "easeIn" }
      )
    }
    // Arms raise
    else if (group.match(/arm|hand|claw/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "linear" },
        { time: duration * 0.3, groups: [group], transform: { rotation: [0, 0, -intensity * 0.8] }, easing: "easeOut" },
        { time: duration * 0.7, groups: [group], transform: { rotation: [0, 0, -intensity * 0.6] }, easing: "linear" },
        { time: duration, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "easeIn" }
      )
    }
    // Tail raises
    else if (group.match(/tail/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "linear" },
        { time: duration * 0.3, groups: [group], transform: { rotation: [-intensity * 0.5, 0, 0] }, easing: "easeOut" },
        { time: duration * 0.7, groups: [group], transform: { rotation: [-intensity * 0.4, intensity * 0.2, 0] }, easing: "linear" },
        { time: duration, groups: [group], transform: { rotation: [0, 0, 0] }, easing: "easeIn" }
      )
    }
    // Effects flare
    else if (group.match(/effect|trail|aura|shard|crystal|orb|glow/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { scale: [1, 1, 1] }, easing: "linear" },
        { time: duration * 0.3, groups: [group], transform: { scale: [1.4, 1.4, 1.4] }, easing: "easeOut" },
        { time: duration * 0.7, groups: [group], transform: { scale: [1.35, 1.35, 1.35] }, easing: "linear" },
        { time: duration, groups: [group], transform: { scale: [1, 1, 1] }, easing: "easeIn" }
      )
    }
    // Everything else braces/expands slightly
    else {
      keyframes.push(
        { time: 0, groups: [group], transform: { scale: [1, 1, 1] }, easing: "linear" },
        { time: duration * 0.3, groups: [group], transform: { scale: [1.05, 1.05, 1.05] }, easing: "easeOut" },
        { time: duration, groups: [group], transform: { scale: [1, 1, 1] }, easing: "easeIn" }
      )
    }
  }
  
  return {
    id: "roar_dynamic",
    name: "Roar",
    duration,
    loop: false,
    keyframes: keyframes.sort((a, b) => a.time - b.time)
  }
}

/**
 * Generate a dynamic FLY/HOVER animation for any set of groups
 */
export function generateFlyAnimation(groups: string[]): AnimationClip {
  const keyframes: Keyframe[] = []
  const duration = 1.5
  
  for (const group of groups) {
    const behavior = getGroupBehavior(group)
    const intensity = behavior.intensity * 0.3
    const phase = behavior.phase * duration
    
    // Wings flap continuously
    if (group.match(/wing/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, 0, intensity * 1.5] }, easing: "easeOut" },
        { time: duration * 0.25, groups: [group], transform: { rotation: [0.1, 0, -intensity * 1.0] }, easing: "easeIn" },
        { time: duration * 0.5, groups: [group], transform: { rotation: [0, 0, intensity * 1.5] }, easing: "easeOut" },
        { time: duration * 0.75, groups: [group], transform: { rotation: [0.1, 0, -intensity * 1.0] }, easing: "easeIn" },
        { time: duration, groups: [group], transform: { rotation: [0, 0, intensity * 1.5] }, easing: "easeOut" }
      )
    }
    // Body bobs with wing flaps
    else if (group.match(/body|torso|core/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { position: [0, 0.1, 0], rotation: [intensity * 0.1, 0, 0] }, easing: "easeInOut" },
        { time: duration * 0.25, groups: [group], transform: { position: [0, 0, 0], rotation: [0, 0, 0] }, easing: "easeInOut" },
        { time: duration * 0.5, groups: [group], transform: { position: [0, 0.1, 0], rotation: [intensity * 0.1, 0, 0] }, easing: "easeInOut" },
        { time: duration * 0.75, groups: [group], transform: { position: [0, 0, 0], rotation: [0, 0, 0] }, easing: "easeInOut" },
        { time: duration, groups: [group], transform: { position: [0, 0.1, 0], rotation: [intensity * 0.1, 0, 0] }, easing: "easeInOut" }
      )
    }
    // Legs dangle/tuck
    else if (group.match(/leg|feet|paw/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [intensity * 0.3, 0, 0] }, easing: "easeInOut" },
        { time: duration * 0.5, groups: [group], transform: { rotation: [intensity * 0.4, 0, 0] }, easing: "easeInOut" },
        { time: duration, groups: [group], transform: { rotation: [intensity * 0.3, 0, 0] }, easing: "easeInOut" }
      )
    }
    // Tail streams
    else if (group.match(/tail/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [-intensity * 0.2, intensity * 0.3, 0] }, easing: "easeInOut" },
        { time: duration * 0.5, groups: [group], transform: { rotation: [-intensity * 0.2, -intensity * 0.3, 0] }, easing: "easeInOut" },
        { time: duration, groups: [group], transform: { rotation: [-intensity * 0.2, intensity * 0.3, 0] }, easing: "easeInOut" }
      )
    }
    // Head looks around
    else if (group.match(/head|neck|face/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { rotation: [0, intensity * 0.2, 0] }, easing: "easeInOut" },
        { time: duration * 0.5, groups: [group], transform: { rotation: [0, -intensity * 0.2, 0] }, easing: "easeInOut" },
        { time: duration, groups: [group], transform: { rotation: [0, intensity * 0.2, 0] }, easing: "easeInOut" }
      )
    }
    // Effects trail
    else if (group.match(/effect|trail|aura/i)) {
      keyframes.push(
        { time: 0, groups: [group], transform: { scale: [1, 1, 1.2], position: [0, 0, 0.05] }, easing: "easeInOut" },
        { time: duration * 0.5, groups: [group], transform: { scale: [1.1, 1.1, 1.3], position: [0, 0, 0.08] }, easing: "easeInOut" },
        { time: duration, groups: [group], transform: { scale: [1, 1, 1.2], position: [0, 0, 0.05] }, easing: "easeInOut" }
      )
    }
    // Everything else bobs slightly
    else {
      keyframes.push(
        { time: (phase) % duration, groups: [group], transform: { position: [0, intensity * 0.15, 0] }, easing: "easeInOut" },
        { time: (phase + duration * 0.5) % duration, groups: [group], transform: { position: [0, 0, 0] }, easing: "easeInOut" },
        { time: duration, groups: [group], transform: { position: [0, intensity * 0.15, 0] }, easing: "easeInOut" }
      )
    }
  }
  
  return {
    id: "fly_dynamic",
    name: "Fly",
    duration,
    loop: true,
    keyframes: keyframes.sort((a, b) => a.time - b.time)
  }
}

/**
 * Generate all dynamic animations for a model's groups
 */
export function generateDynamicAnimations(groups: string[]): Record<string, AnimationClip> {
  const hasWings = groups.some(g => g.match(/wing/i))
  
  const animations: Record<string, AnimationClip> = {
    idle: generateIdleAnimation(groups),
    walk: generateWalkAnimation(groups),
    run: generateRunAnimation(groups),
    attack: generateAttackAnimation(groups),
    hit: generateHitAnimation(groups),
    death: generateDeathAnimation(groups),
    roar: generateRoarAnimation(groups),
  }
  
  // Add fly animation if the model has wings
  if (hasWings) {
    animations.fly = generateFlyAnimation(groups)
  }
  
  return animations
}
