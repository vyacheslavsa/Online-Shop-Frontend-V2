import "./Modal.css";
import {observer} from "../../App";
import data from '../../assets/data.json'
import {ALL_CATEGORIES, CATEGORY, TABS_MODAL} from "../../constans";

export default class Modal {
    constructor(selectorName) {
        this.selectorName = selectorName;
        observer.subscribe(() => this.render())
    }

    openModal() {
        const modalParent = document.querySelector('.modal_window').parentNode

        if (observer.state.openModal) {
            modalParent.classList.add('open_modal');
        } else {
            modalParent.classList.remove('open_modal');
        }
    }

    calculatePrice() {
        const concatData = [];
        CATEGORY.forEach(item => concatData.push(...data[item]))
        const res = observer.state.customSandwich.allIdIngredients.map(value => {
            return concatData.find(item => value === item.productID).price
        })
        return res.reduce((acc, cur) => acc + cur)
    }

    addEvents() {
        const containerContent = document.querySelector('.modal_window__ingredients')
        if (observer.state.modalTab === 'done') containerContent.classList.add('done_tab')


        //on close
        const buttonOnClose = document.querySelector('.modal_window__close_button');
        buttonOnClose.addEventListener('click', () => {
            observer.notify({openModal: false, customSandwich: {}, modalTab: 'sizes'})
        });

        // add product in shopping cart
        const buttonAddProductInShoppingCart = document.querySelector('.modal_btn');
        buttonAddProductInShoppingCart && buttonAddProductInShoppingCart.addEventListener('click', () => {
            const copyShoppingCart = [...observer.state.shoppingCart, observer.state.customSandwich]
            observer.notify({shoppingCart: copyShoppingCart, openModal: false, customSandwich: {}, modalTab: 'sizes'})
        });

        //on tabs
        const allTabsModal = document.querySelectorAll('.modal_window__tab');
        for (let i = 0; i < allTabsModal.length; i++) {

            if (observer.state.modalTab === allTabsModal[i].id) {
                allTabsModal[i].classList.add('active_ingredients')
            } else {
                allTabsModal[i].classList.remove('active_ingredients')
            }

            if (observer.state.customSandwich.hasOwnProperty(allTabsModal[i].id)) {
                allTabsModal[i].classList.add('have_ingredients')
            } else {
                allTabsModal[i].classList.remove('have_ingredients')
            }

            allTabsModal[i].addEventListener('click', () => {
                observer.notify({modalTab: allTabsModal[i].id})
            })
        }
        //on card
        const allCardModal = document.querySelectorAll(".modal_window__card");

        for (let i = 0; i < allCardModal.length; i++) {
            if (observer.state.customSandwich.allIdIngredients.includes(allCardModal[i].id)) {
                allCardModal[i].classList.add("selected_ingredient");
            } else {
                allCardModal[i].classList.remove("selected_ingredient");
            }

            allCardModal[i].addEventListener("click", () => {
                const isMultipleCategories = observer.state.modalTab === ALL_CATEGORIES.vegetables || observer.state.modalTab === ALL_CATEGORIES.sauces || observer.state.modalTab === ALL_CATEGORIES.fillings
                const copyObj = observer.state.customSandwich;
                const selectedElement = data[observer.state.modalTab].find(item => item.productID === allCardModal[i].id);

                if (!observer.state.customSandwich.allIdIngredients.includes(allCardModal[i].id)) {

                    if (observer.state.customSandwich.hasOwnProperty(observer.state.modalTab) && !isMultipleCategories) {
                        const idCurrenCategory = data[observer.state.modalTab].map(item => item.productID)
                        const index = copyObj.allIdIngredients.findIndex(item => idCurrenCategory.includes(item))
                        copyObj.allIdIngredients[index] = allCardModal[i].id
                    } else {
                        copyObj.allIdIngredients = [...observer.state.customSandwich.allIdIngredients, allCardModal[i].id]
                    }

                    if (isMultipleCategories) {
                        if (!observer.state.customSandwich[observer.state.modalTab]) {
                            copyObj[observer.state.modalTab] = [selectedElement.name]
                        } else {
                            copyObj[observer.state.modalTab] = [...observer.state.customSandwich[observer.state.modalTab], selectedElement.name]
                        }
                    } else {
                        copyObj[observer.state.modalTab] = selectedElement.name
                    }

                } else {
                    const copyArr = [...observer.state.customSandwich.allIdIngredients]
                    const indexElement = copyArr.findIndex(item => item === allCardModal[i].id)
                    copyArr.splice(indexElement, 1)
                    copyObj.allIdIngredients = copyArr

                    if (!isMultipleCategories || copyObj[observer.state.modalTab].length === 1) {
                        delete copyObj[observer.state.modalTab]
                    } else {
                        const indexElement = copyObj[observer.state.modalTab].findIndex(item => item === selectedElement.name)
                        copyObj[observer.state.modalTab].splice(indexElement, 1)
                    }
                }

                if (copyObj.allIdIngredients.length) {
                    copyObj.price = this.calculatePrice()
                } else {
                    copyObj.price = 0
                }

                observer.notify({
                    customSandwich: copyObj
                })
            });
        }
    }

    getHeaderText() {
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

    renderTabs() {
        let html = ``
        TABS_MODAL.forEach(item => {
            html += `<div class="modal_window__tab" id=${item.category}> ${item.name}</div>`
        })
        return html
    }

    renderFooter() {
        let html = ''

        if (observer.state.modalTab !== ALL_CATEGORIES.done) {
            html = `
        <div className="modal_window__bottomFooter">
            <p className="product_card__price modal_price">Цена: ${observer.state.customSandwich.price} руб.</p>
        </div>`
        } else {
            html = `
      
      <div class="product_card__count count_modal">
        <p>КОЛИЧЕСТВО</p>
        <div class="product_card__board modal_board">
          <button class="product_card__inc-dec dec_modal">-</button>
          <p class="product_card__value count_modal_value">1</p>
          <button class="product_card__inc-dec inc_modal">+</button>
        </div>
      </div>
            <div class="modal_window__bottomFooter">
                <p class="product_card__price modal_price">Цена: ${observer.state.customSandwich.price} руб.</p>
            <button class="product_card_btn_add modal_btn">В корзину</button>
      </div>
      `
        }
        return html
    }

    renderContent() {
        let html = ''
        if (observer.state.modalTab !== ALL_CATEGORIES.done) {
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
        } else {
            html = `
          <div class="modal_window__leftContent">
            <div class="product_card__image modal_image">
              <img src=${observer.state.customSandwich.image}>
            </div>
          </div>
          <div class="modal_window__rightContent">
            <p class="modal_window__descriptionDone">Ваш сендвич готов!</p>
            <p>Размер: ${observer.state.customSandwich.sizes || '-'}</p>
            <p>Хлеб: ${observer.state.customSandwich.breads || '-'}</p>
            <p>Овощи: ${observer.state.customSandwich.vegetables || '-'}</p>
            <p>Соусы: ${observer.state.customSandwich.sauces || '-'}</p>
            <p class="modal_window__descriptionLast">Начинка: ${observer.state.customSandwich.fillings || '-'}</p>
            <p class="modal_window__nameSandwitch">${observer.state.customSandwich.name || '-'}</p>
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
        <div class="modal_window__footer">${this.renderFooter()}</div>
    </div>`;

        rootElement.innerHTML = element;
        if (observer.state.openModal) this.addEvents()
        this.openModal()
    }
}
