export default class Observer {
    constructor() {
        this.state = {
            mainTab: 'sandwiches',
            modalTab: 'sizes',
            customSandwich: {},
            shoppingCart: [],
            openModal: false
        };
        // this.observers = [];
        this.observers = [];
    }

    subscribe(fn) {
        this.observers.push(fn);
    }

    // unsubscribe(fn) {
    //   this.observers = this.observers.filter((subscriber) => subscriber !== fn);
    // }

    notify(data) {
        Object.assign(this.state, data);
        this.observers.forEach((subscriber) => subscriber(this.state));
    }
}
