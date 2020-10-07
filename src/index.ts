import WebStorage from './webStorage';
import StorageWithEvents from './storageWithEvents';
import {arrayify} from './util';
import {driverType} from "./interfaces";

const registerInstance = (Vue: any, driver: driverType, prefix: string) => {
  let instance = new StorageWithEvents(prefix, driver);
  let apiName = '$' + String(driver) + 'Storage';

  Vue[apiName] = instance;
  Vue.prototype[apiName] = instance;
};

const Plugin = (Vue: any, options: any = {}) => {

  let safeOptions = Object.assign({}, {
    prefix: 'app_',
    drivers: 'local'
  }, options);

  arrayify(safeOptions.drivers).map((driver) => {
    registerInstance(Vue, driver, safeOptions.prefix);
  });
};

export default Plugin;
export {WebStorage, StorageWithEvents, Plugin}
