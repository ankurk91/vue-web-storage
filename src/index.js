import Storage from './storage';
import StorageWithEvents from './storageWithEvents';

const Plugin = (Vue, params = {}) => {

  let options = Object.assign({}, {
    prefix: 'app_',
    driver: 'local',
  }, params);

  let instance = new StorageWithEvents(options.prefix, options.driver);
  Vue.$storage = instance;
  Vue.prototype.$storage = instance;

};


export default Plugin;
export {Storage, StorageWithEvents, Plugin}
