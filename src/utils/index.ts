const localcache = new Map();

export function cache(key: string, value: any) {
  localcache.set(key, value);
}

export function getCache(key: string) {
  return localcache.get(key);
}

const interceptorMethods = ['fail', 'success', 'complete'];

/**
 * 将方法promise化
 * 替换['fail', 'success', 'complete']
 * @param method
 */
export function promisify<T>(method: any, params: any): Promise<T> {
  if (typeof method !== 'function') {
    throw new Error('method is not a function.');
  }

  return new Promise((resolve, reject) => {
    interceptorMethods.forEach(key => {
      params[key] = (res: any) => {
        if (key === 'success') {
          resolve(res);
        } else if (key === 'fail') {
          reject(res);
        }
      };
    });
    method(params);
  });
}
