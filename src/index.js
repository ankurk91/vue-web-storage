import Storage from './storage';

const Plugin = (Vue, params = {}) => {

  let options = Object.assign({}, {
    driver: 'local',
    prefix: 'app_'
  }, params);

  let instance = new Storage(options);
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
export {Storage, Plugin}
