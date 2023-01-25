import Header from "./components/Header/Header.js";
import Container from "./components/Container/Container.js";
import data from "./assets/data.json";

const rootElement = document.getElementById("root");

(function () {
  const headerComponent = new Header().render();
  const containerComponent = new Container().render();

  const ALL_COMPONENTS = [headerComponent, containerComponent];

  let mainElement = "";

  ALL_COMPONENTS.forEach((component) => {
    mainElement += component;
  });

  rootElement.innerHTML = mainElement;
})();

{
  /* <header class="header"></header>
    <div class="container">
        <div class="left_content">
            <aside class="side_bar"></aside>
            <div class="shopping_cart"></div>
        </div>
        <main class="products_board"></main>
    </div>
    <div class="modal_bg"></div> */
}

// new Header().render()
