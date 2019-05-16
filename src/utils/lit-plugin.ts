export function customElement(tagName: string) {
  return (classOrDescriptor: any) => {
    return classOrDescriptor;
  };
}

export function property<T>(options?: IPropertyDeclaration<T>) {
  return (protoOrDescriptor: any, name?: PropertyKey): any =>
    createProperty(options!, protoOrDescriptor, name);
}

function createProperty(
  options: IPropertyDeclaration = defaultPropertyDeclaration,
  proto: any,
  name: PropertyKey
) {
  let defaultValue =
    typeof options.value !== 'undefined' ? options.value : proto[name];
  const type = options.type;
  const newName = Symbol(`${name.toString()}`);
  proto[newName] = defaultValue;
  Object.defineProperty(proto, name, {
    get() {
      return this[newName];
    },
    set(nv: any) {
      this[newName] = type(nv, type);
    },
    configurable: true
  });
}

type Convert<T = any> = (...args: any[]) => T;

/**
 * Defines options for a property accessor.
 */
export interface IPropertyDeclaration<T = any> {
  readonly type?: Convert<T>;
  readonly value?: T;
}

const defaultPropertyDeclaration: IPropertyDeclaration<string> = {
  type: String
};
