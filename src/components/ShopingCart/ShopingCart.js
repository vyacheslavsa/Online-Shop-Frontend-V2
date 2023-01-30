import "./ShopingCart.css";
import shopingCartLogo from "../../assets/i/shopping_cart.png";

export default class ShopingCart {
  constructor(selectorName) {
    this.selectorName = selectorName;
  }

  render() {
    const rootElement = document.querySelector(`.${this.selectorName}`);
    let element = `
        <div class="shopping_cart__header">
            <div class="shopping_cart__box_shadow"></div>
            <img src=${shopingCartLogo} alt="no_image_shop-card"/>
            <p class="shopping_cart__name">Корзина</p>
            </div>
            <div class="shopping_cart__columns">
            <p>Название</p>
            <p>Количество</p>
            </div>
            <div class="shopping_cart__content"></div>
            <div class="shopping_cart__footer">
            <p class="shopping_cart__price">Итого: 0 руб.</p>
        <button>ОФОРМИТЬ ЗАКАЗ</button>
        </div> `;

    rootElement.innerHTML = element;
  }
}
