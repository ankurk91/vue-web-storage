# Vue Web Storage

[![downloads](https://badgen.net/npm/dt/vue-web-storage)](http://npm-stats.com/~packages/vue-web-storage)
[![npm-version](https://badgen.net/npm/v/vue-web-storage)](https://www.npmjs.com/package/vue-web-storage)
[![github-tag](https://badgen.net/github/tag/ankurk91/vue-web-storage)](https://github.com/ankurk91/vue-web-storage/)
[![license](https://badgen.net/github/license/ankurk91/vue-web-storage)](https://yarnpkg.com/en/package/vue-web-storage)
[![tests](https://github.com/ankurk91/vue-web-storage/workflows/tests/badge.svg)](https://github.com/ankurk91/vue-web-storage/actions)
[![codecov](https://codecov.io/gh/ankurk91/vue-web-storage/branch/master/graph/badge.svg)](https://codecov.io/gh/ankurk91/vue-web-storage)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)

A minimalistic Vue.js plugin for web storage

### Version matrix
| Vue.js version | Package version | Branch          |
| :---           | :---:           | ---:           | 
| 2.x            | 5.x             | [5.x](https://github.com/ankurk91/vue-web-storage/tree/v5.x) |
| 3.x            | 6.x             | master          |

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
import {createApp} from 'vue';
import StoragePlugin from 'vue-web-storage';  
const app = createApp({}).mount('#app')
app.use(StoragePlugin); 
// Use as
// this.$localStorage
```

## Configuration (optional)
```js
app.use(StoragePlugin, {
  prefix: 'your_app_slug_',// default `app_`
  drivers: ['session', 'local'], // default 'local'
});

// It will register two different instances
// this.$sessionStorage
// this.$localStorage
```

### Methods
All methods take care of `prefix` in key name, so you no need to specify the prefix when using them.

#### `set(key,value)`
Stores the `value` under specified `key` in storage. Convert value to JSON before saving.
This method throws error on failure.
```js
this.$localStorage.set('name', 'john')
this.$localStorage.set('isAdmin', true)
this.$localStorage.set('roles', ['admin', 'sub-admin'])
this.$localStorage.set('permission', {id: 2, slug: 'edit_post'})
```
#### `get(key, ?defaultValue = null)`
Retrieves given `key` value from storage, parse the value from JSON before returning.
If parsing failed then throws error.
```js
this.$localStorage.get('name')
this.$localStorage.get('doesNotExistsInStorage','defaultValue')
```
#### `remove(key)`
Removes the individual `key` from storage. 
```js
this.$localStorage.remove('name')
```
#### `clear(?force = false)`
Removes all keys from storage. Passing `true` will clear whole storage without taking `prefix` into consideration.
```js
this.$localStorage.clear()
```
#### `keys(?withPrefix = false)`
Returns array of keys stored in storage. Passing `true` will return prefixed key names.
```js
this.$localStorage.keys()
```
#### `hasKey(key)`
Returns `true` if key exists in storage regardless of its value.
```js
this.$localStorage.hasKey('name')
```
#### `length()`
Returns the number of keys stored in storage.
```js
this.$localStorage.length()
```

### Events
* :bulb: These are not regular Vue.js events, these [events](https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent) to be used for cross tab communication.

#### `on(key,fn)`
Attaches a listener method to the given key. You can attach multiple methods on the same key.
```js
const onChangeName = (newValue, OldValue, originUrl) => {
  // do something when `name` value gets changed
};
this.$localStorage.on('name', onChangeName);
this.$localStorage.on('name', this.anotherMethod)
```
#### `off(key,fn)`
Removes specified listener method form the given key.
```js
this.$localStorage.off('name', this.onChangeName)
```
#### `clearEvents(?key)`
* Removes all listeners for the given key otherwise clears the listeners pool when key not specified.
```js
this.$localStorage.clearEvents('name');
this.$localStorage.clearEvents()
```

## Install in non-module environments (without webpack)
```html
<!-- Vue js -->
<script src="https://cdn.jsdelivr.net/npm/vue@3"></script>
<!-- Lastly add this package -->
<script src="https://cdn.jsdelivr.net/npm/vue-web-storage@6"></script>
<!-- Init the plugin -->
<script>
yourApp.use(VueWebStorage.default)
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
