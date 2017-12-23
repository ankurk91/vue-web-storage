import Storage from './storage';
import Events from './events';

class StorageWithEvents extends Storage {

  constructor(prefix = 'app_', driver = 'local') {
    super(prefix, driver);
    this.events = new Events();
  }

  on(key, fn) {
    this.events.on(this.prefixKey(key), fn)
  }

  off(key, fn) {
    this.events.off(this.prefixKey(key), fn)
  }

  clearEvents(key) {
    let mayBeKey = key ? this.prefixKey(key) : false;
    this.events.clear(mayBeKey)
  }
}

export default StorageWithEvents
