import data from '../../assets/data.json';

import './ProductBoard.css'


console.log(data)


export default class ProductsBoard {

    // linkLogo(currentCategory){
    //     switch (currentCategory) {
    //         case "doner":
    //             return "/i/markets/doner.png";
    //         case "subway":
    //             return "/i/markets/subway_logo.png";
    //         case "sfc":
    //             return "/i/markets/south_fried_chicken.png";
    //         default:
    //             return "";
    //     }
    // }


    render() {


        let element = '';

        data.menu.forEach(product => {

                const isSandwiches = product.category === "sandwiches";
                product.count = 1;



                element += `<article class="product_card" id=${product.productID}>
              <div class=${
                    product.market
                        ? "product_card__logo__show"
                        : "product_card__logo__hide"
                }>
                  <img src=${'fdsf'} />
              </div>
              <div class="product_card__image">
                <img src='../../assets/i/bread/grey-with-cereal.png' alt="no_image" />
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
              ${
                    isSandwiches
                        ? "<p></p>"
                        : `<p class="product_card__price">Цена: ${product.price} руб.</p>`
                }
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
          </article>`
            }
        )


        return `<main class="products_board">${element}</main>`;
    }
}