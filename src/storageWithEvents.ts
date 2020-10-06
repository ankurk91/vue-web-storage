import Storage from './storage';
import Events from './events';

class StorageWithEvents extends Storage {

  public events: Events;

  constructor(prefix = 'app_', driver = 'local') {
    super(prefix, driver);
    this.events = new Events();
  }

  on(key: any, fn: any) {
    this.events.on(this.prefixKey(key), fn);
    return this;
  }

  off(key: any, fn: any) {
    this.events.off(this.prefixKey(key), fn);
    return this;
  }

  clearEvents(key: any = null) {
    let mayBeKey = key ? this.prefixKey(key) : false;
    this.events.clear(mayBeKey);
    return this;
  }
}

export default StorageWithEvents
