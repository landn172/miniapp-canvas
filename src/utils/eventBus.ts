export default class EventBus {
  // tslint:disable-next-line:variable-name
  private _stores: any = {};
  protected on(event: string, fn: () => any, ctx?: any) {
    if (typeof fn !== 'function') {
      console.error('fn must be a function');
      return;
    }
    this._stores[event] = this._stores[event] || [];
    this._stores[event].push({
      ctx,
      cb: fn
    });
  }

  protected once(event: string, fn: () => any, ctx?: any) {
    this.on(event, fn, ctx);
    this.on(event, () => {
      this.off(event, fn);
    });
  }

  protected emit(event: string, ...args: any[]) {
    let store = this._stores[event];
    if (store) {
      store = store.slice(0);
      for (let i = 0, len = store.length; i < len; i++) {
        store[i].cb.apply(store[i].ctx, args);
      }
    }
  }

  protected off(event: string, fn?: () => any) {
    // specific event
    const store = this._stores[event];
    if (!store) {
      return;
    }
    // remove all handlers
    if (arguments.length === 1) {
      delete this._stores[event];
      return;
    }
    // remove specific handler
    let cb;
    for (let i = 0, len = store.length; i < len; i++) {
      cb = store[i].cb;
      if (cb === fn) {
        store.splice(i, 1);
        break;
      }
    }
    return;
  }
}
