export default class Observer {
  constructor() {
    this.state = {
      currentTab: 'pizza',
      test: 0
    };
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  notify(data) {
    Object.assign(this.state, data);
    this.observers.forEach((subscriber) => subscriber(this.state));
  }
}
