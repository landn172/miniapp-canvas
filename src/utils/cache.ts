const localcache = new Map();

export function cache(key: string, value: any) {
  localcache.set(key, value);
}

export function getCache(key: string) {
  return localcache.get(key);
}

export function hasCache(key: string) {
  return localcache.has(key);
}
