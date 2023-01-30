import "./Modal.css";

export default class Modal {
  constructor(selectorName) {
    this.selectorName = selectorName;
  }

  render() {
    const rootElement = document.querySelector(`.${this.selectorName}`);

    let element = `
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
    </div>`;

    rootElement.innerHTML = element;
  }
}
