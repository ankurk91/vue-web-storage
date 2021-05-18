import WebStorage from '../src/webStorage';

describe('Storage class', () => {

  let ws: WebStorage;

  beforeEach(() => {
    ws = new WebStorage(
      'app_',
      'local'
    );
  });

  afterEach(() => {
    ws.clear(true);
  });

  test('accepts prefix', () => {
    expect(ws.prefix).toEqual('app_');
  });

  test('can store strings', () => {
    let key = 'name';
    let value = 'john';

    ws.set(key, value);
    expect(ws.get(key)).toBe(value)
  });

  test('can store boolean', () => {
    let key = 'flag';
    let value = true;

    ws.set(key, value);
    expect(ws.get(key)).toBe(value)
  });

  test('can store objects', () => {
    let key = 'cat';
    let value = {id: 12, name: 'kitten'};

    ws.set(key, value);
    expect(ws.get(key)).toEqual(value)
  });


  test('can store arrays', () => {
    let key = 'ids';
    let value = [123, 456, 789];

    ws.set(key, value);
    expect(ws.get(key)).toEqual(value)
  });

  test('can store array of objects', () => {
    let key = 'cats';
    let value = [{id: 1, name: 'kitten'}, {id: 2, name: 'mum'}];

    ws.set(key, value);
    expect(ws.get(key)).toEqual(value)
  });

  test('can store null', () => {
    let key = 'nullable';
    let value = null;

    ws.set(key, value);
    expect(ws.get(key)).toBe(value)
  });

  test('can store numbers', () => {
    let key = 'age';
    let value = 26;

    ws.set(key, value);
    expect(ws.get(key)).toBe(value)
  });

  test('can remove stored key', () => {
    let key = 'age';
    let value = 26;

    ws.set(key, value);
    ws.remove(key);
    expect(ws.get(key)).toBe(null)
  });

  test('can empty storage', () => {
    ws.set('name', 'jest');
    ws.set('age', 26);
    ws.clear();

    expect(ws.get('age')).toBe(null);
    expect(ws.get('name')).toBe(null);
    expect(ws.length()).toEqual(0)
  });

  test('can get stored key names', () => {
    ws.set('name', 'jest');
    ws.set('age', 26);

    expect(ws.keys()).toEqual(['name', 'age'])
  });

  test('can check if key exits', () => {
    ws.set('name', 'jest');

    expect(ws.hasKey('name')).toBe(true);
    expect(ws.hasKey('unknown')).toBe(false)
  });

  test('throw error when fail to parse', () => {
    let value = 'was_stored_by_other_library_without_json_stringify';
    window.localStorage.setItem(ws.prefix + 'alien', value);

    expect(() => {
      ws.get('alien')
    }).toThrowError()
  });

  test('returns default value when key does not exists in storage', () => {
    let value = ws.get('keyThatDoesNotExists', 'defaultValue');

    expect(value).toEqual('defaultValue');
  });

  test('returns null when key does not exists in storage and default parameter not set', () => {
    let value = ws.get('keyThatDoesNotExists');

    expect(value).toEqual(null);
  });

  test('can store value that not expired', () => {
    let key = 'name';
    let value = 'john';
    let expire = 3600000

    ws.set(key, value, expire);
    expect(ws.get(key)).toBe(value)
  });

  test('can store value that expired', () => {
    let key = 'name';
    let value = 'john';
    let expire = -3600000

    ws.set(key, value, expire);
    expect(ws.get(key)).toBe(null)
    expect(ws.hasKey(key)).toBe(false);
  });


  test('it throw error for unknown driver type', () => {
    expect(() => {
      // @ts-ignore
      new WebStorage('app_', 'alien');
    }).toThrowError(/Unknown driver/);
  });
});
