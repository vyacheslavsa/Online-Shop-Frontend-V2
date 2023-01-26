import Header from "./components/Header/Header.js";
import Container from "./components/Container/Container.js";
import data from './assets/data.json'
import './style.css'

const rootElement = document.getElementById("root");

export const ALL_CATEGORIES = {
    breads: "breads",
    fillings: "fillings",
    sauces: "sauces",
    sizes: "sizes",
    vegetables: "vegetables",
};

export const allObjData = [
    ALL_CATEGORIES.breads,
    ALL_CATEGORIES.fillings,
    ALL_CATEGORIES.sauces,
    ALL_CATEGORIES.sizes,
    ALL_CATEGORIES.vegetables,
];

const addIDforData = () => {
    const generateID = () =>
        String(Math.round(Math.random() * 10000000000000000000));
    const addID = (arr) => {
        arr.map((item) => (item.productID = generateID()));
    };
    allObjData.push("menu");
    allObjData.forEach((item) => addID(data[item]));
};

const reFormatData = () => {
    allObjData.forEach((item) => {
        const newArr = [];
        for (const key in data[item]) {
            newArr.push(data[item][key]);
        }
        data[item] = newArr;
    });
};

reFormatData();
addIDforData();

const headerComponent = new Header().render();
const containerComponent = new Container().render();

const ALL_COMPONENTS = [headerComponent, containerComponent];

let mainElement = "";

ALL_COMPONENTS.forEach((component) => {
    mainElement += component;
});

rootElement.innerHTML = mainElement;

