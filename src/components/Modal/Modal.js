import "./Modal.css";
import {observer} from "../../App";
import data from '../../assets/data.json'
import {ALL_CATEGORIES, TABS_MODAL} from "../../constans";

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
    buttonOnClose.addEventListener('click', () => {
      observer.notify({openModal: false, customSandwich: {}})
    });

    //on tabs
    const allTabsModal = document.querySelectorAll('.modal_window__tab');
    for (let i = 0; i < allTabsModal.length; i++) {

      if(observer.state.modalTab === allTabsModal[i].id){
        allTabsModal[i].classList.add('active_ingredients')
      }else {
        allTabsModal[i].classList.remove('active_ingredients')
      }

      if(observer.state.customSandwich.hasOwnProperty(allTabsModal[i].id)){
        allTabsModal[i].classList.add('have_ingredients')
      }else {
        allTabsModal[i].classList.remove('have_ingredients')
      }

      allTabsModal[i].addEventListener('click', (e) => {
        observer.notify({modalTab: allTabsModal[i].id})
      })
    }
    //on card
    const allCardModal = document.querySelectorAll(".modal_window__card");

    for (let i = 0; i < allCardModal.length; i++) {


      if(observer.state.customSandwich.allIdIngredients.includes(allCardModal[i].id)){
        allCardModal[i].classList.add("selected_ingredient");
      }else {
        allCardModal[i].classList.remove("selected_ingredient");
      }

      allCardModal[i].addEventListener("click", () => {
        const copyObj = observer.state.customSandwich;
        const selectedElement = data[observer.state.modalTab].find(item => item.productID === allCardModal[i].id);

        if(!observer.state.customSandwich.allIdIngredients.includes(allCardModal[i].id)) {

          copyObj.allIdIngredients = [...observer.state.customSandwich.allIdIngredients, allCardModal[i].id]
          copyObj[observer.state.modalTab] = selectedElement.name
          observer.notify({
            customSandwich: copyObj
          })
        } else {
          const copyArr = [...observer.state.customSandwich.allIdIngredients]
          const indexElement = copyArr.findIndex(item => item === allCardModal[i])
          copyArr.splice(indexElement,1)
          copyObj.allIdIngredients = copyArr
          delete copyObj[observer.state.modalTab]
          observer.notify({
            customSandwich: copyObj
          })
        }

        console.log(observer.state.customSandwich)
      });
    }
  }

  getHeaderText(){
    switch (observer.state.modalTab) {
      case "sizes":
        return "Выберите размер сендвича";
      case "breads":
        return "Хлеб для сендвича на выбор";
      case "vegetables":
        return "Дополнительные овощи бесплатно";
      case "sauces":
        return "Выберите три бесплатных соуса по вкусу";
      case "fillings":
        return "Добавьте начинку по вкусу";
      case "done":
        return "Проверьте и добавьте в корзину";
    }
  }

  renderTabs(){
    let html = ``
    TABS_MODAL.forEach(item => {
      html += `<div class="modal_window__tab" id=${item.category}> ${item.name}</div>`
    })
    return html
  }

  renderContent(){
    let html = ''
    if(observer.state.modalTab !== ALL_CATEGORIES.done) {
      data[observer.state.modalTab].forEach(item => {
        html += `
        <div class="modal_window__card" id=${item.productID}>
            <div class="product_card__image modal_image">
              <img src=${item.image} alt="no_image" />
            </div>
            <div class="modal_window__description">
              <p class="modal_window__text">${item.name}</p>
              <p class="modal_window__price">Цена: ${item.price} руб.</p>
            </div>
          </div>
    `
      })
    }else {
        html = `
          <div class="modal_window__leftContent">
            <div class="product_card__image modal_image">
              <img src="">
            </div>
          </div>
          <div class="modal_window__rightContent">
            <p class="modal_window__descriptionDone">Ваш сендвич готов!</p>
            <p>Размер: </p>
            <p>Хлеб: </p>
            <p>Овощи: </p>
            <p>Соусы: </p>
            <p class="modal_window__descriptionLast">Начинка: </p>
            <p class="modal_window__nameSandwitch"></p>
          </div>
      `;
    }
    return html
  }

  render() {
    const rootElement = document.querySelector(`.${this.selectorName}`);

    let element = `
        <div class="modal_window">
        <div class="modal_window__header">
            <p class="modal_window__head_text">${this.getHeaderText()}</p>
            <button class="modal_window__close_button">+</button>
        </div>
        <div class="modal_window__content">
            <div class="modal_window__tabs_panel">${this.renderTabs()}</div>
            <div class="modal_window__ingredients">${this.renderContent()}</div>
        </div>
        <div class="modal_window__footer">
            <div class="modal_window__bottomFooter">
                <p class="product_card__price modal_price">Цена: 0 руб.</p>
            </div>
        </div>
    </div>`;

    rootElement.innerHTML = element;
    if(observer.state.openModal)this.addEvents()
    this.openModal()
  }
}
