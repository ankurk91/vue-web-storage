import Storage from './storage';
import StorageWithEvents from './storageWithEvents';

const registerInstance = (Vue, params) => {
  let instance = new StorageWithEvents(params.prefix, params.driver);
  let apiName = '$' + String(params.name);

  Vue[apiName] = instance;
  Vue.prototype[apiName] = instance;
};

const arrayify = (obj) => {
  return obj instanceof Array ? obj : [obj];
};

const normalizeParams = (params) => {
  let defaultDriver = 'local';
  let autoName = params.driver || defaultDriver;

  return Object.assign({}, {
    prefix: 'app_',
    driver: defaultDriver,
    name: autoName + 'Storage',
  }, params);

};

const Plugin = (Vue, options = {}) => {

  arrayify(options).map((params) => {
    registerInstance(Vue, normalizeParams(params));
  });

};

export default Plugin;
export {Storage, StorageWithEvents, Plugin}
