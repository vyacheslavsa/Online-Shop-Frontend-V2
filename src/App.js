import ShopingCart from "./components/ShoppingCart/ShoppingCart";
import Modal from "./components/Modal/Modal";
import SideBar from "./components/SideBar/SideBar";
import ProductCards from "./components/ProductCards/ProductCards";
import Observer from "./Observer";
import data from './assets/data.json'
import {CATEGORY} from "./constans";

const rootElement = document.querySelector("#root");
export const observer = new Observer();

const generateID = () => String(Math.round(Math.random() * 10000000000000000000));
const addID = (arr) => arr.map((item) => (item.productID = generateID()));

export default class App {
    constructor() {
        this.createID()
        observer.subscribe(()=>{
            this.render()
        }, ['openModal'])
    }

    createID() {
        CATEGORY.forEach((item) => {
            const newArr = [];
            for (const key in data[item]) {
                newArr.push(data[item][key]);
            }
            data[item] = newArr;
        });

        CATEGORY.push("menu");
        CATEGORY.forEach((item) => addID(data[item]));
        CATEGORY.splice(-1, 1);

        data.menu.forEach(item => item.count = 1)
    }

    render() {
        rootElement.innerHTML = `
          <header>
              <h1>СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>
          </header>
          <div class="container">
              <div class="left_content">
              <aside class="side_bar"></aside>
              <div class="shopping_cart"></div>
          </div>
          <main class="products_board"></main>
          <div class="modal_bg ${observer.state.openModal ? 'open_modal' : ''}"></div>
          `;

        new SideBar("side_bar").render();
        new ProductCards("products_board").render()
        new ShopingCart("shopping_cart").render();
        new Modal("modal_bg").render();
    }
}
