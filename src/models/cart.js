class CartModel{
    getCartData(){
        return $.parseJSON(localStorage.getItem('cartData'));
    }

    removeData(cartId){
        let cartData = $.parseJSON(localStorage.getItem('cartData'));

        cartData = cartData.filter(item =>{
            return cartId !== item.cartId
        })

        localStorage.setItem('cartData',JSON.stringify(cartData))
    }
}

export { CartModel }