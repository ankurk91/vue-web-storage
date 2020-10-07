export type listenerCallback = (...args: any) => any
export type listeners = { [key: string]: listenerCallback[] }
export type driverType = 'local' | 'session'
