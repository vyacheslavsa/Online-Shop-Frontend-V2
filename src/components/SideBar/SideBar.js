import { TAB_CATEGORIES } from "../../constans";
import "./SideBar.css";

export default class SideBar {
  constructor(selectorName) {
    this.selectorName = selectorName;
    this.currentCategoty = "pizza";
  }

  addEvent() {
    const allTabs = document.querySelectorAll(".side_bar__link");
    for (let i = 0; i < allTabs.length; i++) {
      allTabs[i].addEventListener("click", (e) => {
        const currentChildren = e.target.parentElement.children;
        for (let i = 0; i < currentChildren.length; i++) {
          currentChildren[i].classList.remove("active_tab");
        }
        e.target.classList.add("active_tab");
      });
    }
  }

  render() {
    const rootElement = document.querySelector(`.${this.selectorName}`);

    let html = "";

    TAB_CATEGORIES.forEach(({ category, name }) => {
      html += `<nav class="side_bar__link" id=${category}>${name}</nav>`;
    });

    rootElement.innerHTML = html;
    this.addEvent();
  }
}
