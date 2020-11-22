import tpl from './index.tpl';
import './index.scss';

import { NoDataTip} from '../noDataTip/index';
import { OrderModel } from '../../models/order';
import { OrderItem } from './order_item/index';

import tools from '../../utils/tools';

class OrderBoard {
    constructor(el){
        this.name = 'orderBoard';
        this.$el = el;
        this.orderModel = new OrderModel();
        this.purchaseData = this.orderModel.getPurchaseDatas()
    }

    init(){
        this.render();
    }

    render(){
        let html = '';

        if(this.purchaseData && this.purchaseData.length >0) {
            const orderItem = new OrderItem();

            let orderList = '';

            this.purchaseData.forEach(item =>{
                orderList += orderItem.tpl(item);
            })

            html = tools.tplReplace(tpl(),{
                orderList
            })
        } else {
            html = new NoDataTip().tpl('您还没有任何订单')
        }

        this.$el.append(html);
    }


}

export { OrderBoard }