import {parseJSON} from "./util";

class Storage {

  constructor(prefix = 'app_', driver = 'local') {
    this.prefix = prefix;
    this.storage = window[`${driver}Storage`];
  }

  prefixKey(key) {
    return this.prefix + String(key)
  }

  set(key, value) {
    try {
      this.storage.setItem(this.prefixKey(key), JSON.stringify(value));
      return true;
    } catch (e) /*istanbul ignore next*/ {
      console.error(e);
      return false;
    }
  }

  get(key, defaultValue = null) {
    let storedValue = this.storage.getItem(this.prefixKey(key));
    if (storedValue !== null) {
      return parseJSON(storedValue)
    }
    return defaultValue;
  }

  remove(key) {
    return this.storage.removeItem(this.prefixKey(key));
  }

  clear(force = false) {
    if (force) {
      this.storage.clear();
    } else {
      this.keys(true).map((key) => {
        this.storage.removeItem(key);
      });
    }
  }

  keys(withPrefix = false) {
    const keys = [];

    // Loop through all storage keys
    Object.keys(this.storage).forEach((keyName, index) => {
      /* istanbul ignore else */
      if (keyName.substr(0, this.prefix.length) === this.prefix) {
        keys.push(withPrefix ? keyName : keyName.substring(this.prefix.length));
      }
    });

    return keys;
  }

  hasKey(key) {
    return this.keys().indexOf(key) !== -1;
  }

  length() {
    return this.keys().length;
  }
}

export default Storage
