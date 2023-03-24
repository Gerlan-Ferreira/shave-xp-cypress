
import header from '../../components/header'

class ShaversPage{

    constructor() {
       this.header = header 
       //esse construtor serve para já instanciar a classe header na página de shavers/home e com isso não ter necessidade de ta chamando ele na classe de teste. 
    //e com isso ao chamar essa classe ela já irá instanciar a classe de Header     
    }
}

export default new ShaversPage()