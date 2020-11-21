class CartModel{
    getCartData(){
        return $.parseJSON(localStorage.getItem('cartData'));
    }
}

export { CartModel }