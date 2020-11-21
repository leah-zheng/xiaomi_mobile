import tpl from './index.tpl';
import './index.scss';

import tools from '../../../utils/tools';
class CartItem{
    constructor(){
        this.name = 'cartItem'
    }

    tpl(data){
        
        return tools.tplReplace(tpl(),{
            cartId:data.cartId,
            link:data.link,
            img:data.pics,
            name:data.name,
            version:data.version,
            color:data.color,
            price:data.price
        })
    }
}

export { CartItem }