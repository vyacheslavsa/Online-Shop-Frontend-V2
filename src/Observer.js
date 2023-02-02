import data from './assets/data.json'

export default class Observer {
    constructor() {
        this.state = {
            data: data,
            mainTab: 'pizza',
            modalTab: 'sizes',
            customSandwich: {},
            shoppingCart: [],
            openModal: false,
        };
        this.observers = [];
    }

    subscribe(fn, deps = Object.keys(this.state)) {
        this.observers.push({
            deps: deps,
            fn: fn
        });
    }

    // unsubscribe(fn) {
    //   this.observers = this.observers.filter((subscriber) => subscriber !== fn);
    // }

    notify(data) {
        this.observers.forEach((subscriber) => {
            Object.keys(data).forEach(item => {
                if(subscriber.deps.includes(item)){
                    Object.assign(this.state, data);
                    subscriber.fn(this.state)
                }
            })
        });
    }
}
