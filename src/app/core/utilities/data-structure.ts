export class Map<T> {
  private items: { [key: string]: T };

  constructor() {
    this.items = {};
  }

  add(key: string, value: T): T {
    this.items[key] = value;
    return this.items[key];
  }

  remove(key: string): void {
    delete this.items[key];
  }

  has(key: string): boolean {
    return key in this.items;
  }

  get(key: string): T {
    return this.items[key];
  }

  getLast(): T {
    const arr = this.asArray();
    if (arr.length) {
      return arr[arr.length - 1];
    }
    return null;
  }

  asArray() {
    const array = [];
    if (this.items) {
      for (const key in this.items) {
        if (this.items[key]) {
          array.push(this.get(key));
        }
      }
    }

    return array;
  }

  keySet(): Array<string> {
    const array = [];
    for (const key in this.items) {
      if (key) {
        array.push(key);
      }
    }
    return array;
  }
}

export class List<T> {
  private items: Array<T>;

  constructor() {
    this.items = [];
  }

  size(): number {
    return this.items.length;
  }

  add(value: T): void {
    this.items.push(value);
  }

  get(index: number): T {
    return this.items[index];
  }

  getItems(): Array<T> {
    if (!this.items) {
      this.items = [];
    }
    return this.items;
  }
}
