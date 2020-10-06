import { parseJSON } from './util';

let listeners: any[] = [];

class Events {

  constructor() {
    window.addEventListener('storage', this._onChange, false);
  }

  _onChange(event: any) {
    // Notice: `this` refers to `window` inside this method
    let methods = listeners[event.key];
    /*istanbul ignore else*/
    if (methods) {
      let newValue = parseJSON(event.newValue);
      let oldValue = parseJSON(event.oldValue);

      methods.map((method: any) => {
        method.call(this, newValue, oldValue, event.url);
      });
    }
  }

  on(key: any, fn: any) {
    if (listeners[key]) {
      listeners[key].push(fn);
    } else {
      listeners[key] = [fn];
    }
  }

  off(key: any, fn: any) {
    let methods = listeners[key];
    if (methods && methods.length > 1) {
      methods.splice(methods.indexOf(fn), 1);
    } else {
      delete listeners[key];
    }
  }

  clear(key: any) {
    if (key) {
      delete listeners[key];
    } else {
      listeners = [];
    }
  }

  listeners() {
    return listeners;
  }
}

export default Events;
