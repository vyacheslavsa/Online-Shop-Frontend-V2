import {TAB_CATEGORIES} from "../../constans";
import "./SideBar.css";
import {observer} from "../../App";


export default class SideBar {
    constructor(selectorName) {
        this.selectorName = selectorName;
    }

    addEvent() {
        const allTabs = document.querySelectorAll(".side_bar__link");
        for (let i = 0; i < allTabs.length; i++) {
            if (allTabs[i].id === observer.state.mainTab) allTabs[i].classList.add("active_tab");
            allTabs[i].addEventListener("click", (e) => {
                const currentChildren = e.target.parentElement.children;
                for (let i = 0; i < currentChildren.length; i++) {
                    currentChildren[i].classList.remove("active_tab");
                }
                e.target.classList.add("active_tab");
                observer.notify({ mainTab: e.target.id })
            });
        }
    }

    render() {
        const rootElement = document.querySelector(`.${this.selectorName}`);

        let html = "";

        TAB_CATEGORIES.forEach(({category, name}) => {
            html += `<nav class="side_bar__link" id=${category}>${name}</nav>`;
        });

        rootElement.innerHTML = html;
        this.addEvent();
    }
}
