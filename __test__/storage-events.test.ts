import StorageWithEvents from '../src/storageWithEvents';

// js-dom does not support `StorageEvent`
const mockStorageEvent = (key: string) => {
  let event: any = new Event('storage');
  event.key = key;
  event.newValue = +new Date();
  event.oldValue = +new Date();

  window.dispatchEvent(event)
};

describe('Storage events', () => {

  let ls: StorageWithEvents;

  beforeEach(() => {
    ls = new StorageWithEvents(
      'app_',
      'local'
    );
  });

  afterEach(() => {
    ls.clear(true);
  });

  test('calls registered method upon storage event', () => {
    ls.set('logged_in', false)

    let mockFn = jest.fn();
    ls.on('logged_in', mockFn);
    mockStorageEvent('app_logged_in');

    expect(mockFn).toHaveBeenCalled();
    jest.resetAllMocks();

    // Attach one more method
    let mockFn2 = jest.fn();
    ls.on('logged_in', mockFn2);
    mockStorageEvent('app_logged_in');

    expect(mockFn).toHaveBeenCalled();
    expect(mockFn2).toHaveBeenCalled();
  });

  test('does not call registered method upon removal', () => {
    let mockFn = jest.fn();
    let mockFn2 = jest.fn();
    ls.on('logged_out', mockFn);
    ls.on('logged_out', mockFn2);

    // Calling both
    mockStorageEvent('app_logged_out');
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn2).toHaveBeenCalled();
    jest.resetAllMocks();

    // Removed first, kept second
    ls.off('logged_out', mockFn);
    mockStorageEvent('app_logged_out');
    expect(mockFn).not.toHaveBeenCalled();
    expect(mockFn2).toHaveBeenCalled();
    jest.resetAllMocks();

    // Removed second too
    ls.off('logged_out', mockFn2);
    mockStorageEvent('app_logged_out');
    expect(mockFn2).not.toHaveBeenCalled();
  });

  test('clear events for specific key', () => {
    let mockFn = jest.fn();
    let mockFn2 = jest.fn();
    ls.on('logged_out', mockFn);
    ls.on('logged_out', mockFn2);

    ls.clearEvents('logged_out');
    mockStorageEvent('app_logged_out');
    expect(mockFn).not.toHaveBeenCalled();
    expect(mockFn2).not.toHaveBeenCalled();
  });

  test('clear events for all keys', () => {
    let mockFn = jest.fn();
    let mockFn2 = jest.fn();
    ls.on('logged_out', mockFn);
    ls.on('logged_in', mockFn2);

    ls.clearEvents();
    mockStorageEvent('app_logged_out');
    expect(mockFn).not.toHaveBeenCalled();
    jest.resetAllMocks();

    mockStorageEvent('app_logged_in');
    expect(mockFn2).not.toHaveBeenCalled();
    expect(ls.events.listeners()['app_logged_in']).not.toBeDefined();
  });

});
