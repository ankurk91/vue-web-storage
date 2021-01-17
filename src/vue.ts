import StorageWithEvents from './storageWithEvents';
import {arrayify} from './util';
import type {driverType} from './interfaces';
import {Plugin, App, ComponentCustomProperties} from 'vue';

const registerInstance = (app: App, driver: driverType, prefix: string) => {
  const instance = new StorageWithEvents(prefix, driver);
  const apiName = '$' + String(driver) + 'Storage';

  app.config.globalProperties[apiName] = instance;
  app.provide(apiName, instance);
};

export interface PluginOptions {
  prefix?: string
  drivers?: driverType[]
}

const VueWebStoragePlugin: Plugin = (app: App, options: PluginOptions = {}) => {

  let safeOptions = Object.assign({}, {
    prefix: 'app_',
    drivers: 'local'
  }, options);

  arrayify(safeOptions.drivers).map((driver) => {
    registerInstance(app, driver, safeOptions.prefix);
  });
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    readonly $sessionStorage: StorageWithEvents
    readonly $localStorage: StorageWithEvents
  }
}

export default VueWebStoragePlugin;
