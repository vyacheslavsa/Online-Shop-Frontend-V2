import ShopingCart from "./components/ShopingCart/ShopingCart";
import Modal from "./components/Modal/Modal";
import SideBar from "./components/SideBar/SideBar";
import ProductCards from "./components/ProductCards/ProductCards";
import Observer from "./Observer";

const rootElement = document.querySelector("#root");
export const observer = new Observer();

export default class App {
  render() {
    let element = `
          <header>
              <h1>СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>
          </header>
          <div class="container">
              <div class="left_content">
              <aside class="side_bar"></aside>
              <div class="shopping_cart"></div>
          </div>
          <main class="products_board"></main>
          <div class="modal_bg"></div>
          `;

    rootElement.innerHTML = element;

    new SideBar("side_bar").render();
    new ShopingCart("shopping_cart").render();
    new Modal("modal_bg").render();
    new ProductCards("products_board").render()
  }
}
