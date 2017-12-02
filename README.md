# Vue-web-storage

[![vue-js](https://img.shields.io/badge/vue.js-2.x-brightgreen.svg?maxAge=604800)](https://vuejs.org/)
[![downloads](https://img.shields.io/npm/dt/vue-web-storage.svg)](http://npm-stats.com/~packages/vue-web-storage)
[![npm-version](https://img.shields.io/npm/v/vue-web-storage.svg)](https://www.npmjs.com/package/vue-web-storage)
[![github-tag](https://img.shields.io/github/tag/ankurk91/vue-web-storage.svg?maxAge=1800)](https://github.com/ankurk91/vue-web-storage/)
[![license](https://img.shields.io/github/license/ankurk91/vue-web-storage.svg?maxAge=1800)](https://yarnpkg.com/en/package/vue-web-storage)
[![build-status](https://travis-ci.org/ankurk91/vue-web-storage.svg?branch=master)](https://travis-ci.org/ankurk91/vue-web-storage)
[![codecov](https://codecov.io/gh/ankurk91/vue-web-storage/branch/master/graph/badge.svg)](https://codecov.io/gh/ankurk91/vue-web-storage)

Vue.js v2.x plugin for web storage

## Features
* Choose between `localStorage` or `sessionStorage`
* Prefix all of your stored keys
* Auto `JSON.stringify` and `JSON.parse`

## Installation
```bash
# npm
npm install vue-web-storage --save

# Yarn
yarn add vue-web-storage
```

## Usage
```js
import Vue from 'vue';
import Storage from 'vue-web-storage';  
Vue.use(Storage);  
```

## Configuration
```js
Vue.use(Storage, {
  prefix: 'your_app_name',// default `app_`
  driver: 'session', // default 'local'
})
```

### Methods
#### `set(key,value)`
```js
Vue.$storage.set('name', 'john')
Vue.$storage.set('isAdmin', true)
Vue.$storage.set('roles', ['admin', 'sub-admin'])
Vue.$storage.set('permission', {id: 2, slug: 'edit_post'})
```
#### `get(key)`
```js
Vue.$storage.get('name')
```
#### `remove(key)`
```js
Vue.$storage.remove('name')
```
#### `clear()`
```js
Vue.$storage.clear()
```
#### `keys(withPrefix)`
```js
Vue.$storage.keys()
```
#### `hasKey(key)`
```js
Vue.$storage.hasKey('name')
```
#### `length()`
```js
Vue.$storage.length()
```

## Install in non-module environments (without webpack)
* Include required files
```html
<!-- Vue js -->
<script src="https://unpkg.com/vue@2.5/dist/vue.min.js"></script>
<!-- Lastly add this package -->
<script src="https://unpkg.com/vue-web-storage"></script>
```
* Initialize
```js
Vue.use(VueWebStorage)
```

## Testing
* This package is using [Jest](https://github.com/facebook/jest) for testing
* Tests can be found in `__test__` folder.
* Execute tests with this command `yarn test`

## Resources
* [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
* [Browser support status](https://caniuse.com/#feat=namevalue-storage), [Chrome](https://www.chromestatus.com/feature/5345825534246912), [Edge](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/webstorage/)
* [Web Storage Quota](https://www.html5rocks.com/en/tutorials/offline/quota-research/)

## License
[MIT](LICENSE.txt) License
