import config from '../utils/config';
import tools from '../utils/tools';

class DetailModel {
    getPhoneInfo(pid){
        const url = `getPhoneInfo?id=${pid}`;

        return $.ajax({
            url:config.API.base_url + url,
            type:'get',
            dataType:'JSONP',
            jsonp:'cb',
            success(data){
                return data;
            }
        })
    }

    addToCart(userPhoneInfo,callback){
        let cartData = localStorage.getItem('cartData');
        
        if(!cartData){
            cartData = [];
        }else{
            cartData = $.parseJSON(cartData);
        }

        const _cartArr = cartData.filter((item) => {
            if(item.id === userPhoneInfo.id){
                if(item.version === userPhoneInfo.version && item.color === userPhoneInfo.color){
                    return true;
                }
            }
        })
        //购物车中不存在的情况
        if(_cartArr.length <= 0){
            let purchaseData = localStorage.getItem('purchaseData');
            //购买记录中是否存在的情况
            if(purchaseData){
                purchaseData = $.parseJSON(purchaseData);

                const _purchaseArr = purchaseData.filter(item => {
                    if(item.id === userPhoneInfo.id){
                        if(item.version === userPhoneInfo.version && item.color === userPhoneInfo.color){
                            return true;
                        }
                    }
                })

                if(_purchaseArr.length > 0){
                    //购物记录中已经存在
                    alert('该产品已购买')
                }else{
                    //购买记录中不存在
                    addToCartData();
                }

            }else{
                addToCartData();
            }
        }else{
            alert('该产品已加入购物车')
        }

        function addToCartData(){
            userPhoneInfo.cartId = tools.setRandonNo(6);
            cartData.push(userPhoneInfo);
            localStorage.setItem('cartData',JSON.stringify(cartData));
            callback && callback();
        }
    }

    purchase(userPhoneInfo,doAlert,callback){
        let purchaseData = localStorage.getItem('purchaseData');

        if(purchaseData){
            purchaseData = $.parseJSON(purchaseData);

            const _arr = purchaseData.filter(item => {
                if(item.id === userPhoneInfo.id){
                    if(item.version === userPhoneInfo.version && item.color === userPhoneInfo.color){
                        return true;
                    }
                }
            })

            if(_arr.length <= 0) {
                addPurchaseData();
                removeInfoFromCart();
            }else{
                alert('您已购买该产品')
            }
            
        }else{
            purchaseData = [];
            addPurchaseData();
            removeInfoFromCart();
        }

        function addPurchaseData(){
            userPhoneInfo.orderId = tools.setRandonNo(6);
            userPhoneInfo.purchaseTime = tools.getDateTime();
            purchaseData.push(userPhoneInfo);
            localStorage.setItem('purchaseData', JSON.stringify(purchaseData));
            doAlert && alert('已成功购买该产品');
            callback && callback();
        }

        function removeInfoFromCart(){
            let cartData = localStorage.getItem('cartData');
            
            if(cartData){
                cartData = $.parseJSON(cartData);
                
                cartData = cartData.filter(item =>{
                    if(item.id === userPhoneInfo.id){
                        if(item.version === userPhoneInfo.version && item.color === userPhoneInfo.color){
                            return false;
                        }
                    }
                    return true;
                })

                localStorage.setItem('cartData',JSON.stringify(cartData))
            }
            
        }
    }
}

export { DetailModel }