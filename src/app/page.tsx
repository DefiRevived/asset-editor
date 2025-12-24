"use client"

import { useState, useCallback, useMemo } from "react"
import { VoxelPreview3D } from "@/components/previews/voxel-preview"
import { AnimatedVoxelPreview } from "@/components/previews/animated-voxel-preview"
import { VoxelEditor, VoxelBox, VoxelModel } from "@/components/voxel-editor"
import { useVoxelStore, useSelectedAsset, AssetType } from "@/stores/voxel-store"
import { AnimationClip, ANIMATION_PRESETS, exportAnimationClip, detectModelType, getRecommendedAnimations, getModelGroups, validateAnimationGroups, ModelType, generateDynamicAnimations } from "@/lib/animation"
import { 
  Box, 
  Plus, 
  Download, 
  Upload, 
  Trash2, 
  Grid3X3, 
  Move3D,
  RotateCcw,
  Copy,
  FileCode,
  Settings,
  Library,
  Search,
  ChevronRight,
  Folder,
  Sun,
  Play,
  Pause,
  Film
} from "lucide-react"

// Import all templates
import * as EnemyTemplates from "@/voxel-templates/enemies"
import * as NatureTemplates from "@/voxel-templates/nature"
import * as CharacterTemplates from "@/voxel-templates/characters"
import * as PropTemplates from "@/voxel-templates/props"

// Import enemy color configurations
import {
  COMBAT_DRONE_COLORS,
  STREET_PUNK_COLORS,
  CORP_SECURITY_COLORS,
  NETRUNNER_COLORS,
  ENFORCER_COLORS,
  MECH_BOSS_COLORS,
  BEAST_COLORS,
  SPIRIT_COLORS,
  GOLEM_COLORS,
  WRAITH_COLORS,
  FOREST_SPRITE_COLORS,
  DIRE_WOLF_COLORS,
  CRYSTAL_GOLEM_COLORS,
  MUSHROOM_TENDER_COLORS,
  RUIN_WRAITH_COLORS,
  ANCIENT_GUARDIAN_COLORS,
  HYBRID_COLORS,
  CORRUPTED_BEAST_COLORS,
  GLITCH_SPRITE_COLORS,
  DATA_PHANTOM_COLORS,
  TECHNO_ELEMENTAL_COLORS,
  VIRUS_SWARM_COLORS,
  SYSTEM_OVERLORD_COLORS,
  LAVA_IMP_COLORS,
  MAGMA_HOUND_COLORS,
  ASH_WRAITH_COLORS,
  VOLCANIC_GOLEM_COLORS,
  FIRE_DRAKE_COLORS,
  FROST_WISP_COLORS,
  ICE_WOLF_COLORS,
  FROZEN_REVENANT_COLORS,
  ICE_ELEMENTAL_COLORS,
  BLIZZARD_TITAN_COLORS,
  EnemyColors
} from "@/voxel-templates/enemies"

// Import prop color configurations
import {
  PropColors,
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
} from "@/voxel-templates/props"

// Import baking utilities
import { bakeVoxelModel, generateBakedGameCode, exportBakedModelJSON } from "@/lib/bake-lighting"

// Helper to convert EnemyColors to template colors format
function toTemplateColors(c: EnemyColors) {
  return {
    primaryColor: c.color,
    secondaryColor: c.armorColor,
    glowColor: c.glowColor
  }
}

// Helper to convert PropColors to template colors format
function toPropColors(c: PropColors) {
  return {
    primaryColor: c.primaryColor,
    secondaryColor: c.secondaryColor,
    glowColor: c.glowColor
  }
}

// Color picker component
function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-gray-400 w-20">{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer border border-gray-600 bg-transparent"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs font-mono text-white"
      />
    </div>
  )
}

// Asset type selector
function AssetTypeSelector({ value, onChange }: { value: AssetType; onChange: (v: AssetType) => void }) {
  const types: AssetType[] = ["humanoid", "beast", "spirit", "golem", "drone", "mech"]
  
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as AssetType)}
      className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-white"
    >
      {types.map(t => (
        <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
      ))}
    </select>
  )
}

// New Asset Dialog
function NewAssetDialog({ onClose, onCreate }: { onClose: () => void; onCreate: (name: string, type: AssetType) => void }) {
  const [name, setName] = useState("")
  const [type, setType] = useState<AssetType>("humanoid")
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold text-cyan-400 mb-4">Create New Voxel Asset</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Asset Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Asset"
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Base Template</label>
            <AssetTypeSelector value={type} onChange={setType} />
          </div>
        </div>
        
        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (name.trim()) {
                onCreate(name.trim(), type)
                onClose()
              }
            }}
            disabled={!name.trim()}
            className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed rounded text-white font-medium"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

// Export Dialog
function ExportDialog({ code, onClose }: { code: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-6 w-[800px] max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-cyan-400">Export Voxel Data</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">×</button>
        </div>
        
        <pre className="flex-1 overflow-auto bg-gray-950 border border-gray-700 rounded p-4 text-xs font-mono text-green-400">
          {code}
        </pre>
        
        <div className="flex gap-2 mt-4">
          <button
            onClick={copyToClipboard}
            className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-white font-medium flex items-center justify-center gap-2"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
          <button
            onClick={() => {
              const blob = new Blob([code], { type: "application/json" })
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = "voxel-export.json"
              a.click()
              URL.revokeObjectURL(url)
            }}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  )
}

