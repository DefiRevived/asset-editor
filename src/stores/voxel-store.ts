"use client"

import { create } from "zustand"
import { VoxelBox, VoxelModel, createDefaultVoxelModel } from "@/components/voxel-editor"

// Asset types that can be edited
export type AssetType = "humanoid" | "beast" | "spirit" | "golem" | "drone" | "mech" | "tree" | "crystal" | "mushroom" | "volcanic" | "frozen" | "ruin" | "npc" | "player" | "prop" | "custom"

export interface VoxelAsset {
  id: string
  name: string
  type: AssetType
  primaryColor: string
  secondaryColor: string
  glowColor: string
  voxelModel: VoxelModel
}

interface VoxelEditorState {
  // Assets
  assets: VoxelAsset[]
  selectedAssetId: string | null
  
  // Voxel selection
  selectedVoxelId: string | null
  
  // Preview settings
  showGrid: boolean
  showAxes: boolean
  autoRotate: boolean
  flatLighting: boolean
  previewSize: number
  
  // Actions
  loadAsset: (asset: VoxelAsset) => void
  selectAsset: (id: string | null) => void
  updateAssetColors: (id: string, colors: { primaryColor?: string; secondaryColor?: string; glowColor?: string }) => void
  updateAssetName: (id: string, name: string) => void
  
  // Voxel actions
  selectVoxel: (id: string | null) => void
  updateVoxel: (assetId: string, voxelId: string, updates: Partial<VoxelBox>) => void
  addVoxel: (assetId: string, group: string) => void
  deleteVoxel: (assetId: string, voxelId: string) => void
  duplicateVoxel: (assetId: string, voxelId: string) => void
  addGroup: (assetId: string, groupName: string) => void
  
  // Create new asset
  createAsset: (name: string, type: AssetType) => void
  createAssetFromModel: (name: string, type: AssetType, model: VoxelModel, colors?: { primaryColor?: string; secondaryColor?: string; glowColor?: string }) => void
  deleteAsset: (id: string) => void
  
  // Preview actions
  toggleGrid: () => void
  toggleAxes: () => void
  toggleAutoRotate: () => void
  toggleFlatLighting: () => void
  setPreviewSize: (size: number) => void
  
  // Export
  exportAsset: (id: string) => string
  exportAllAssets: () => string
  importAssets: (json: string) => void
}

