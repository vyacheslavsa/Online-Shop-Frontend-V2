import "./ShoppingCart.css";
import shoppingCartLogo from "../../assets/i/shopping_cart.png";
import {observer} from "../../App";

export default class ShoppingCart {
  constructor(selectorName) {
    this.selectorName = selectorName;
    observer.subscribe(() => this.render())
  }

  addEvents(){
    const allButtonsDelete = document.querySelectorAll('.shopping_cart__item')
    for (let i = 0; i < allButtonsDelete.length; i++) {
      allButtonsDelete[i].addEventListener('click', () => {
        const copyArr = [...observer.state.shoppingCart]
        const index = observer.state.shoppingCart.findIndex(item => item.productID === allButtonsDelete[i].id)
        copyArr.splice(index,1)
        observer.notify({shoppingCart: copyArr})
      })
    }
  }

  calculatePrice(){
    let sum = 0
    if(observer.state.shoppingCart.length){
      const arrPrice = observer.state.shoppingCart.map(item => item.price*item.count)
      sum = arrPrice.reduce((acc,cur) => acc+cur)
    }
    return sum;
  }

  renderContent(){
    let html = ''

    observer.state.shoppingCart.forEach(item => html += `
        <div class="shopping_cart__item" id=${item.productID}>
        <p>${item.name}</p>
        <div>
          <p>${item.count}</p>
          <img class="shopping_cart__delete_icon" src="/i/trash_icon.png" />
        </div>
      </div>
    `)

    return html
  }

  render() {
    const rootElement = document.querySelector(`.${this.selectorName}`);
    const html = `
        <div class="shopping_cart__header">
            <div class="shopping_cart__box_shadow"></div>
            <img src=${shoppingCartLogo} alt="no_image_shop-card"/>
            <p class="shopping_cart__name">Корзина</p>
            </div>
            <div class="shopping_cart__columns">
            <p>Название</p>
            <p>Количество</p>
            </div>
            <div class="shopping_cart__content">${this.renderContent()}</div>
            <div class="shopping_cart__footer">
            <p class="shopping_cart__price">Итого: ${this.calculatePrice()} руб.</p>
        <button>ОФОРМИТЬ ЗАКАЗ</button>
        </div> `;
    rootElement.innerHTML = html;
    this.addEvents()
  }
}
