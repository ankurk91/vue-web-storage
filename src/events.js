import {parseJSON} from "./util";

let listeners = {};

class Events {

  constructor() {
    window.addEventListener('storage', this.onChange, false);
  }

  onChange(event) {
    // Notice: `this` refers to `window` inside this method
    let methods = listeners[event.key];
    /*istanbul ignore else*/
    if (methods) {
      let newValue = parseJSON(event.newValue);
      let oldValue = parseJSON(event.oldValue);

      methods.map((method) => {
        method.call(this, newValue, oldValue, event.url);
      });
    }
  }

  on(key, fn) {
    if (listeners[key]) {
      listeners[key].push(fn);
    } else {
      listeners[key] = [fn];
    }
  }

  off(key, fn) {
    let methods = listeners[key];
    if (methods && methods.length > 1) {
      methods.splice(methods.indexOf(fn), 1);
    } else {
      delete listeners[key];
    }
  }

  clear(key) {
    if (key) {
      delete listeners[key];
    } else {
      listeners = {}
    }
  }

  listeners() {
    return listeners;
  }
}

export default Events;
