import WebStorage from './webStorage';
import Events from './events';
import {driverType, listenerCallback} from './interfaces';

export default class StorageWithEvents extends WebStorage {

  public readonly events: Events;

  constructor(prefix = 'app_', driver: driverType = 'local') {
    super(prefix, driver);
    this.events = new Events();
  }

  on(key: string, fn: listenerCallback): this {
    this.events.on(this.prefixKey(key), fn);
    return this;
  }

  off(key: string, fn: listenerCallback): this {
    this.events.off(this.prefixKey(key), fn);
    return this;
  }

  clearEvents(key?: string): this {
    let mayBeKey = key ? this.prefixKey(key) : false;
    this.events.clear(mayBeKey);
    return this;
  }
}
