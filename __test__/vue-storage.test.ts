import VueWebStoragePlugin, {WebStorage} from '../src';
import {createApp} from 'vue';

describe('Vue Storage plugin', () => {

  test('without any arguments', (done) => {
    const wrapper = createApp({
      render() {
        return null
      },
      created() {
        const app = this;
        expect(app.$localStorage.prefix).toEqual('app_');
        expect(app.$localStorage.set).toBeDefined();
        expect(app.$localStorage.get).toBeDefined();
        expect(app.$localStorage.on).toBeDefined();
        expect(app.$localStorage.off).toBeDefined();

        done()
      }
    });
    wrapper.use(VueWebStoragePlugin);
    wrapper.mount('body')
  });

  test('custom prefix with default driver', (done) => {
    const wrapper = createApp({
      render() {
        return null
      },
      created() {
        const app = this;

        expect(app.$localStorage).toBeInstanceOf(WebStorage);
        expect(app.$localStorage.prefix).toEqual('vue_');
        done()
      }
    });
    wrapper.use(VueWebStoragePlugin, {
      prefix: 'vue_'
    });
    wrapper.mount('body')
  });

  test('multiple drivers', (done) => {

    const wrapper = createApp({
      render() {
        return null
      },
      created() {
        const app = this;

        // Prefix will be same for both
        expect(app.$localStorage.prefix).toEqual('app_');
        expect(app.$sessionStorage.prefix).toEqual('app_');

        // Both names should be registered
        expect(app.$localStorage).toBeInstanceOf(WebStorage);
        expect(app.$sessionStorage).toBeInstanceOf(WebStorage);
        done()
      }
    });

    wrapper.use(VueWebStoragePlugin, {
      drivers: ['local', 'session']
    });
    wrapper.mount('body')
  });

});
