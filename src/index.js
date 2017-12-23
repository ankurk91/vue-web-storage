import Storage from './storage';
import StorageWithEvents from './storage-with-events';

const Plugin = (Vue, params = {}) => {

  let options = Object.assign({}, {
    prefix: 'app_',
    driver: 'local',
  }, params);

  let instance = new StorageWithEvents(options.prefix, options.driver);
  Vue.$storage = instance;

  Object.defineProperties(Vue.prototype, {
    $storage: {
      get() {
        return instance
      }
    }
  });

};


export default Plugin;
export {Storage, StorageWithEvents, Plugin}