function generateId() {
  return `voxel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

function generateAssetId() {
  return `asset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const useVoxelStore = create<VoxelEditorState>((set, get) => ({
  assets: [],
  selectedAssetId: null,
  selectedVoxelId: null,
  showGrid: true,
  showAxes: true,
  autoRotate: false,
  flatLighting: false,
  previewSize: 1,
  
  loadAsset: (asset) => {
    set((state) => {
      const existing = state.assets.find(a => a.id === asset.id)
      if (existing) {
        return {
          assets: state.assets.map(a => a.id === asset.id ? asset : a)
        }
      }
      return { assets: [...state.assets, asset] }
    })
  },
  
  selectAsset: (id) => set({ selectedAssetId: id, selectedVoxelId: null }),
  
  updateAssetColors: (id, colors) => {
    set((state) => ({
      assets: state.assets.map(a => 
        a.id === id ? { ...a, ...colors } : a
      )
    }))
  },
  
  updateAssetName: (id, name) => {
    set((state) => ({
      assets: state.assets.map(a => 
        a.id === id ? { ...a, name } : a
      )
    }))
  },
  
  selectVoxel: (id) => set({ selectedVoxelId: id }),
  
  updateVoxel: (assetId, voxelId, updates) => {
    set((state) => ({
      assets: state.assets.map(asset => {
        if (asset.id !== assetId) return asset
        return {
          ...asset,
          voxelModel: {
            ...asset.voxelModel,
            boxes: asset.voxelModel.boxes.map(box =>
              box.id === voxelId ? { ...box, ...updates } : box
            )
          }
        }
      })
    }))
  },
  
  addVoxel: (assetId, group) => {
    const newVoxel: VoxelBox = {
      id: generateId(),
      name: "New Voxel",
      position: [0, 1, 0],
      scale: [0.1, 0.1, 0.1],
      colorType: "primary",
      colorMultiplier: 1,
      emissive: false,
      emissiveIntensity: 0,
      group
    }
    
    set((state) => ({
      assets: state.assets.map(asset => {
        if (asset.id !== assetId) return asset
        return {
          ...asset,
          voxelModel: {
            ...asset.voxelModel,
            boxes: [...asset.voxelModel.boxes, newVoxel]
          }
        }
      }),
      selectedVoxelId: newVoxel.id
    }))
  },
  
  deleteVoxel: (assetId, voxelId) => {
    set((state) => ({
      assets: state.assets.map(asset => {
        if (asset.id !== assetId) return asset
        return {
          ...asset,
          voxelModel: {
            ...asset.voxelModel,
            boxes: asset.voxelModel.boxes.filter(box => box.id !== voxelId)
          }
        }
      }),
      selectedVoxelId: state.selectedVoxelId === voxelId ? null : state.selectedVoxelId
    }))
  },
  
  duplicateVoxel: (assetId, voxelId) => {
    const asset = get().assets.find(a => a.id === assetId)
    const original = asset?.voxelModel.boxes.find(b => b.id === voxelId)
    if (!original) return
    
    const newVoxel: VoxelBox = {
      ...original,
      id: generateId(),
      name: `${original.name} (copy)`,
      position: [original.position[0] + 0.1, original.position[1], original.position[2]]
    }
    
    set((state) => ({
      assets: state.assets.map(asset => {
        if (asset.id !== assetId) return asset
        return {
          ...asset,
          voxelModel: {
            ...asset.voxelModel,
            boxes: [...asset.voxelModel.boxes, newVoxel]
          }
        }
      }),
      selectedVoxelId: newVoxel.id
    }))
  },
  
  addGroup: (assetId, groupName) => {
    set((state) => ({
      assets: state.assets.map(asset => {
        if (asset.id !== assetId) return asset
        if (asset.voxelModel.groups.includes(groupName)) return asset
        return {
          ...asset,
          voxelModel: {
            ...asset.voxelModel,
            groups: [...asset.voxelModel.groups, groupName]
          }
        }
      })
    }))
  },
  
  createAsset: (name, type) => {
    const newAsset: VoxelAsset = {
      id: generateAssetId(),
      name,
      type,
      primaryColor: "#4a4a5a",
      secondaryColor: "#3a3a4a",
      glowColor: "#00ffff",
      voxelModel: createDefaultVoxelModel(type)
    }
    set((state) => ({
      assets: [...state.assets, newAsset],
      selectedAssetId: newAsset.id
    }))
  },
  
  createAssetFromModel: (name, type, model, colors) => {
    // Regenerate IDs to ensure uniqueness
    const newAsset: VoxelAsset = {
      id: generateAssetId(),
      name,
      type,
      primaryColor: colors?.primaryColor || "#4a4a5a",
      secondaryColor: colors?.secondaryColor || "#3a3a4a",
      glowColor: colors?.glowColor || "#00ffff",
      voxelModel: {
        boxes: model.boxes.map(box => ({
          ...box,
          id: generateId()
        })),
        groups: [...model.groups]
      }
    }
    set((state) => ({
      assets: [...state.assets, newAsset],
      selectedAssetId: newAsset.id
    }))
  },
  
  deleteAsset: (id) => {
    set((state) => ({
      assets: state.assets.filter(a => a.id !== id),
      selectedAssetId: state.selectedAssetId === id ? null : state.selectedAssetId,
      selectedVoxelId: null
    }))
  },
  
  toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),
  toggleAxes: () => set((s) => ({ showAxes: !s.showAxes })),
  toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),
  toggleFlatLighting: () => set((s) => ({ flatLighting: !s.flatLighting })),
  setPreviewSize: (size) => set({ previewSize: size }),
  
  exportAsset: (id) => {
    const asset = get().assets.find(a => a.id === id)
    if (!asset) return "{}"
    
    // Export in game-compatible format
    const exportData = {
      id: asset.id,
      name: asset.name,
      type: asset.type,
      primaryColor: asset.primaryColor,
      secondaryColor: asset.secondaryColor,
      glowColor: asset.glowColor,
      voxels: asset.voxelModel.boxes.map(box => ({
        name: box.name,
        position: box.position,
        scale: box.scale,
        colorType: box.colorType,
        customColor: box.customColor,
        colorMultiplier: box.colorMultiplier,
        emissive: box.emissive,
        emissiveIntensity: box.emissiveIntensity,
        group: box.group
      })),
      groups: asset.voxelModel.groups
    }
    
    return JSON.stringify(exportData, null, 2)
  },
  
  exportAllAssets: () => {
    const assets = get().assets.map(asset => ({
      id: asset.id,
      name: asset.name,
      type: asset.type,
      primaryColor: asset.primaryColor,
      secondaryColor: asset.secondaryColor,
      glowColor: asset.glowColor,
      voxels: asset.voxelModel.boxes.map(box => ({
        name: box.name,
        position: box.position,
        scale: box.scale,
        colorType: box.colorType,
        customColor: box.customColor,
        colorMultiplier: box.colorMultiplier,
        emissive: box.emissive,
        emissiveIntensity: box.emissiveIntensity,
        group: box.group
      })),
      groups: asset.voxelModel.groups
    }))
    
    return JSON.stringify(assets, null, 2)
  },
  
  importAssets: (json) => {
    try {
      const data = JSON.parse(json)
      const assets = Array.isArray(data) ? data : [data]
      
      assets.forEach((item: { id?: string; name: string; type: AssetType; primaryColor: string; secondaryColor: string; glowColor: string; voxels: Omit<VoxelBox, 'id'>[]; groups: string[] }) => {
        const asset: VoxelAsset = {
          id: item.id || generateAssetId(),
          name: item.name,
          type: item.type,
          primaryColor: item.primaryColor,
          secondaryColor: item.secondaryColor,
          glowColor: item.glowColor,
          voxelModel: {
            boxes: item.voxels.map((v: Omit<VoxelBox, 'id'>) => ({
              ...v,
              id: generateId()
            })),
            groups: item.groups
          }
        }
        get().loadAsset(asset)
      })
    } catch (e) {
      console.error("Failed to import:", e)
    }
  }
}))

// Selector for selected asset
export function useSelectedAsset() {
  const assets = useVoxelStore((s) => s.assets)
  const selectedId = useVoxelStore((s) => s.selectedAssetId)
  return assets.find(a => a.id === selectedId) || null
}

// Selector for selected voxel
export function useSelectedVoxel() {
  const asset = useSelectedAsset()
  const selectedVoxelId = useVoxelStore((s) => s.selectedVoxelId)
  return asset?.voxelModel.boxes.find(b => b.id === selectedVoxelId) || null
}
