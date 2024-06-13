import StorageKey from '~/models/StorageKey';

const StorageUtils = {
  get: (key: StorageKey) => localStorage.getItem(key),

  set: (key: StorageKey, value: string) => localStorage.setItem(key, value),

  remove: (key: StorageKey) => localStorage.removeItem(key),
};

export default StorageUtils;
