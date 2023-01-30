import ShopingCart from "./components/ShopingCart/ShopingCart";
import Modal from "./components/Modal/Modal";
import SideBar from "./components/SideBar/SideBar";
import CardProduct from "./components/CardProduct/CardProduct";

const rootElement = document.querySelector("#root");

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
    new CardProduct("products_board").render()
  }
}
