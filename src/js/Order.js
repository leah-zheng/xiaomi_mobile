import { App } from './App';
import{ Header } from '../components/header/index';
import { OrderBoard } from '../components/order_board/index';
import { Footer } from '../components/footer/index';

import tools from '../utils/tools';

class Order extends App {
    constructor($){
        super($, {
            phone:true,
            swiper:true,
            field:true
        });
    }

    render(){
        new Header(this.$app,this.cache.fieldData, this.cache.phoneData).init();
        new OrderBoard(this.$app).init();
        new Footer(this.$app).init();

        $('body').append(this.$app);
    }
}

new Order(jQuery);