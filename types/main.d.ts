import Vue, { Component, PluginFunction, PluginObject } from 'vue'

// Vue prototype augments
import './vue'

export interface VueWebStorageConfigOptions {
  prefix?: string
  drivers?: []
}

export interface VueWebStoragePlugin extends PluginObject<VueWebStorageConfigOptions> {
  install: PluginFunction<VueWebStorageConfigOptions>
}

export interface VueWebStorageConfig extends VueWebStoragePlugin {
  setConfig: (config: VueWebStorageConfigOptions) => void
}

export declare const VueWebStorage: VueWebStorageConfig
export default VueWebStorage