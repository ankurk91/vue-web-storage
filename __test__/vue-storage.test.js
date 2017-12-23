import {Storage, Plugin as VueWebStorage} from '../src/index';
// Lets import full build
import Vue from 'vue/dist/vue.common';

Vue.config.productionTip = false;

describe('Vue Storage plugin', () => {


  test('Vue.$storage', () => {
    Vue.use(VueWebStorage);

    expect(Vue.$storage).toBeInstanceOf(Storage);
  });

  test('Vue.$storage methods', () => {
    Vue.use(VueWebStorage);

    expect(Vue.$storage.set).toBeDefined();
    expect(Vue.$storage.get).toBeDefined();
    expect(Vue.$storage.on).toBeDefined();
    expect(Vue.$storage.off).toBeDefined();
  });

  test('localVue.$storage', () => {
    let localVue = Vue.extend();
    localVue.use(VueWebStorage);

    expect(localVue.$storage).toBeInstanceOf(Storage);
  });

  test('parameters', () => {
    let localVue = Vue.extend();
    localVue.use(VueWebStorage, {
      prefix: 'vue_'
    });

    expect(localVue.$storage.prefix).toEqual('vue_');
  });

});
