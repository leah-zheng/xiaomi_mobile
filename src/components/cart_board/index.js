import tpl from './index.tpl'
import './index.scss';

import {CartModel} from '../../models/cart';
import { CartItem } from './cart_item/index';
import {CartBar} from './cart_bar/index';
import { NoDataTip } from '../noDataTip/index';
import { DetailModel } from '../../models/detail';
import tools from '../../utils/tools';

class CartBoard{
     constructor(el){
         this.name = 'cartBoard';
         this.$el = el;
         this.detailModel = new DetailModel();
         this.cartModel = new CartModel();
         this.cartData = this.cartModel.getCartData();
         this.totalPrice = 0;

         this.selectedItems = [];
     }

     init(){
        //  this.initTotalPrice();
        //  this.initSelectedItems();
         this.render();
         this.bindEvent();
         
     }

    //  initTotalPrice(){
    //      if(this.cartData && this.cartData.length >0){
    //         this.cartData.forEach(item => {
    //             this.totalPrice += Number(item.price)
    //         })
    //      }
    //  }

    //  initSelectedItems(){
    //     if(this.cartData && this.cartData.length > 0){
    //         this.selectedItems = this.cartData.map(item =>{
    //             return item.cartId
    //         })
    //     }
        
    //  }

     render(){
        let html = '';
        if(this.cartData &&this.cartData.length > 0){
            const cartItem = new CartItem(),
              cartBar = new CartBar();
        
            let cartList = '';


            this.cartData.forEach(item =>{
                cartList += cartItem.tpl(item)
            })

        
            html = tools.tplReplace(tpl(),{
                cartList,
                cartBar:cartBar.tpl(this.totalPrice)
        })
        }else{
            html = new NoDataTip().tpl('购物车空空如也')
        }

        this.$el.append(html);

        
     }

     bindEvent(){
        const $cartBoard = this.$el.find('.J_cartBoard');

        this.$totalPrice = $cartBoard.find('.J_totalPrice');

        $cartBoard.on('click',{_this:this}, this.onCartBoardClick);
     }

     onCartBoardClick(ev){
        const e = ev || window.event,
            tar = e.target || e.srcElement,
            $tar = $(tar),
            className = tar.className,
            _this = e.data._this;

        let cartId = '';
        if(className ==='checkbox'||
            className === 'purchase-btn'||
            className === 'remove-btn'
        ){
            cartId = $tar.attr('data-cartid');
        }

        switch (className) {
            case 'checkbox':
                
                const price = Number(_this.cartData.filter(item =>{
                    return item.cartId === cartId
                })[0].price);

                _this.selectItem(cartId,price,tar.checked)
                break;
            case 'purchase-btn':
                _this.purchanseItem(cartId);
                break;
            case 'remove-btn':
                
                _this.removeItem(cartId);
                break;
            case 'total-purchase-btn':
                _this.totalPurchase()
                break;
        
            default:
                break;
        }
     }

     selectItem(cartId,price,checked){
         if(checked){
             this.totalPrice += price;
            this.selectedItems.push(cartId)
         }else{
            this.totalPrice -= price;
            this.selectedItems = this.selectedItems.filter(item =>{
                return item !== cartId;
            })
         }
         this.$totalPrice.html(this.totalPrice);
     }

     purchanseItem(cartId){
         const userPhoneInfo = this.cartData.filter(item =>{
             return item.cartId === cartId
         })[0];
         
         delete userPhoneInfo.cartId;
         
         this.detailModel.purchase(userPhoneInfo,true,()=>{
             window.location.href = 'order.html';
         })
     }

     removeItem(cartId){
         this.cartModel.removeData(cartId);
         window.location.reload();
         
     }

     totalPurchase(){
         const userPhoneInfo = [];
        
         this.selectedItems.forEach((elem) =>{
             this.cartData.forEach(item =>{
                 if(item.cartId === elem){
                     delete item.cartId;
                     userPhoneInfo.push(item);
                 }
             })
         })

         userPhoneInfo.forEach((userPhoneInfo) =>{
             this.detailModel.purchase(userPhoneInfo,false);
         });
         window.location.href = 'order.html';
     }
}

export { CartBoard }