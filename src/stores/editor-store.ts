"use client"

import { create } from "zustand"

// Asset categories matching the game
export type AssetCategory = "enemies" | "npcs" | "trees" | "crystals" | "buildings" | "props" | "formations"

// Enemy class types from game
export type EnemyClass =
  | "grunt" | "soldier" | "elite" | "boss"
  | "beast" | "spirit" | "guardian" | "ancient"
  | "hybrid" | "glitch" | "corrupted"
  | "elemental" | "volcanic" | "frozen"

// Base asset definition matching game format
export interface AssetDefinition {
  id: string
  name: string
  category: AssetCategory
  description?: string
  
  // Visual properties (matches EnemyTemplate)
  color: string         // Main body color
  armorColor: string    // Armor/secondary color
  glowColor?: string    // Emissive/glow effects
  
  // Size properties
  size: number          // Scale multiplier (1.0 = normal)
  
  // For enemies
  class?: EnemyClass
  baseHealth?: number
  baseArmor?: number
  baseDamage?: number
  speed?: number
  xpReward?: number
  creditReward?: number
  spawnWeight?: number
  
  // For resources
  tier?: number
  harvestTime?: number
  respawnTime?: number
  
  // Animation
  animated?: boolean
  animationSpeed?: number
  
  // Category-specific properties
  properties: Record<string, unknown>
}

// Editor state
interface EditorState {
  // Current selection
  selectedAssetId: string | null
  selectedCategory: AssetCategory
  
  // Asset library
  assets: Map<string, AssetDefinition>
  
  // Preview settings
  showGrid: boolean
  showAxes: boolean
  autoRotate: boolean
  backgroundColor: string
  
  // Actions
  selectAsset: (id: string | null) => void
  selectCategory: (category: AssetCategory) => void
  updateAsset: (id: string, updates: Partial<AssetDefinition>) => void
  addAsset: (asset: AssetDefinition) => void
  removeAsset: (id: string) => void
  duplicateAsset: (id: string) => void
  
  // Preview actions
  toggleGrid: () => void
  toggleAxes: () => void
  toggleAutoRotate: () => void
  setBackgroundColor: (color: string) => void
  
  // Export
  exportAsset: (id: string) => string
  exportCategory: (category: AssetCategory) => string
  exportAll: () => string
}

export const useEditorStore = create<EditorState>((set, get) => ({
  selectedAssetId: null,
  selectedCategory: "enemies",
  assets: new Map(),
  showGrid: true,
  showAxes: true,
  autoRotate: true,
  backgroundColor: "#0a0a0a",
  
  selectAsset: (id) => set({ selectedAssetId: id }),
  
  selectCategory: (category) => set({ selectedCategory: category, selectedAssetId: null }),
  
  updateAsset: (id, updates) => {
    const assets = new Map(get().assets)
    const existing = assets.get(id)
    if (existing) {
      assets.set(id, { ...existing, ...updates })
      set({ assets })
    }
  },
  
  addAsset: (asset) => {
    const assets = new Map(get().assets)
    assets.set(asset.id, asset)
    set({ assets })
  },
  
  removeAsset: (id) => {
    const assets = new Map(get().assets)
    assets.delete(id)
    set({ assets, selectedAssetId: get().selectedAssetId === id ? null : get().selectedAssetId })
  },
  
  duplicateAsset: (id) => {
    const assets = get().assets
    const original = assets.get(id)
    if (original) {
      const newId = `${original.id}_copy_${Date.now()}`
      const copy: AssetDefinition = {
        ...original,
        id: newId,
        name: `${original.name} (Copy)`,
      }
      get().addAsset(copy)
      set({ selectedAssetId: newId })
    }
  },
  
  toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),
  toggleAxes: () => set((s) => ({ showAxes: !s.showAxes })),
  toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  
  exportAsset: (id) => {
    const asset = get().assets.get(id)
    return asset ? JSON.stringify(asset, null, 2) : "{}"
  },
  
  exportCategory: (category) => {
    const assets = Array.from(get().assets.values()).filter((a) => a.category === category)
    return JSON.stringify(assets, null, 2)
  },
  
  exportAll: () => {
    const assets = Array.from(get().assets.values())
    return JSON.stringify(assets, null, 2)
  },
}))

// Selectors
export const useSelectedAsset = () => {
  const selectedId = useEditorStore((s) => s.selectedAssetId)
  const assets = useEditorStore((s) => s.assets)
  return selectedId ? assets.get(selectedId) : null
}

export const useAssetsByCategory = (category: AssetCategory) => {
  const assets = useEditorStore((s) => s.assets)
  return Array.from(assets.values()).filter((a) => a.category === category)
}
