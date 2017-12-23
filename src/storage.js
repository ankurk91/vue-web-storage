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

  get(key) {
    return parseJSON(this.storage.getItem(this.prefixKey(key)));
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
    let fullKeyName, i;
    let storageLength = this.storage.length;
    // Loop through all storage keys
    for (i = 0; i < storageLength; i++) {
      fullKeyName = this.storage.key(i);
      // Check if key has prefix
      /* istanbul ignore else */
      if (fullKeyName.substr(0, this.prefix.length) === this.prefix) {
        keys.push(withPrefix ? fullKeyName : fullKeyName.substring(this.prefix.length));
      }
    }
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
