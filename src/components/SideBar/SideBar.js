import './SideBar.css'

const TAB_CATEGORIES = [
    {
        category: 'pizza',
        desc: 'Пицца'
    },
    {
        category: 'shaurma',
        desc: 'Шаурма'
    },
    {
        category: 'sandwiches',
        desc: 'Сендвичи'
    },
    {
        category: 'burgers',
        desc: 'Бургеры'
    },
    {
        category: 'chicken',
        desc: 'Курица & Картофель'
    },
    {
        category: 'salads',
        desc: 'Тортилья & Салаты'
    },
    {
        category: 'drinks',
        desc: 'Напитки & Десерты'
    },
]

export default class SideBar {



    render() {
        let element = ''
        TAB_CATEGORIES.map(item =>
            element += `<nav class="side_bar__link" id=${item.category}>${item.desc}</nav>`
        )

        return (
            `<aside class="side_bar">
                ${element}
            </aside>`
        )

    }
}