import { TAB_CATEGORIES } from "../../constans";
import "./SideBar.css";

export default class SideBar {
  constructor(selectorName) {
    this.selectorName = selectorName;
  }

  addEvent() {
    const allTabs = document.querySelectorAll(".side_bar__link");
  }

  render() {
    const rootElement = document.querySelector(`.${this.selectorName}`);

    let html = "";

    TAB_CATEGORIES.forEach(({ category, name }) => {
      html += `<nav class="side_bar__link active_tab" id=${category}>${name}</nav>`;
    });

    rootElement.innerHTML = html;
    this.addEvent();
  }
}