// Game Code Export Dialog - generates actual game renderer code
function GameCodeExportDialog({ onClose }: { onClose: () => void }) {
  const asset = useSelectedAsset()
  const [copied, setCopied] = useState(false)
  const [exportMode, setExportMode] = useState<"standard" | "baked" | "json">("standard")
  const [bakeOptions, setBakeOptions] = useState({
    includeAO: true,
    bakeEmissive: true,
    gamma: 2.2
  })
  
  // Generate game-compatible TypeScript code
  const gameCode = useMemo(() => {
    if (!asset) return ""
    
    if (exportMode === "baked") {
      const bakedModel = bakeVoxelModel(
        asset.voxelModel, 
        asset.primaryColor, 
        asset.secondaryColor, 
        asset.glowColor,
        bakeOptions
      )
      return generateBakedGameCode(bakedModel, asset.name.replace(/\s+/g, ""))
    } else if (exportMode === "json") {
      const bakedModel = bakeVoxelModel(
        asset.voxelModel, 
        asset.primaryColor, 
        asset.secondaryColor, 
        asset.glowColor,
        bakeOptions
      )
      return exportBakedModelJSON(bakedModel)
    } else {
      return generateGameCode(asset.voxelModel, asset.primaryColor, asset.secondaryColor, asset.glowColor)
    }
  }, [asset, exportMode, bakeOptions])
  
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(gameCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [gameCode])
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-6 w-[900px] max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <FileCode className="w-5 h-5" />
            Export as Game Code
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">×</button>
        </div>
        
        {/* Export mode tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setExportMode("standard")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              exportMode === "standard" 
                ? "bg-cyan-600 text-white" 
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Standard Code
          </button>
          <button
            onClick={() => setExportMode("baked")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              exportMode === "baked" 
                ? "bg-orange-600 text-white" 
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            🔥 Baked Lighting
          </button>
          <button
            onClick={() => setExportMode("json")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              exportMode === "json" 
                ? "bg-purple-600 text-white" 
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Baked JSON
          </button>
        </div>
        
        {/* Bake options (only show for baked modes) */}
        {(exportMode === "baked" || exportMode === "json") && (
          <div className="flex gap-4 mb-4 p-3 bg-gray-800/50 rounded border border-gray-700">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input 
                type="checkbox" 
                checked={bakeOptions.includeAO}
                onChange={(e) => setBakeOptions(prev => ({ ...prev, includeAO: e.target.checked }))}
                className="rounded"
              />
              Ambient Occlusion
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input 
                type="checkbox" 
                checked={bakeOptions.bakeEmissive}
                onChange={(e) => setBakeOptions(prev => ({ ...prev, bakeEmissive: e.target.checked }))}
                className="rounded"
              />
              Include Emissive
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              Gamma:
              <input 
                type="number" 
                value={bakeOptions.gamma}
                onChange={(e) => setBakeOptions(prev => ({ ...prev, gamma: parseFloat(e.target.value) || 2.2 }))}
                step={0.1}
                min={1}
                max={3}
                className="w-16 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm"
              />
            </label>
          </div>
        )}
        
        <p className="text-sm text-gray-400 mb-3">
          {exportMode === "standard" && (
            <>Copy this code into your game renderer file (e.g., <code className="text-cyan-400">beast.ts</code>). Uses dynamic lighting.</>
          )}
          {exportMode === "baked" && (
            <>Pre-lit model with baked lighting. Uses <code className="text-orange-400">MeshBasicMaterial</code> - no runtime lighting needed!</>
          )}
          {exportMode === "json" && (
            <>JSON format with pre-computed colors. Load with your game&apos;s asset loader.</>
          )}
        </p>
        
        <pre className="flex-1 overflow-auto bg-gray-950 border border-gray-700 rounded p-4 text-xs font-mono text-green-400 whitespace-pre">
          {gameCode}
        </pre>
        
        <div className="flex gap-2 mt-4">
          <button
            onClick={copyToClipboard}
            className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-white font-medium flex items-center justify-center gap-2"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// Animation Editor Dialog
function AnimationEditorDialog({ onClose }: { onClose: () => void }) {
  const asset = useSelectedAsset()
  const [selectedPreset, setSelectedPreset] = useState<string | null>("idle")
  const [isPlaying, setIsPlaying] = useState(true)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [copied, setCopied] = useState(false)
  const [useDynamic, setUseDynamic] = useState(true) // Default to dynamic animations
  
  // Detect model type and get groups
  const modelType: ModelType = asset ? detectModelType(asset.voxelModel) : "generic"
  const modelGroups = asset ? getModelGroups(asset.voxelModel) : []
  
  // Generate dynamic animations for this model's groups
  const dynamicAnimations = useMemo(() => {
    if (!asset || modelGroups.length === 0) return {}
    return generateDynamicAnimations(modelGroups)
  }, [asset, modelGroups])
  
  // Get available animation names
  const dynamicAnimNames = Object.keys(dynamicAnimations)
  const staticPresetNames = Object.keys(ANIMATION_PRESETS)
  const animationsToShow = useDynamic ? dynamicAnimNames : staticPresetNames
  
  // Current animation (dynamic or static)
  const currentAnimation = useMemo(() => {
    if (!selectedPreset) return null
    if (useDynamic && dynamicAnimations[selectedPreset]) {
      return dynamicAnimations[selectedPreset]
    }
    const presetFn = ANIMATION_PRESETS[selectedPreset]
    return presetFn ? presetFn() : null
  }, [selectedPreset, useDynamic, dynamicAnimations])
  
  // Validate current animation groups
  const missingGroups = currentAnimation && asset 
    ? validateAnimationGroups(currentAnimation, asset.voxelModel)
    : []
  
  // Groups that ARE animated
  const animatedGroups = useMemo(() => {
    if (!currentAnimation) return new Set<string>()
    const groups = new Set<string>()
    for (const kf of currentAnimation.keyframes) {
      for (const g of kf.groups) groups.add(g)
    }
    return groups
  }, [currentAnimation])
  
  const handlePresetSelect = (presetName: string) => {
    setSelectedPreset(presetName)
  }
  
  const copyAnimation = useCallback(() => {
    if (!currentAnimation) return
    navigator.clipboard.writeText(exportAnimationClip(currentAnimation))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [currentAnimation])
  
  if (!asset) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-6">
          <p className="text-gray-400">Select an asset to animate</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white">
            Close
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-purple-500/30 rounded-lg w-[1100px] h-[700px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-bold text-purple-400 flex items-center gap-2">
            <Film className="w-5 h-5" />
            Animation Editor - {asset.name}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">×</button>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Left panel - Animation presets */}
          <div className="w-64 border-r border-gray-800 p-4 overflow-y-auto">
            {/* Model Info */}
            <div className="mb-4 p-3 bg-gray-800/50 rounded border border-gray-700">
              <h4 className="text-xs font-semibold text-purple-400 mb-2">Model Type</h4>
              <p className="text-sm text-white capitalize">{modelType}</p>
              <h4 className="text-xs font-semibold text-gray-400 mt-3 mb-1">Groups ({modelGroups.length})</h4>
              <div className="flex flex-wrap gap-1">
                {modelGroups.length > 0 ? modelGroups.map(g => (
                  <span 
                    key={g} 
                    className={`px-1.5 py-0.5 text-xs rounded ${
                      animatedGroups.has(g) 
                        ? "bg-green-600/50 text-green-300 border border-green-500/30" 
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {g}
                  </span>
                )) : (
                  <span className="text-xs text-gray-500">No groups defined</span>
                )}
              </div>
              {modelGroups.length > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  <span className="text-green-400">{animatedGroups.size}</span>/{modelGroups.length} groups animated
                </p>
              )}
            </div>
            
            {/* Dynamic vs Static toggle */}
            <div className="mb-4 p-2 bg-gray-800/50 rounded border border-gray-700">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setUseDynamic(true)}
                  className={`flex-1 px-2 py-1.5 text-xs rounded transition-colors ${
                    useDynamic 
                      ? "bg-green-600 text-white" 
                      : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                  }`}
                >
                  Dynamic
                </button>
                <button
                  onClick={() => setUseDynamic(false)}
                  className={`flex-1 px-2 py-1.5 text-xs rounded transition-colors ${
                    !useDynamic 
                      ? "bg-purple-600 text-white" 
                      : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                  }`}
                >
                  Static Presets
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {useDynamic ? "Adapts to model groups" : "Fixed preset animations"}
              </p>
            </div>
            
            <h3 className="text-sm font-semibold text-gray-400 mb-2">
              {useDynamic ? "Dynamic Animations" : "Static Presets"}
            </h3>
            
            <div className="space-y-1">
              {animationsToShow.map(name => {
                const anim = useDynamic ? dynamicAnimations[name] : (ANIMATION_PRESETS[name] ? ANIMATION_PRESETS[name]() : null)
                if (!anim) return null
                return (
                  <button
                    key={name}
                    onClick={() => handlePresetSelect(name)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      selectedPreset === name 
                        ? "bg-purple-600 text-white" 
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {anim.name}
                    {useDynamic && (
                      <span className="ml-2 text-xs text-green-400">✓ all groups</span>
                    )}
                  </button>
                )
              })}
            </div>
            
            {/* Animation info */}
            {currentAnimation && (
              <div className="mt-6 p-3 bg-gray-800/50 rounded border border-gray-700">
                <h4 className="text-xs font-semibold text-gray-400 mb-2">Current Animation</h4>
                <p className="text-sm text-white">{currentAnimation.name}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Duration: {currentAnimation.duration}s
                </p>
                <p className="text-xs text-gray-400">
                  Keyframes: {currentAnimation.keyframes.length}
                </p>
                <p className="text-xs text-gray-400">
                  Loop: {currentAnimation.loop ? "Yes" : "No"}
                </p>
                
                {/* Warning for missing groups */}
                {missingGroups.length > 0 && (
                  <div className="mt-2 p-2 bg-yellow-900/30 border border-yellow-600/50 rounded">
                    <p className="text-xs text-yellow-400">⚠️ Missing groups:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {missingGroups.map(g => (
                        <span key={g} className="px-1.5 py-0.5 bg-yellow-900/50 text-xs text-yellow-300 rounded">{g}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Center - Preview */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4">
              <AnimatedVoxelPreview
                voxelModel={asset.voxelModel}
                primaryColor={asset.primaryColor}
                secondaryColor={asset.secondaryColor}
                glowColor={asset.glowColor}
                animation={currentAnimation}
                isPlaying={isPlaying}
                playbackSpeed={playbackSpeed}
                showGrid={true}
              />
            </div>
            
            {/* Playback controls */}
            <div className="p-4 border-t border-gray-800 flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-2 rounded ${isPlaying ? "bg-orange-600" : "bg-green-600"} text-white`}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Speed:</span>
                {[0.25, 0.5, 1, 2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-2 py-1 text-xs rounded ${
                      playbackSpeed === speed 
                        ? "bg-purple-600 text-white" 
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
              
              <div className="flex-1" />
              
              <button
                onClick={copyAnimation}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-white text-sm flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy Animation JSON"}
              </button>
            </div>
          </div>
          
          {/* Right panel - Keyframe list */}
          <div className="w-72 border-l border-gray-800 p-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Keyframes</h3>
            {currentAnimation?.keyframes.length === 0 ? (
              <p className="text-xs text-gray-500">No keyframes</p>
            ) : (
              <div className="space-y-2">
                {currentAnimation?.keyframes.map((kf, idx) => (
                  <div key={idx} className="p-2 bg-gray-800/50 rounded border border-gray-700 text-xs">
                    <div className="flex justify-between text-gray-300">
                      <span>Time: {kf.time.toFixed(2)}s</span>
                      <span className="text-purple-400">{kf.easing}</span>
                    </div>
                    <div className="text-gray-400 mt-1">
                      Groups: {kf.groups.length > 0 ? kf.groups.join(", ") : "all"}
                    </div>
                    {kf.transform.position && (
                      <div className="text-gray-500">
                        Pos: [{kf.transform.position.map(v => v.toFixed(2)).join(", ")}]
                      </div>
                    )}
                    {kf.transform.rotation && (
                      <div className="text-gray-500">
                        Rot: [{kf.transform.rotation.map(v => v.toFixed(2)).join(", ")}]
                      </div>
                    )}
                    {kf.transform.scale && (
                      <div className="text-gray-500">
                        Scale: [{kf.transform.scale.map(v => v.toFixed(2)).join(", ")}]
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-4 p-3 bg-gray-800/30 rounded border border-gray-700">
              <p className="text-xs text-gray-500">
                💡 Tip: Animations transform groups like &quot;body&quot;, &quot;head&quot;, &quot;arm_left&quot;, etc.
                Make sure your voxel model uses these group names.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Template categories and their model creators
interface TemplateItem {
  id: string
  name: string
  category: string
  subCategory?: string
  type: AssetType
  create: () => VoxelModel
  colors?: {
    primaryColor: string
    secondaryColor: string
    glowColor: string
  }
}

function getTemplateList(): TemplateItem[] {
  const templates: TemplateItem[] = []

  // ========== ENEMIES ==========
  
  // Digital Enemies
  templates.push({ id: "enemy-drone", name: "Drone", category: "Enemies", subCategory: "Digital", type: "drone", create: EnemyTemplates.createDroneModel, colors: toTemplateColors(COMBAT_DRONE_COLORS) })
  templates.push({ id: "enemy-street-punk", name: "Street Punk", category: "Enemies", subCategory: "Digital", type: "humanoid", create: EnemyTemplates.createStreetPunkModel, colors: toTemplateColors(STREET_PUNK_COLORS) })
  templates.push({ id: "enemy-corp-security", name: "Corp Security", category: "Enemies", subCategory: "Digital", type: "humanoid", create: EnemyTemplates.createCorpSecurityModel, colors: toTemplateColors(CORP_SECURITY_COLORS) })
  templates.push({ id: "enemy-netrunner", name: "Netrunner", category: "Enemies", subCategory: "Digital", type: "humanoid", create: EnemyTemplates.createNetrunnerModel, colors: toTemplateColors(NETRUNNER_COLORS) })
  templates.push({ id: "enemy-enforcer", name: "Enforcer", category: "Enemies", subCategory: "Digital", type: "humanoid", create: EnemyTemplates.createEnforcerModel, colors: toTemplateColors(ENFORCER_COLORS) })
  templates.push({ id: "enemy-mech", name: "Mech Boss", category: "Enemies", subCategory: "Digital", type: "mech", create: EnemyTemplates.createMechModel, colors: toTemplateColors(MECH_BOSS_COLORS) })

  // Fantasy Enemies
  templates.push({ id: "enemy-beast", name: "Beast", category: "Enemies", subCategory: "Fantasy", type: "beast", create: EnemyTemplates.createBeastModel, colors: toTemplateColors(BEAST_COLORS) })
  templates.push({ id: "enemy-spirit", name: "Spirit", category: "Enemies", subCategory: "Fantasy", type: "spirit", create: EnemyTemplates.createSpiritModel, colors: toTemplateColors(SPIRIT_COLORS) })
  templates.push({ id: "enemy-golem", name: "Golem", category: "Enemies", subCategory: "Fantasy", type: "golem", create: EnemyTemplates.createGolemModel, colors: toTemplateColors(GOLEM_COLORS) })
  templates.push({ id: "enemy-wraith", name: "Wraith", category: "Enemies", subCategory: "Fantasy", type: "spirit", create: EnemyTemplates.createWraithModel, colors: toTemplateColors(WRAITH_COLORS) })
  templates.push({ id: "enemy-forest-sprite", name: "Forest Sprite", category: "Enemies", subCategory: "Fantasy", type: "spirit", create: EnemyTemplates.createForestSpriteModel, colors: toTemplateColors(FOREST_SPRITE_COLORS) })
  templates.push({ id: "enemy-dire-wolf", name: "Dire Wolf", category: "Enemies", subCategory: "Fantasy", type: "beast", create: EnemyTemplates.createDireWolfModel, colors: toTemplateColors(DIRE_WOLF_COLORS) })
  templates.push({ id: "enemy-crystal-golem", name: "Crystal Golem", category: "Enemies", subCategory: "Fantasy", type: "golem", create: EnemyTemplates.createCrystalGolemModel, colors: toTemplateColors(CRYSTAL_GOLEM_COLORS) })
  templates.push({ id: "enemy-mushroom-tender", name: "Mushroom Tender", category: "Enemies", subCategory: "Fantasy", type: "beast", create: EnemyTemplates.createMushroomTenderModel, colors: toTemplateColors(MUSHROOM_TENDER_COLORS) })
  templates.push({ id: "enemy-ruin-wraith", name: "Ruin Wraith", category: "Enemies", subCategory: "Fantasy", type: "spirit", create: EnemyTemplates.createRuinWraithModel, colors: toTemplateColors(RUIN_WRAITH_COLORS) })
  templates.push({ id: "enemy-ancient-guardian", name: "Ancient Guardian", category: "Enemies", subCategory: "Fantasy", type: "golem", create: EnemyTemplates.createAncientGuardianModel, colors: toTemplateColors(ANCIENT_GUARDIAN_COLORS) })

  // Mixed/Hybrid Enemies
  templates.push({ id: "enemy-humanoid", name: "Default Humanoid", category: "Enemies", subCategory: "Mixed", type: "humanoid", create: EnemyTemplates.createDefaultHumanoidModel })
  templates.push({ id: "enemy-hybrid", name: "Hybrid", category: "Enemies", subCategory: "Mixed", type: "humanoid", create: EnemyTemplates.createHybridModel, colors: toTemplateColors(HYBRID_COLORS) })
  templates.push({ id: "enemy-corrupted-beast", name: "Corrupted Beast", category: "Enemies", subCategory: "Mixed", type: "beast", create: EnemyTemplates.createCorruptedBeastModel, colors: toTemplateColors(CORRUPTED_BEAST_COLORS) })
  templates.push({ id: "enemy-glitch-sprite", name: "Glitch Sprite", category: "Enemies", subCategory: "Mixed", type: "spirit", create: EnemyTemplates.createGlitchSpriteModel, colors: toTemplateColors(GLITCH_SPRITE_COLORS) })
  templates.push({ id: "enemy-data-phantom", name: "Data Phantom", category: "Enemies", subCategory: "Mixed", type: "spirit", create: EnemyTemplates.createDataPhantomModel, colors: toTemplateColors(DATA_PHANTOM_COLORS) })
  templates.push({ id: "enemy-techno-elemental", name: "Techno Elemental", category: "Enemies", subCategory: "Mixed", type: "golem", create: EnemyTemplates.createTechnoElementalModel, colors: toTemplateColors(TECHNO_ELEMENTAL_COLORS) })
  templates.push({ id: "enemy-virus-swarm", name: "Virus Swarm", category: "Enemies", subCategory: "Mixed", type: "spirit", create: EnemyTemplates.createVirusSwarmModel, colors: toTemplateColors(VIRUS_SWARM_COLORS) })
  templates.push({ id: "enemy-system-overlord", name: "System Overlord", category: "Enemies", subCategory: "Mixed", type: "golem", create: EnemyTemplates.createSystemOverlordModel, colors: toTemplateColors(SYSTEM_OVERLORD_COLORS) })

  // Volcanic Enemies
  templates.push({ id: "enemy-lava-imp", name: "Lava Imp", category: "Enemies", subCategory: "Volcanic", type: "beast", create: EnemyTemplates.createLavaImpModel, colors: toTemplateColors(LAVA_IMP_COLORS) })
  templates.push({ id: "enemy-magma-hound", name: "Magma Hound", category: "Enemies", subCategory: "Volcanic", type: "beast", create: EnemyTemplates.createMagmaHoundModel, colors: toTemplateColors(MAGMA_HOUND_COLORS) })
  templates.push({ id: "enemy-ash-wraith", name: "Ash Wraith", category: "Enemies", subCategory: "Volcanic", type: "spirit", create: EnemyTemplates.createAshWraithModel, colors: toTemplateColors(ASH_WRAITH_COLORS) })
  templates.push({ id: "enemy-volcanic-golem", name: "Volcanic Golem", category: "Enemies", subCategory: "Volcanic", type: "golem", create: EnemyTemplates.createVolcanicGolemModel, colors: toTemplateColors(VOLCANIC_GOLEM_COLORS) })
  templates.push({ id: "enemy-fire-drake", name: "Fire Drake", category: "Enemies", subCategory: "Volcanic", type: "beast", create: EnemyTemplates.createFireDrakeModel, colors: toTemplateColors(FIRE_DRAKE_COLORS) })

  // Frozen Enemies
  templates.push({ id: "enemy-frost-wisp", name: "Frost Wisp", category: "Enemies", subCategory: "Frozen", type: "spirit", create: EnemyTemplates.createFrostWispModel, colors: toTemplateColors(FROST_WISP_COLORS) })
  templates.push({ id: "enemy-ice-wolf", name: "Ice Wolf", category: "Enemies", subCategory: "Frozen", type: "beast", create: EnemyTemplates.createIceWolfModel, colors: toTemplateColors(ICE_WOLF_COLORS) })
  templates.push({ id: "enemy-frozen-revenant", name: "Frozen Revenant", category: "Enemies", subCategory: "Frozen", type: "humanoid", create: EnemyTemplates.createFrozenRevenantModel, colors: toTemplateColors(FROZEN_REVENANT_COLORS) })
  templates.push({ id: "enemy-ice-elemental", name: "Ice Elemental", category: "Enemies", subCategory: "Frozen", type: "golem", create: EnemyTemplates.createIceElementalModel, colors: toTemplateColors(ICE_ELEMENTAL_COLORS) })
  templates.push({ id: "enemy-blizzard-titan", name: "Blizzard Titan", category: "Enemies", subCategory: "Frozen", type: "golem", create: EnemyTemplates.createBlizzardTitanModel, colors: toTemplateColors(BLIZZARD_TITAN_COLORS) })

  // ========== CHARACTERS ==========
  templates.push({ id: "char-npc", name: "NPC", category: "Characters", type: "npc", create: CharacterTemplates.createNPCModel })
  templates.push({ id: "char-player", name: "Player", category: "Characters", type: "player", create: CharacterTemplates.createPlayerModel })

  // ========== URBAN PROPS ==========
  templates.push({ id: "prop-streetlight", name: "Streetlight", category: "Props", subCategory: "Urban", type: "prop", create: PropTemplates.createStreetlightModel, colors: toPropColors(STREETLIGHT_COLORS) })
  templates.push({ id: "prop-terminal", name: "Terminal", category: "Props", subCategory: "Urban", type: "prop", create: PropTemplates.createTerminalModel, colors: toPropColors(TERMINAL_COLORS) })
  templates.push({ id: "prop-holo-ad", name: "Holo-Ad", category: "Props", subCategory: "Urban", type: "prop", create: PropTemplates.createHoloAdModel, colors: toPropColors(HOLO_AD_COLORS) })
  templates.push({ id: "prop-vehicle", name: "Vehicle", category: "Props", subCategory: "Urban", type: "prop", create: PropTemplates.createVehicleModel, colors: toPropColors(VEHICLE_COLORS) })
  templates.push({ id: "prop-trash", name: "Trash", category: "Props", subCategory: "Urban", type: "prop", create: PropTemplates.createTrashModel, colors: toPropColors(TRASH_COLORS) })
  templates.push({ id: "prop-barrel", name: "Barrel", category: "Props", subCategory: "Urban", type: "prop", create: PropTemplates.createBarrelModel, colors: toPropColors(BARREL_COLORS) })
  templates.push({ id: "prop-crate", name: "Crate", category: "Props", subCategory: "Urban", type: "prop", create: PropTemplates.createCrateModel, colors: toPropColors(CRATE_COLORS) })
  templates.push({ id: "prop-bench", name: "Bench", category: "Props", subCategory: "Urban", type: "prop", create: PropTemplates.createBenchModel, colors: toPropColors(BENCH_COLORS) })
  templates.push({ id: "prop-vending", name: "Vending Machine", category: "Props", subCategory: "Urban", type: "prop", create: PropTemplates.createVendingModel, colors: toPropColors(VENDING_COLORS) })
  templates.push({ id: "prop-drone-pad", name: "Drone Pad", category: "Props", subCategory: "Urban", type: "prop", create: PropTemplates.createDronePadModel, colors: toPropColors(DRONE_PAD_COLORS) })
  templates.push({ id: "prop-power-node", name: "Power Node", category: "Props", subCategory: "Urban", type: "prop", create: PropTemplates.createPowerNodeModel, colors: toPropColors(POWER_NODE_COLORS) })
  templates.push({ id: "prop-pipe", name: "Pipe", category: "Props", subCategory: "Urban", type: "prop", create: PropTemplates.createPipeModel, colors: toPropColors(PIPE_COLORS) })
  templates.push({ id: "prop-vent", name: "Vent", category: "Props", subCategory: "Urban", type: "prop", create: PropTemplates.createVentModel, colors: toPropColors(VENT_COLORS) })

  // Nature - Trees
  templates.push({ id: "tree-oak", name: "Oak Tree", category: "Nature", subCategory: "Trees", type: "tree", create: () => NatureTemplates.createOakTreeModel() })
  templates.push({ id: "tree-pine", name: "Pine Tree", category: "Nature", subCategory: "Trees", type: "tree", create: () => NatureTemplates.createPineTreeModel() })
  templates.push({ id: "tree-willow", name: "Willow Tree", category: "Nature", subCategory: "Trees", type: "tree", create: () => NatureTemplates.createWillowTreeModel() })
  templates.push({ id: "tree-cyber", name: "Cyber Tree", category: "Nature", subCategory: "Trees", type: "tree", create: () => NatureTemplates.createCyberTreeModel() })
  templates.push({ id: "tree-corrupted", name: "Corrupted Tree", category: "Nature", subCategory: "Trees", type: "tree", create: () => NatureTemplates.createCorruptedTreeModel() })

  // Nature - Crystals
  templates.push({ id: "crystal-cluster", name: "Crystal Cluster", category: "Nature", subCategory: "Crystals", type: "crystal", create: () => NatureTemplates.createCrystalClusterModel() })
  templates.push({ id: "crystal-spire", name: "Crystal Spire", category: "Nature", subCategory: "Crystals", type: "crystal", create: () => NatureTemplates.createCrystalSpireModel() })
  templates.push({ id: "crystal-floating", name: "Floating Crystal", category: "Nature", subCategory: "Crystals", type: "crystal", create: () => NatureTemplates.createFloatingCrystalModel() })
  templates.push({ id: "crystal-data-shard", name: "Data Shard", category: "Nature", subCategory: "Crystals", type: "crystal", create: () => NatureTemplates.createDataShardModel() })

  // Nature - Mushrooms
  templates.push({ id: "mushroom-giant", name: "Giant Mushroom", category: "Nature", subCategory: "Mushrooms", type: "mushroom", create: () => NatureTemplates.createGiantMushroomModel() })
  templates.push({ id: "mushroom-corrupted", name: "Corrupted Mushroom", category: "Nature", subCategory: "Mushrooms", type: "mushroom", create: () => NatureTemplates.createCorruptedMushroomModel() })

  // Nature - Volcanic
  templates.push({ id: "volcanic-lava-pillar", name: "Lava Pillar", category: "Nature", subCategory: "Volcanic", type: "volcanic", create: () => NatureTemplates.createLavaPillarModel() })
  templates.push({ id: "volcanic-obsidian", name: "Obsidian Spire", category: "Nature", subCategory: "Volcanic", type: "volcanic", create: () => NatureTemplates.createObsidianSpireModel() })
  templates.push({ id: "volcanic-vent", name: "Volcanic Vent", category: "Nature", subCategory: "Volcanic", type: "volcanic", create: () => NatureTemplates.createVolcanicVentModel() })
  templates.push({ id: "volcanic-magma-pool", name: "Magma Pool", category: "Nature", subCategory: "Volcanic", type: "volcanic", create: () => NatureTemplates.createMagmaPoolModel() })
  templates.push({ id: "volcanic-ash-mound", name: "Ash Mound", category: "Nature", subCategory: "Volcanic", type: "volcanic", create: () => NatureTemplates.createAshMoundModel() })
  templates.push({ id: "volcanic-lava-rock", name: "Lava Rock", category: "Nature", subCategory: "Volcanic", type: "volcanic", create: () => NatureTemplates.createLavaRockModel() })

  // Nature - Frozen
  templates.push({ id: "frozen-ice-spire", name: "Ice Spire", category: "Nature", subCategory: "Frozen", type: "frozen", create: () => NatureTemplates.createIceSpireModel() })
  templates.push({ id: "frozen-glacier", name: "Glacier", category: "Nature", subCategory: "Frozen", type: "frozen", create: () => NatureTemplates.createGlacierModel() })
  templates.push({ id: "frozen-snow-mound", name: "Snow Mound", category: "Nature", subCategory: "Frozen", type: "frozen", create: () => NatureTemplates.createSnowMoundModel() })
  templates.push({ id: "frozen-pillar", name: "Frozen Pillar", category: "Nature", subCategory: "Frozen", type: "frozen", create: () => NatureTemplates.createFrozenPillarModel() })
  templates.push({ id: "frozen-ice-crystal", name: "Ice Crystal", category: "Nature", subCategory: "Frozen", type: "frozen", create: () => NatureTemplates.createIceCrystalModel() })
  templates.push({ id: "frozen-snowdrift", name: "Snowdrift", category: "Nature", subCategory: "Frozen", type: "frozen", create: () => NatureTemplates.createSnowdriftModel() })

  // Nature - Ruins
  templates.push({ id: "ruin-pillar", name: "Pillar Ruin", category: "Nature", subCategory: "Ruins", type: "ruin", create: () => NatureTemplates.createPillarRuinModel() })
  templates.push({ id: "ruin-tech-pillar", name: "Tech Pillar", category: "Nature", subCategory: "Ruins", type: "ruin", create: () => NatureTemplates.createTechPillarModel() })
  templates.push({ id: "ruin-arch", name: "Arch Ruin", category: "Nature", subCategory: "Ruins", type: "ruin", create: () => NatureTemplates.createArchRuinModel() })
  templates.push({ id: "ruin-wall", name: "Wall Ruin", category: "Nature", subCategory: "Ruins", type: "ruin", create: () => NatureTemplates.createWallRuinModel() })
  templates.push({ id: "ruin-temple", name: "Temple", category: "Nature", subCategory: "Ruins", type: "ruin", create: () => NatureTemplates.createTemplePieceModel() })
  templates.push({ id: "ruin-tech-temple", name: "Tech Temple", category: "Nature", subCategory: "Ruins", type: "ruin", create: () => NatureTemplates.createTechTempleModel() })
  templates.push({ id: "ruin-statue", name: "Statue Ruin", category: "Nature", subCategory: "Ruins", type: "ruin", create: () => NatureTemplates.createStatueRuinModel() })

  return templates
}

// Template Browser Dialog
function TemplateBrowserDialog({ 
  onClose, 
  onSelect 
}: { 
  onClose: () => void
  onSelect: (name: string, type: AssetType, model: VoxelModel, colors?: { primaryColor: string; secondaryColor: string; glowColor: string }) => void 
}) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null)
  
  const templates = useMemo(() => getTemplateList(), [])
  
  // Get categories
  const categories = useMemo(() => {
    const cats = new Set<string>()
    templates.forEach(t => cats.add(t.category))
    return Array.from(cats)
  }, [templates])
  
  // Filter templates
  const filteredTemplates = useMemo(() => {
    return templates.filter(t => {
      if (search) {
        const searchLower = search.toLowerCase()
        return t.name.toLowerCase().includes(searchLower) || 
               t.category.toLowerCase().includes(searchLower) ||
               (t.subCategory?.toLowerCase().includes(searchLower))
      }
      if (selectedCategory) {
        return t.category === selectedCategory
      }
      return true
    })
  }, [templates, search, selectedCategory])
  
  // Group by subcategory within a category
  const groupedTemplates = useMemo(() => {
    const groups: Record<string, TemplateItem[]> = {}
    filteredTemplates.forEach(t => {
      const key = t.subCategory || t.category
      if (!groups[key]) groups[key] = []
      groups[key].push(t)
    })
    return groups
  }, [filteredTemplates])
  
  const handleLoad = () => {
    if (selectedTemplate) {
      const model = selectedTemplate.create()
      onSelect(selectedTemplate.name, selectedTemplate.type, model, selectedTemplate.colors)
      onClose()
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-cyan-500/30 rounded-lg w-[900px] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <Library className="w-5 h-5" />
            Game Asset Templates
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">×</button>
        </div>
        
        {/* Search */}
        <div className="p-4 border-b border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setSelectedCategory(null) }}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500"
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Category List */}
          <div className="w-48 border-r border-gray-800 overflow-y-auto p-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`w-full text-left px-3 py-2 rounded text-sm ${
                !selectedCategory ? "bg-cyan-900/50 text-cyan-400" : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              All Templates
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSearch("") }}
                className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 ${
                  selectedCategory === cat ? "bg-cyan-900/50 text-cyan-400" : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                <Folder className="w-4 h-4" />
                {cat}
              </button>
            ))}
          </div>
          
          {/* Template Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {Object.entries(groupedTemplates).map(([group, items]) => (
              <div key={group} className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <ChevronRight className="w-3 h-3" />
                  {group}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {items.map(template => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      onDoubleClick={handleLoad}
                      className={`text-left p-3 rounded-lg border transition-colors ${
                        selectedTemplate?.id === template.id
                          ? "bg-cyan-900/30 border-cyan-500"
                          : "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <div className="text-sm font-medium text-white">{template.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{template.type}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            {filteredTemplates.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Library className="w-12 h-12 mx-auto mb-3 opacity-30" />
                No templates found
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-800 bg-gray-900/50">
          <div className="text-sm text-gray-500">
            {selectedTemplate ? (
              <span>Selected: <span className="text-cyan-400">{selectedTemplate.name}</span></span>
            ) : (
              <span>{filteredTemplates.length} templates available</span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleLoad}
              disabled={!selectedTemplate}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed rounded text-white font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Load Template
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate actual game renderer code
function generateGameCode(model: VoxelModel, primaryColor: string, secondaryColor: string, glowColor: string): string {
  const lines: string[] = [
    "// === VOXEL RENDERER CODE ===",
    "// Paste this into your entity renderer function",
    "",
    "const tempMatrix = new THREE.Matrix4()",
    "const matrices: THREE.Matrix4[] = []",
    "const colors: THREE.Color[] = []",
    "",
    `const primaryCol = new THREE.Color("${primaryColor}")`,
    `const secondaryCol = new THREE.Color("${secondaryColor}")`,
    `const glowCol = new THREE.Color("${glowColor}")`,
    ""
  ]
  
  // Group voxels by their group
  const groups: Record<string, VoxelBox[]> = {}
  model.boxes.forEach(box => {
    const group = box.group || "default"
    if (!groups[group]) groups[group] = []
    groups[group].push(box)
  })
  
  // Generate code for each group
  for (const [groupName, boxes] of Object.entries(groups)) {
    lines.push(`// --- ${groupName.toUpperCase()} ---`)
    
    for (const box of boxes) {
      const [px, py, pz] = box.position
      const [sx, sy, sz] = box.scale
      
      let colorExpr: string
      switch (box.colorType) {
        case "primary":
          colorExpr = box.colorMultiplier !== 1 
            ? `primaryCol.clone().multiplyScalar(${box.colorMultiplier})`
            : "primaryCol.clone()"
          break
        case "secondary":
          colorExpr = box.colorMultiplier !== 1
            ? `secondaryCol.clone().multiplyScalar(${box.colorMultiplier})`
            : "secondaryCol.clone()"
          break
        case "glow":
          colorExpr = box.colorMultiplier !== 1
            ? `glowCol.clone().multiplyScalar(${box.colorMultiplier})`
            : "glowCol.clone()"
          break
        case "custom":
          colorExpr = `new THREE.Color("${box.customColor || '#888888'}")`
          if (box.colorMultiplier !== 1) {
            colorExpr += `.multiplyScalar(${box.colorMultiplier})`
          }
          break
        default:
          colorExpr = "primaryCol.clone()"
      }
      
      lines.push(`// ${box.name}`)
      lines.push(`tempMatrix.makeTranslation(x + ${px.toFixed(3)}, y + ${py.toFixed(3)}, z + ${pz.toFixed(3)})`)
      lines.push(`tempMatrix.scale(new THREE.Vector3(${sx.toFixed(3)}, ${sy.toFixed(3)}, ${sz.toFixed(3)}))`)
      lines.push(`matrices.push(tempMatrix.clone())`)
      lines.push(`colors.push(${colorExpr})`)
      lines.push("")
    }
  }
  
  lines.push("// Apply to instanced mesh")
  lines.push("matrices.forEach((mat, i) => {")
  lines.push("  mesh.setMatrixAt(i, mat)")
  lines.push("  mesh.setColorAt(i, colors[i])")
  lines.push("})")
  lines.push("mesh.instanceMatrix.needsUpdate = true")
  lines.push("if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true")
  
  return lines.join("\n")
}

// Asset List Item
function AssetListItem({ 
  asset, 
  isSelected, 
  onSelect, 
  onDelete 
}: { 
  asset: { id: string; name: string; type: AssetType }
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
}) {
  return (
    <div 
      onClick={onSelect}
      className={`group flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-colors ${
        isSelected 
          ? "bg-cyan-900/50 border border-cyan-500/50" 
          : "bg-gray-800/50 hover:bg-gray-700/50 border border-transparent"
      }`}
    >
      <Box className="w-4 h-4 text-cyan-400" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-white truncate">{asset.name}</div>
        <div className="text-xs text-gray-500">{asset.type}</div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
        className="p-1 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  )
}

// Main Page Component
export default function VoxelEditorPage() {
  const { 
    assets, 
    selectedAssetId, 
    selectedVoxelId,
    showGrid,
    showAxes,
    autoRotate,
    flatLighting,
    selectAsset,
    selectVoxel,
    createAsset,
    createAssetFromModel,
    deleteAsset,
    updateAssetColors,
    updateVoxel,
    addVoxel: _addVoxel,
    deleteVoxel: _deleteVoxel,
    duplicateVoxel: _duplicateVoxel,
    addGroup,
    toggleGrid,
    toggleAxes,
    toggleAutoRotate,
    toggleFlatLighting,
    exportAsset,
    exportAllAssets,
    importAssets
  } = useVoxelStore()
  
  // Silence unused variable warnings (used in advanced editing)
  void _addVoxel; void _deleteVoxel; void _duplicateVoxel;
  
  const selectedAsset = useSelectedAsset()
  
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [showGameCodeDialog, setShowGameCodeDialog] = useState(false)
  const [showTemplateBrowser, setShowTemplateBrowser] = useState(false)
  const [showAnimationEditor, setShowAnimationEditor] = useState(false)
  const [exportCode, setExportCode] = useState("")
  
  // Handle file import
  const handleImport = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const text = await file.text()
      importAssets(text)
    }
    input.click()
  }, [importAssets])
  
  // Handle export
  const handleExport = useCallback(() => {
    const code = selectedAssetId ? exportAsset(selectedAssetId) : exportAllAssets()
    setExportCode(code)
    setShowExportDialog(true)
  }, [selectedAssetId, exportAsset, exportAllAssets])
  
  // Handle voxel model updates from VoxelEditor
  const handleVoxelModelChange = useCallback((newModel: VoxelModel) => {
    if (!selectedAssetId) return
    
    // Find changes and apply them
    const oldModel = selectedAsset?.voxelModel
    if (!oldModel) return
    
    // Handle individual voxel updates
    newModel.boxes.forEach(newBox => {
      const oldBox = oldModel.boxes.find(b => b.id === newBox.id)
      if (!oldBox || JSON.stringify(oldBox) !== JSON.stringify(newBox)) {
        updateVoxel(selectedAssetId, newBox.id, newBox)
      }
    })
    
    // Handle new groups
    newModel.groups.forEach(group => {
      if (!oldModel.groups.includes(group)) {
        addGroup(selectedAssetId, group)
      }
    })
  }, [selectedAssetId, selectedAsset, updateVoxel, addGroup])

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-cyan-900/50 bg-gray-900/90 backdrop-blur flex items-center px-4 gap-4">
        <div className="flex items-center gap-2">
          <Box className="w-6 h-6 text-cyan-400" />
          <h1 className="text-lg font-bold">
            <span className="text-cyan-400">NEON_RUNNER</span>
            <span className="text-gray-400 font-normal ml-2">Voxel Editor</span>
          </h1>
        </div>
        
        <div className="flex-1" />
        
        {/* Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewDialog(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 rounded text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            New Asset
          </button>
          
          <button
            onClick={() => setShowTemplateBrowser(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded text-sm font-medium"
          >
            <Library className="w-4 h-4" />
            Templates
          </button>
          
          <div className="w-px h-6 bg-gray-700" />
          
          <button
            onClick={handleImport}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            <Upload className="w-4 h-4" />
            Import
          </button>
          
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>
          
          <button
            onClick={() => setShowGameCodeDialog(true)}
            disabled={!selectedAsset}
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm"
          >
            <FileCode className="w-4 h-4" />
            Export Code
          </button>
          
          <button
            onClick={() => setShowAnimationEditor(true)}
            disabled={!selectedAsset}
            className="flex items-center gap-2 px-3 py-1.5 bg-orange-700 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm"
          >
            <Film className="w-4 h-4" />
            Animate
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Asset List */}
        <aside className="w-64 border-r border-gray-800 bg-gray-900/50 flex flex-col">
          <div className="p-3 border-b border-gray-800">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Assets</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {assets.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                <Box className="w-8 h-8 mx-auto mb-2 opacity-50" />
                No assets yet
                <button
                  onClick={() => setShowNewDialog(true)}
                  className="block mx-auto mt-2 text-cyan-400 hover:text-cyan-300"
                >
                  Create one
                </button>
              </div>
            ) : (
              assets.map(asset => (
                <AssetListItem
                  key={asset.id}
                  asset={asset}
                  isSelected={asset.id === selectedAssetId}
                  onSelect={() => selectAsset(asset.id)}
                  onDelete={() => {
                    if (confirm(`Delete "${asset.name}"?`)) {
                      deleteAsset(asset.id)
                    }
                  }}
                />
              ))
            )}
          </div>
        </aside>
        
        {/* Center - 3D Preview */}
        <main className="flex-1 flex flex-col">
          {/* Preview Controls */}
          <div className="h-10 border-b border-gray-800 bg-gray-900/30 flex items-center px-4 gap-4">
            <button
              onClick={toggleGrid}
              className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs ${showGrid ? "bg-cyan-900/50 text-cyan-400" : "text-gray-500 hover:text-gray-300"}`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              Grid
            </button>
            
            <button
              onClick={toggleAxes}
              className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs ${showAxes ? "bg-cyan-900/50 text-cyan-400" : "text-gray-500 hover:text-gray-300"}`}
            >
              <Move3D className="w-3.5 h-3.5" />
              Axes
            </button>
            
            <button
              onClick={toggleAutoRotate}
              className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs ${autoRotate ? "bg-cyan-900/50 text-cyan-400" : "text-gray-500 hover:text-gray-300"}`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Rotate
            </button>
            
            <button
              onClick={toggleFlatLighting}
              className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs ${flatLighting ? "bg-yellow-900/50 text-yellow-400" : "text-gray-500 hover:text-gray-300"}`}
              title="Show true colors without lighting effects"
            >
              <Sun className="w-3.5 h-3.5" />
              True Colors
            </button>
            
            <div className="flex-1" />
            
            {selectedAsset && (
              <span className="text-xs text-gray-500">
                {selectedAsset.voxelModel.boxes.length} voxels
              </span>
            )}
          </div>
          
          {/* 3D Viewport */}
          <div className="flex-1 relative">
            {selectedAsset ? (
              <VoxelPreview3D
                voxelModel={selectedAsset.voxelModel}
                primaryColor={selectedAsset.primaryColor}
                secondaryColor={selectedAsset.secondaryColor}
                glowColor={selectedAsset.glowColor}
                selectedVoxelId={selectedVoxelId}
                onVoxelClick={selectVoxel}
                showGrid={showGrid}
                showAxes={showAxes}
                autoRotate={autoRotate}
                flatLighting={flatLighting}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                <div className="text-center">
                  <Box className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">Select or create an asset to begin editing</p>
                </div>
              </div>
            )}
          </div>
        </main>
        
        {/* Right Panel - Voxel Editor */}
        <aside className="w-80 border-l border-gray-800 bg-gray-900/50 flex flex-col overflow-hidden">
          {selectedAsset ? (
            <>
              {/* Asset Colors */}
              <div className="p-3 border-b border-gray-800 space-y-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Colors</h3>
                <ColorInput
                  label="Primary"
                  value={selectedAsset.primaryColor}
                  onChange={(v) => updateAssetColors(selectedAsset.id, { primaryColor: v })}
                />
                <ColorInput
                  label="Secondary"
                  value={selectedAsset.secondaryColor}
                  onChange={(v) => updateAssetColors(selectedAsset.id, { secondaryColor: v })}
                />
                <ColorInput
                  label="Glow"
                  value={selectedAsset.glowColor}
                  onChange={(v) => updateAssetColors(selectedAsset.id, { glowColor: v })}
                />
              </div>
              
              {/* Voxel Editor */}
              <div className="flex-1 overflow-y-auto">
                <VoxelEditor
                  voxelModel={selectedAsset.voxelModel}
                  selectedVoxelId={selectedVoxelId}
                  onSelectVoxel={selectVoxel}
                  onVoxelModelChange={handleVoxelModelChange}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-600 p-4 text-center">
              <div>
                <Settings className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Select an asset to edit its voxels</p>
              </div>
            </div>
          )}
        </aside>
      </div>
      
      {/* Dialogs */}
      {showNewDialog && (
        <NewAssetDialog
          onClose={() => setShowNewDialog(false)}
          onCreate={createAsset}
        />
      )}
      
      {showExportDialog && (
        <ExportDialog
          code={exportCode}
          onClose={() => setShowExportDialog(false)}
        />
      )}
      
      {showGameCodeDialog && (
        <GameCodeExportDialog
          onClose={() => setShowGameCodeDialog(false)}
        />
      )}
      
      {showAnimationEditor && (
        <AnimationEditorDialog
          onClose={() => setShowAnimationEditor(false)}
        />
      )}
      
      {showTemplateBrowser && (
        <TemplateBrowserDialog
          onClose={() => setShowTemplateBrowser(false)}
          onSelect={(name, type, model, colors) => {
            createAssetFromModel(name, type, model, colors)
            setShowTemplateBrowser(false)
          }}
        />
      )}
    </div>
  )
}
