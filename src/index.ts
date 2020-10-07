import WebStorage from './webStorage';
import StorageWithEvents from './storageWithEvents';
import { arrayify } from './util';

const registerInstance = (Vue: any, driver: any, prefix: any) => {
  let instance = new StorageWithEvents(prefix, driver);
  let apiName = '$' + String(driver) + 'Storage';

  Vue[apiName] = instance;
  Vue.prototype[apiName] = instance;
};

const Plugin = (Vue: any, options = {}) => {

  let safeOptions = Object.assign({}, {
    prefix: 'app_',
    drivers: 'local'
  }, options);

  arrayify(safeOptions.drivers).map((driver) => {
    registerInstance(Vue, driver, safeOptions.prefix);
  });

};

export default Plugin;
export { WebStorage, StorageWithEvents, Plugin }
