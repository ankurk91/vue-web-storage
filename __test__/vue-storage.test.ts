import {Storage, Plugin as VueWebStorage} from '../src';
// Lets import full build
// @ts-ignore
import Vue from 'vue/dist/vue.common';

Vue.config.productionTip = false;

describe('Vue Storage plugin', () => {

  test('no arguments', () => {
    let localVue = Vue.extend();
    localVue.use(VueWebStorage);

    expect(localVue.$localStorage.prefix).toEqual('app_');
    expect(localVue.$localStorage.set).toBeDefined();
    expect(localVue.$localStorage.get).toBeDefined();
    expect(localVue.$localStorage.on).toBeDefined();
    expect(localVue.$localStorage.off).toBeDefined();
  });

  test('custom prefix with default driver', () => {
    let localVue = Vue.extend();
    localVue.use(VueWebStorage, {
      prefix: 'vue_'
    });

    expect(localVue.$localStorage).toBeInstanceOf(Storage);
    expect(localVue.$localStorage.prefix).toEqual('vue_');
  });

  test('multiple drivers', () => {
    let localVue = Vue.extend();
    localVue.use(VueWebStorage, {
      drivers: ['local', 'session'],
    });

    // Prefix will be same for both
    expect(localVue.$localStorage.prefix).toEqual('app_');
    expect(localVue.$sessionStorage.prefix).toEqual('app_');

    // Both names should be registered
    expect(localVue.$localStorage).toBeInstanceOf(Storage);
    expect(localVue.$sessionStorage).toBeInstanceOf(Storage);
  });

});
