import "./ProductCards.css";
import donerLogo from "../../assets/i/markets/doner.png";
import subwayLogo from "../../assets/i/markets/subway_logo.png";
import sfcLogo from "../../assets/i/markets/south_fried_chicken.png";
import {observer} from "../../App";
import data from "../../assets/data.json";

export default class ProductCards {
    constructor(selectorName) {
        this.selectorName = selectorName;
        observer.subscribe(() => this.render())
    }

    getLinkLogo(currentCategory) {
        switch (currentCategory) {
            case "doner":
                return donerLogo;
            case "subway":
                return subwayLogo;
            case "sfc":
                return sfcLogo;
            default:
                return "";
        }
    }

    addProductInShoppingCart(currentProduct){
        const findElement = observer.state.shoppingCart.find(item => item.productID === currentProduct.productID)
        if(!findElement){
            observer.notify({shoppingCart: [...observer.state.shoppingCart, currentProduct]})
        }else {
            const copyShoppingCart = [...observer.state.shoppingCart]
            const index = copyShoppingCart.findIndex(item => item.productID === findElement.productID)
            findElement.count++
            copyShoppingCart[index] = {...findElement}
            observer.notify({shoppingCart: [...copyShoppingCart]})
        }
    }

    addEvents() {
        const allCardsElement = document.querySelectorAll('.product_card_btn_add');

        for (let i = 0; i < allCardsElement.length; i++) {
            allCardsElement[i].addEventListener('click', () => {
                const currentProduct = data.menu.find(item => item.productID === allCardsElement[i].parentNode.id)

                currentProduct.category === "sandwiches" ?
                    observer.notify({
                        openModal: true,
                        customSandwich: {
                            allIdIngredients: [],
                            count: currentProduct.count,
                            image: currentProduct.image,
                            name: currentProduct.name,
                            price: 0,
                            productID: currentProduct.productID
                        }
                    }) : this.addProductInShoppingCart(currentProduct)
            })
        }
    }

    render() {
        const rootElement = document.querySelector(`.${this.selectorName}`);

        let element = "";

        const menu = data.menu.filter(
            (item) => item.category === observer.state.mainTab
        );

        menu.forEach((product, i) => {
            const isSandwiches = product.category === "sandwiches";
            product.count = 1;

            element += `
        <article class="product_card" id=${product.productID}>
            <div class=${product.market ? "product_card__logo__show" : "product_card__logo__hide"}>
                <img src=${this.getLinkLogo(product.market)} />
            </div>
          <div class="product_card__image">
            <img src="${product.image}" alt="no_image" />
          </div>
      <div class="product_card__name">
          <p>${product.name}</p>
      </div>
      <div class=${
                product.description
                    ? "product_card__description__show"
                    : "product_card__description__hide"
            }>
          <a>${product.description}</a>
      </div>
      ${isSandwiches ? "<p></p>" : `<p class="product_card__price">Цена: ${product.price} руб.</p>`}
      <div class="product_card__count">
          <p>КОЛИЧЕСТВО</p>
          <div class="product_card__board">
              <button class="product_card__inc-dec product_dec">-</button>
              <p class="product_card__value">${product.count}</p>
              <button class="product_card__inc-dec product_inc">+</button>
          </div>
      </div>
      <button class="product_card_btn_add">
          ${isSandwiches ? "СОБРАТЬ" : "В КОРЗИНУ"}
      </button>
  </article>`;
        });

        rootElement.innerHTML = element;
        this.addEvents()
    }
}
