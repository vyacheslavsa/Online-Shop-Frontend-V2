const rootHeader = document.querySelector('.header')


class Header {

    
  
    render() {
        rootHeader.innerHTML += "<h1>СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>"
    }
  
  }

new Header().render()