import {parseJSON} from './util';
import {listenerCallback, listenersPool} from './interfaces';

let listeners: listenersPool = {};

export default class Events {

  constructor() {
    window.addEventListener('storage', this.onChange, false);
  }

  private onChange(event: StorageEvent): void {
    // According to specs the key can be `null`
    if (!event.key) return;

    // Notice: `this` refers to `window` inside this method
    let methods = listeners[event.key];
    /*istanbul ignore else*/
    if (methods) {
      let newValue = parseJSON(event.newValue);
      let oldValue = parseJSON(event.oldValue);

      methods.map((method: (...args: any) => void) => {
        method.call(this, newValue, oldValue, event.url);
      });
    }
  }

  on(key: string, fn: listenerCallback): void {
    if (listeners[key]) {
      listeners[key].push(fn);
    } else {
      listeners[key] = [fn];
    }
  }

  off(key: string, fn: listenerCallback): void {
    let methods = listeners[key];
    if (methods && methods.length > 1) {
      methods.splice(methods.indexOf(fn), 1);
    } else {
      delete listeners[key];
    }
  }

  clear(key: string | false): void {
    if (key) {
      delete listeners[key];
    } else {
      listeners = {};
    }
  }

  listeners(): listenersPool {
    return listeners;
  }
}

