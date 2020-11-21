import { App } from './App';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { CartBoard } from '../components/cart_board';

class Cart extends App {
    constructor($,){
        super($, {
            phone:true,
            swiper:false,
            field:true
        });
    }

    render(){
        
        new Header(this.$app, this.cache.fieldData,this.cache.phoneData).init();
        new CartBoard(this.$app, this.cache.phoneData).init();
        new Footer(this.$app).init();
        $('body').prepend(this.$app);
    }
}

new Cart(jQuery)