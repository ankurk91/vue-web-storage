# Vue Web Storage

[![downloads](https://badgen.net/npm/dt/vue-web-storage)](http://npm-stats.com/~packages/vue-web-storage)
[![npm-version](https://badgen.net/npm/v/vue-web-storage)](https://www.npmjs.com/package/vue-web-storage)
[![github-tag](https://badgen.net/github/tag/ankurk91/vue-web-storage)](https://github.com/ankurk91/vue-web-storage/)
[![license](https://badgen.net/github/license/ankurk91/vue-web-storage)](https://yarnpkg.com/en/package/vue-web-storage)
[![tests](https://github.com/ankurk91/vue-web-storage/workflows/tests/badge.svg)](https://github.com/ankurk91/vue-web-storage/actions)
[![codecov](https://codecov.io/gh/ankurk91/vue-web-storage/branch/master/graph/badge.svg)](https://codecov.io/gh/ankurk91/vue-web-storage)
![ts](https://badgen.net/badge/ready/TypeScript/blue)

A minimalistic Vue.js plugin for web storage

## Features
* Choose either `localStorage` or `sessionStorage` or both
* Prefix all of your stored keys
* Auto `JSON.stringify` and `JSON.parse`
* Events for cross tab communication

## Installation
```bash
# yarn
yarn add vue-web-storage

# npm
npm install vue-web-storage
```

## Usage
```js
import Vue from 'vue';
import Storage from 'vue-web-storage';  
Vue.use(Storage); 
// Use as
// Vue.$localStorage
```

## Configuration (optional)
```js
Vue.use(Storage, {
  prefix: 'your_app_slug_',// default `app_`
  drivers: ['session','local'], // default 'local'
});

// This will register two instances
// Vue.$sessionStorage
// Vue.$localStorage
```

### Methods
All methods take care of `prefix` in key name, so you no need to specify key prefix when using them.

#### `set(key,value)`
Stores the `value` under specified `key` in storage. Convert value to JSON before saving.
Returns `true` on success and `false` on errors.
```js
Vue.$localStorage.set('name', 'john')
Vue.$localStorage.set('isAdmin', true)
Vue.$localStorage.set('roles', ['admin', 'sub-admin'])
Vue.$localStorage.set('permission', {id: 2, slug: 'edit_post'})
```
#### `get(key, ?defaultValue = null)`
Retrieves given `key` value from storage, parse the value from JSON before returning.
If parsing failed then returns the actual value get from storage.
```js
Vue.$localStorage.get('name')
Vue.$localStorage.get('doesNotExistsInStorage','defaultValue')
```
#### `remove(key)`
Removes the `key` from storage. 
```js
Vue.$localStorage.remove('name')
```
#### `clear(?force = false)`
Removes all keys from storage. Passing `true` will clear whole storage without taking `prefix` into consideration.
```js
Vue.$localStorage.clear()
```
#### `keys(?withPrefix = false)`
Returns array of keys stored in storage. Passing `true` will return prefixed key names.
```js
Vue.$localStorage.keys()
```
#### `hasKey(key)`
Returns `true` if key exists in storage regardless of its value.
```js
Vue.$localStorage.hasKey('name')
```
#### `length()`
Returns the number of keys stored in storage.
```js
Vue.$localStorage.length()
```

### Events
* :bulb: These are not regular Vue.js events, these [events](https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent) to be used for cross tab communication.

#### `on(key,fn)`
Attaches a listener method to the given key. You can attach multiple methods on the same key.
```js
const onChangeName = (newValue, OldValue, url) => {
  // do something when `name` value gets changed
};
Vue.$localStorage.on('name', onChangeName);
Vue.$localStorage.on('name', this.anotherMethod)
```
#### `off(key,fn)`
Removes specified listener method form the given key.
```js
Vue.$localStorage.off('name', this.onChangeName)
```
#### `clearEvents(?key)`
* Removes all listeners for the given key otherwise clears the listeners pool when key not specified.
```js
Vue.$localStorage.clearEvents('name');
Vue.$localStorage.clearEvents()
```

## Install in non-module environments (without webpack)
```html
<!-- Vue js -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6"></script>
<!-- Lastly add this package -->
<script src="https://cdn.jsdelivr.net/npm/vue-web-storage@4"></script>
<!-- Init the plugin -->
<script>
Vue.use(VueWebStorage.default)
</script>
```

## Testing
* This package is using [Jest](https://github.com/facebook/jest) for testing
* Tests can be found in `__test__` folder.
* Execute tests with this command `yarn test`

## Resources
* [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
* [Browser support status](https://caniuse.com/#feat=namevalue-storage)
* [Web Storage Quota](https://www.html5rocks.com/en/tutorials/offline/quota-research/)
* [Storage Event Example](https://html5demos.com/storage-events/)

## Changelog
Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## License
[MIT](LICENSE.txt) License
