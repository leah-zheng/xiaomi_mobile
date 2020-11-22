import tpl from './index.tpl';
import './index.scss';

import tools from '../../../utils/tools';

class OrderItem {
    constructor(){
        this.name = 'orderItem'
    }

    tpl(data){
        return tools.tplReplace(tpl(), {
            orderId:data.orderId,
            link:data.link,
            name:data.name,
            img:data.pics,
            color:data.color,
            version:data.version,
            price:data.price
        })
    }
}

export { OrderItem };