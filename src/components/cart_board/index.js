import tpl from './index.tpl'
import './index.scss';

import {CartModel} from '../../models/cart';
import { CartItem } from './cart_item/index';
import {CartBar} from './cart_bar/index';
import tools from '../../utils/tools';

class CartBoard{
     constructor(el){
         this.name = 'cartBoard';
         this.$el = el;
         this.cartData = new CartModel().getCartData();
         this.totalPrice = 0
     }

     init(){
         this.initTotalPrice();
         this.render();
         this.bindEvent();
         
     }

     initTotalPrice(){
         this.cartData.forEach(item => {
            
             this.totalPrice += Number(item.price)
         })
     }

     render(){
        const cartItem = new CartItem(),
              cartBar = new CartBar();
        
        let cartList = '';

        this.cartData.forEach(item =>{
            cartList += cartItem.tpl(item)
        })

        
        this.$el.append(tools.tplReplace(tpl(),{
            cartList,
            cartBar:cartBar.tpl(this.totalPrice)
        }))
     }

     bindEvent(){

     }

     
}

export { CartBoard }