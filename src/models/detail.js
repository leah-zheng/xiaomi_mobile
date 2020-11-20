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

    addToCart(userPhoneInfo){
        let cartData = localStorage.getItem('cartData');
        
        if(cartData){
            cartData = $.parseJSON(cartData);
            
            const _arr = cartData.filter((item) => {
                if(item.id === userPhoneInfo.id){
                    if(item.version === userPhoneInfo.version && item.color === userPhoneInfo.color){
                        return true;
                    }
                }
            })

            if(_arr.length === 0){
                addToCartData()
            }else{
                alert('该产品已加入购物车')
            }
        }else{
            cartData = [];
            addToCartData();
        }

        function addToCartData(){
            cartData.push(userPhoneInfo);
            localStorage.setItem('cartData',JSON.stringify(cartData))
        }
    }

    purchase(userPhoneInfo){
        let purchaseData = localStorage.getItem('purchaseData');

        if(purchaseData){
            purchaseData = $.parseJSON(purchaseData);

            const _arr = purchase.filter(item => {
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
            purchase = [];
            addPurchaseData();
            removeInfoFromCart();
        }

        function addPurchaseData(){
            userPhoneInfo.purchaseTime = tools.getDataTime();
            purchaseData.push(userPhoneInfo);
            localStorage.setItem('purchaseData', JSON.stringify(purchaseData));
            alert('已成功购买该产品');
        }

        function removeInfoFromCart(){
            let cartData = localStorage.getItem('cartDate');
            
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