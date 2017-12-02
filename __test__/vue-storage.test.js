import {Storage, Plugin as VueWebStorage} from '../src/index';
// Lets import full build
import Vue from 'vue/dist/vue.common';

Vue.config.productionTip = false;

describe('Vue Storage plugin', () => {


  test('Vue.$storage', () => {
    Vue.use(VueWebStorage);

    expect(Vue.$storage instanceof Storage).toBe(true);
  });

  test('localVue.$storage', () => {
    let localVue = Vue.extend();
    localVue.use(VueWebStorage);

    expect(localVue.$storage instanceof Storage).toBe(true);
  });

  test('parameters', () => {
    let localVue = Vue.extend();
    localVue.use(VueWebStorage, {prefix: 'vue_'});

    expect(localVue.$storage.prefix).toEqual('vue_');
  });

});
