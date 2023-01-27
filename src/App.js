const rootElement = document.querySelector("#root");

export default class App {
    addEvent() {
      console.log("headerClick");
    }
    render() {
      let element = `
          <header>
              <h1>СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>
          </header>
          <div class="container">
              <div class="left_content">
              <aside class="side_bar"></aside>
                  <div class="shopping_cart">
                      <div class="shopping_cart__header">
                          <div class="shopping_cart__box_shadow"></div>
                          <img src="i/shopping_cart.png" alt="no_image_shop-card"/>
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
                      </div>
                  </div>
              </div>
              <main class="products_board"></main>
          </div>
          <div class="modal_bg">
              <div class="modal_window">
                  <div class="modal_window__header">
                      <p class="modal_window__head_text"></p>
                      <button class="modal_window__close_button">+</button>
                  </div>
                  <div class="modal_window__content">
                      <div class="modal_window__tabs_panel">
                          <div class="modal_window__tab active_ingredients" id="sizes">
                              Размер
                          </div>
                          <div class="modal_window__tab" id="breads">Хлеб</div>
                          <div class="modal_window__tab" id="vegetables">Овощи</div>
                          <div class="modal_window__tab" id="sauces">Соусы</div>
                          <div class="modal_window__tab" id="fillings">Начинка</div>
                          <div class="modal_window__tab" id="done">Готово!</div>
                      </div>
                      <div class="modal_window__ingredients"></div>
                  </div>
                  <div class="modal_window__footer">
                      <div class="modal_window__bottomFooter">
                          <p class="product_card__price modal_price">Цена: 0 руб.</p>
                      </div>
                  </div>
              </div>
          </div>
          `;
  
      rootElement.innerHTML = element;
    }
  }