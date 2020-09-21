import {Vue, VueConstructor} from 'vue/types/vue'

export interface VueWebStorage {
  /**
   * Stores the value under specified key in storage.
   * Convert value to JSON before saving. Returns true on success and false on errors.
   */
  set: (key: string, value: any) => boolean

  /**
   * Retrieves given key value from storage, parse the value from JSON before returning.
   * If parsing failed then returns the actual value get from storage.
   */
  get: (key: string, defaultValue?: any) => any

  /** Removes the key from storage. */
  remove: (key: string) => void

  /** Removes all keys from storage */
  clear: (force?: boolean) => void

  /** Returns array of keys stored in storage. Passing true will return prefixed key names. */
  keys: (withPrefix?: boolean) => string[]

  /** Returns true if key exists in storage regardless of its value. */
  hasKey: (key: string) => boolean

  /** Returns the number of keys stored in storage. */
  length: () => number

  // Events: These are not regular Vue.js events, these events to be used for cross tab communication.

  /** Attaches a listener method to the given key. You can attach multiple methods on the same key. */
  on: (key: string, callback: (newValue: any, OldValue: any, url: any) => void) => void

  /** Removes specified listener method form the given key. */
  off: (key: string, callback: (newValue: any, OldValue: any, url: any) => void) => void

  /**
   * Removes all listeners for the given key otherwise clears the listeners pool when
   * key not specified.
   */
  clearEvents: (key?: string) => void
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $sessionStorage: VueWebStorage
    readonly $localStorage: VueWebStorage
  }

  interface VueConstructor {
    readonly $sessionStorage: VueWebStorage
    readonly $localStorage: VueWebStorage
  }
}

export default VueWebStorage
