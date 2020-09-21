import Vue, {PluginFunction, PluginObject} from 'vue'

// Vue prototype augments
import './vue'

export interface VueWebStoragePluginOptions {
  prefix?: string
  drivers?: []
}

export interface VueWebStoragePlugin extends PluginObject<VueWebStoragePluginOptions> {
  install: PluginFunction<VueWebStoragePluginOptions>
}

export interface VueWebStorageConfig extends VueWebStoragePlugin {
  setConfig: (config: VueWebStoragePluginOptions) => void
}

export declare const VueWebStorage: VueWebStorageConfig
export default VueWebStorage
