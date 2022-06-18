class Queue {
  constructor() {
    this.storage = {};
    this.count = 0;
  }

  enqueue(value) {
    this.storage[this.count] = value;
    this.count++;
  }

  dequeue() {
    let keys = Object.keys(this.storage);
    if (keys.length === 0) {
      return 0;
    } else {
      let value = Object.values(this.storage)[0];
      delete this.storage[keys[0]];
      this.counter--;
      return value;
    }
  }

  size() {
    return Object.keys(this.storage).length;
  }

  peek() {
    let length = Object.values(this.storage).length;
    let value = Object.values(this.storage)[length - 1];
    return value;
  }
}

module.exports.Queue = Queue;