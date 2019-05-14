const DEFAULT_MSG = 'This function will be removed in future versions.';

export function isDescriptor(desc: any) {
  if (!desc || !desc.hasOwnProperty) {
    return false;
  }

  const keys = ['value', 'initializer', 'get', 'set'];

  for (let i = 0, l = keys.length; i < l; i++) {
    if (desc.hasOwnProperty(keys[i])) {
      return true;
    }
  }

  return false;
}

function handleDescriptor(
  target: any,
  key: any,
  descriptor: PropertyDescriptor,
  [msg = DEFAULT_MSG, options = {} as any]
) {
  if (typeof descriptor.value !== 'function') {
    const { get, set } = descriptor;
    if (get) {
      descriptor.get = function() {
        return get.call(this);
      };
    }

    if (set) {
      descriptor.set = function(...args: any[]) {
        return set.apply(this, args);
      };
    }
    return {
      ...descriptor
    };
  }

  const methodSignature = `${target.constructor.name}#${key}`;

  if (options.url) {
    msg += `\n\n    See ${options.url} for more details.\n\n`;
  }

  return {
    ...descriptor,
    value: function deprecationWrapper() {
      console.warn(`DEPRECATION ${methodSignature}: ${msg}`);
      return descriptor.value.apply(this, arguments);
    }
  };
}

export function decorate(handleDescriptor: any, entryArgs: any[]) {
  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
    return handleDescriptor(...entryArgs, []);
  } else {
    return function() {
      return handleDescriptor(
        ...Array.prototype.slice.call(arguments),
        entryArgs
      );
    };
  }
}

export function deprecated(...args: any[]) {
  return decorate(handleDescriptor, args);
}
