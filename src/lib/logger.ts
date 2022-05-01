export class Logger {
  private cache: { [key: string]: any };

  constructor() {
    this.cache = {};
  }

  error(...args: any[]) {
    console.error(...args);
  }

  warn(...args: any[]) {
    console.warn(...args);
  }

  info(...args: any[]) {
    console.log(...args);
  }

  diff(key: string, obj: any) {
    if (this.cache[key] !== obj) {
      this.info(obj);
    }
    this.cache[key] = obj;
  }

  debug(...args: any[]) {
    console.debug(...args);
  }

  trace(...args: any[]) {
    console.trace(...args);
  }
}
