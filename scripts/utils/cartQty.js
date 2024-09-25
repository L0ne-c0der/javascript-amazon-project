import { cart } from "../../data/cart.js";

export function calculateCartItems(){
    let cartQuantity = 0;
    if (!Array.isArray(cart)) {
      return '';
    }
    else if(cart.length==0){
      return '';
    }
    else{
        return cart.length;
    }
};


export function displayCartQty(){
  let cartQuantity = document.querySelector('.cart-quantity')
  if(cartQuantity){
    cartQuantity.innerHTML = calculateCartItems();
  }
}

displayCartQty();
