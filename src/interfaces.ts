export type listenerCallback = (newValue: any, OldValue: any, url: any) => void
export type listenersPool = { [key: string]: listenerCallback[] }
export type driverType = 'local' | 'session'
