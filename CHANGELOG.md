# Changelog

## [6.0.0](https://github.com/ankurk91/vue-web-storage/compare/6.0.0...6.1.0)
* Add: `Provide / inject` feature when using the Composition API

## [6.0.0](https://github.com/ankurk91/vue-web-storage/compare/5.0.0...6.0.0)
* Drop support for Vue 2.x and add support for Vue 3.x

## [5.0.0](https://github.com/ankurk91/vue-web-storage/compare/4.0.2...5.0.0)
* Convert codebase to typescript
* Throw error when failed to parse stored value during `JSON.parse()`
* Throw error when failed to store value in storage during `JSON.stringify()`

## [4.0.2](https://github.com/ankurk91/vue-web-storage/compare/4.0.1...4.0.2)
* Fix issue [#13](https://github.com/ankurk91/vue-web-storage/issues/13)

## [4.0.1](https://github.com/ankurk91/vue-web-storage/compare/4.0.0...4.0.1)
* Add type definitions 

## [4.0.0](https://github.com/ankurk91/vue-web-storage/compare/3.0.0...4.0.0) 
* Add: ES6 named imports, allows you to consume package in a non Vue.js project
    - `import { StorageWithEvents } from 'vue-web-storage'`
    
## [3.0.0](https://github.com/ankurk91/vue-web-storage/compare/2.1.0...3.0.0) 
* Add: allow multiple drivers, [#4](https://github.com/ankurk91/vue-web-storage/issues/4)
    - Read the [upgrade](UPGRADING.md) guide to restore old behaviour
    
## [2.1.0](https://github.com/ankurk91/vue-web-storage/compare/2.0.2...2.1.0) 
* Add: defaultValue to `.get(key,defaultValue)` method

## [2.0.2](https://github.com/ankurk91/vue-web-storage/compare/2.0.1...2.0.2) 
* Add: allow chaining on `event` related methods
* Chore: webpack 4

## [2.0.1](https://github.com/ankurk91/vue-web-storage/compare/2.0.0...2.0.1) 
* Minor update 

## [2.0.0](https://github.com/ankurk91/vue-web-storage/compare/1.0.0...2.0.0) 
* Add events
* Add a method to clear all storage

## 1.0.0
* Initial release
