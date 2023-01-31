import "./Modal.css";
import {observer} from "../../App";

export default class Modal {
  constructor(selectorName) {
    this.selectorName = selectorName;
    observer.subscribe(() => this.render())
  }

  openModal(){
    const modalParent = document.querySelector('.modal_window').parentNode

    if(observer.state.openModal){
      modalParent.classList.add('open_modal');
    } else {
      modalParent.classList.remove('open_modal');
    }
  }

  addEvents(){
    //on close
    const buttonOnClose = document.querySelector('.modal_window__close_button');
    buttonOnClose.addEventListener('click', () => observer.notify({openModal: false}));
    //on tabs
    const allTabsModal = document.querySelectorAll('.modal_window__tab');
    for (let i = 0; i < allTabsModal.length; i++) {
      if(observer.state.modalTab === allTabsModal[i].id){
        allTabsModal[i].classList.add('active_ingredients')
      }
      allTabsModal[i].addEventListener('click', (e) => {
        const currentChildren = e.target.parentElement.children;
        for (let j = 0; j < currentChildren.length; j++) {
          currentChildren[j].classList.remove('active_ingredients')
        }
        observer.notify({modalTab: allTabsModal[i].id})
      })
    }

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
                <div class="modal_window__tab" id="sizes"> Размер</div>
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
    this.addEvents()
    this.openModal()
  }
}
