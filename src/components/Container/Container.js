import SideBar from '../SideBar/SideBar'
import ProductsBoard from "../ProductsBoard/ProductsBoard";
import './Container.css'

const sideBarComponent = new SideBar().render();
const productsBoardComponent = new ProductsBoard().render();

export default class Container {
  render() {
    return `
        <div class="container">
            <div class="left_content">
                ${sideBarComponent}
                <div class="shopping_cart"></div>
            </div>
            ${productsBoardComponent}
        </div>`;
  }
}
