import {parseJSON} from './util';
import {driverType} from "./interfaces";

export default class WebStorage {

  public readonly storage: Storage;

  constructor(public readonly prefix = 'app_', driver: driverType = 'local') {
    this.storage = this.resolveDriver(driver);
  }

  prefixKey(key: string): string {
    return this.prefix + String(key)
  }

  set(key: string, value: any): void {
    return this.storage.setItem(this.prefixKey(key), JSON.stringify(value));
  }

  get<T extends any>(key: string, defaultValue: string | any = null): T {
    let storedValue: null | any = null;
    const item = this.storage.getItem(this.prefixKey(key));
    if (!!item) {
      storedValue = parseJSON(item);
    }
    return storedValue === null ? defaultValue : storedValue;
  }

  remove(key: string): void {
    return this.storage.removeItem(this.prefixKey(key));
  }

  clear(force = false): void {
    if (force) {
      this.storage.clear();
    } else {
      this.keys(true).map((key) => {
        this.storage.removeItem(key);
      });
    }
  }

  keys(withPrefix = false): string[] {
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

  hasKey(key: string): boolean {
    return this.keys().indexOf(key) !== -1;
  }

  length(): number {
    return this.keys().length;
  }

  private resolveDriver(driver: driverType): Storage {
    switch (driver) {
      case 'local':
        return window.localStorage;
      case 'session':
        return window.sessionStorage;
      default:
        throw new Error(`Unknown driver supplied: ${driver}`)
    }
  }
}
