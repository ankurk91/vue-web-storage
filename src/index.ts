import WebStorage from './webStorage';
import StorageWithEvents from './storageWithEvents';
import {arrayify} from './util';
import {driverType} from "./interfaces";
import {Vue, VueConstructor} from 'vue/types/vue'
import {PluginFunction, PluginObject} from 'vue'

const registerInstance = (Vue: any, driver: driverType, prefix: string) => {
  let instance = new StorageWithEvents(prefix, driver);
  let apiName = '$' + String(driver) + 'Storage';

  Vue[apiName] = instance;
  Vue.prototype[apiName] = instance;
};

export interface PluginOptions {
  prefix?: string
  drivers?: driverType[]
}

const Plugin = (Vue: any, options: PluginOptions = {}) => {

  let safeOptions = Object.assign({}, {
    prefix: 'app_',
    drivers: 'local'
  }, options);

  arrayify(safeOptions.drivers).map((driver) => {
    registerInstance(Vue, driver, safeOptions.prefix);
  });
};

export interface VueWebStoragePlugin extends PluginObject<PluginOptions> {
  install: PluginFunction<PluginOptions>
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $sessionStorage: StorageWithEvents
    readonly $localStorage: StorageWithEvents
  }

  interface VueConstructor {
    readonly $sessionStorage: StorageWithEvents
    readonly $localStorage: StorageWithEvents
  }
}

export default Plugin;
export {WebStorage, StorageWithEvents, Plugin}
