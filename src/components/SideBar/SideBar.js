import {TAB_CATEGORIES} from "../../constans";
import "./SideBar.css";
import {observer} from "../../App";


export default class SideBar {
    constructor(selectorName) {
        this.selectorName = selectorName;
        observer.subscribe(()=>{
            this.render()
        }, ['mainTab'])
    }

    addEvent() {
        const allTabs = document.querySelectorAll(".side_bar__link");
        for (let i = 0; i < allTabs.length; i++) {
            allTabs[i].addEventListener("click", (e) => {
                observer.notify({mainTab: e.target.id})
            });
        }
    }

    render() {
        const rootElement = document.querySelector(`.${this.selectorName}`);

        let html = "";

        TAB_CATEGORIES.forEach(({category, name}) => {
            const isActiveTab = category === observer.state.mainTab
            html += `<nav class="side_bar__link ${isActiveTab ? 'active_tab': ''}" id=${category}>${name}</nav>`;
        });

        rootElement.innerHTML = html;
        this.addEvent();
    }
}
