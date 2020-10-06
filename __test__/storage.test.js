import Storage from '../src/web-storage';

describe('Storage class', () => {

  let ls;

  beforeEach(() => {
    ls = new Storage(
      'app_',
      'local'
    );
  });

  afterEach(() => {
    ls.clear(true);
  });

  test('accepts prefix', () => {
    expect(ls.prefix).toEqual('app_');
  });

  test('can store strings', () => {
    let key = 'name';
    let value = 'john';

    ls.set(key, value);
    expect(ls.get(key)).toBe(value)
  });

  test('can store boolean', () => {
    let key = 'flag';
    let value = true;

    ls.set(key, value);
    expect(ls.get(key)).toBe(value)
  });

  test('can store objects', () => {
    let key = 'cat';
    let value = {id: 12, name: 'kitten'};

    ls.set(key, value);
    expect(ls.get(key)).toEqual(value)
  });


  test('can store arrays', () => {
    let key = 'ids';
    let value = [123, 456, 789];

    ls.set(key, value);
    expect(ls.get(key)).toEqual(value)
  });

  test('can store array of objects', () => {
    let key = 'cats';
    let value = [{id: 1, name: 'kitten'}, {id: 2, name: 'mum'}];

    ls.set(key, value);
    expect(ls.get(key)).toEqual(value)
  });

  test('can store null', () => {
    let key = 'nullable';
    let value = null;

    ls.set(key, value);
    expect(ls.get(key)).toBe(value)
  });

  test('can store numbers', () => {
    let key = 'age';
    let value = 26;

    ls.set(key, value);
    expect(ls.get(key)).toBe(value)
  });

  test('can remove stored key', () => {
    let key = 'age';
    let value = 26;

    ls.set(key, value);
    ls.remove(key);
    expect(ls.get(key)).toBe(null)
  });

  test('can empty storage', () => {
    ls.set('name', 'jest');
    ls.set('age', 26);
    ls.clear();

    expect(ls.get('age')).toBe(null);
    expect(ls.get('name')).toBe(null);
    expect(ls.length()).toEqual(0)
  });

  test('can get stored key names', () => {
    ls.set('name', 'jest');
    ls.set('age', 26);

    expect(ls.keys()).toEqual(['name', 'age'])
  });

  test('can check if key exits', () => {
    ls.set('name', 'jest');

    expect(ls.hasKey('name')).toBe(true);
    expect(ls.hasKey('unknown')).toBe(false)
  });

  test('returns stored value when fail to parse', () => {
    let value = 'was_stored_by_other_library_without_json_stringify';
    window.localStorage.setItem(ls.prefix + 'alien', value);
    let spy = jest.spyOn(console, 'error');

    expect(ls.get('alien')).toEqual(value);
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
  });

  test('returns default value when key does not exists in storage', () => {
    let value = ls.get('keyThatDoesNotExists', 'defaultValue');

    expect(value).toEqual('defaultValue');
  });

  test('returns null when key does not exists in storage and default parameter not set', () => {
    let value = ls.get('keyThatDoesNotExists');

    expect(value).toEqual(null);
  });

});
