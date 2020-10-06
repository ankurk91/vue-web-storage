import { parseJSON } from './util';

class Storage {

  public prefix;
  public storage: any;

  constructor(prefix = 'app_', driver = 'local') {
    this.prefix = prefix;
    // @ts-ignore
    this.storage = window[`${String(driver)}Storage`];
  }

  prefixKey(key: any) {
    return this.prefix + String(key)
  }

  set(key: any, value: any) {
    try {
      this.storage.setItem(this.prefixKey(key), JSON.stringify(value));
      return true;
    } catch (e) /*istanbul ignore next*/ {
      console.error(e);
      return false;
    }
  }

  get(key: any, defaultValue = null) {
    let storedValue: null | any = null;
    const item = this.storage.getItem(this.prefixKey(key));
    if (!!item) {
      storedValue = parseJSON(item);
    }
    return storedValue === null ? defaultValue : storedValue;
  }

  remove(key: any) {
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
    const keys: any[] = [];

    // Loop through all storage keys
    Object.keys(this.storage).forEach((keyName) => {
      /* istanbul ignore else */
      if (keyName.substr(0, this.prefix.length) === this.prefix) {
        keys.push(withPrefix ? keyName : keyName.substring(this.prefix.length));
      }
    });

    return keys;
  }

  hasKey(key: any) {
    return this.keys().indexOf(key) !== -1;
  }

  length() {
    return this.keys().length;
  }
}

export default Storage
