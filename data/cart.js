export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

  if(!Array.isArray(cart)){
    cart =[
    ];
    saveToStorage();
  };
}


function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}



export function updateCart(productId) {
    //pushing items into cart
    let itemQuanStr = document.querySelector(`.js-quantity-selector-${productId}`);
    let itemQuantity;
    if(itemQuanStr){
      itemQuantity = Number(itemQuanStr.value);
    }
    else{
      itemQuantity = 1;
    }
    let matchingItem;
  
    cart.forEach((cartItem) =>{
      if(cartItem.productId === productId){
        matchingItem = cartItem;
      }
    })
  
    if(matchingItem){
      matchingItem.quantity+=itemQuantity
    }
    else{
      cart.push(
        {
          productId : productId,
          quantity: itemQuantity,
          deliveryOptionId : '1' 
        }
      )
    }
    saveToStorage();
}

  //removing an item from the cart
export function removeFromCart(productId){
  //create new array
  //loop thu the cart
  //add each product to the new array and the assign the new array to the cart
  
  const newCart = [];

  cart.forEach((cartItem) =>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  })
  cart = newCart; 

  saveToStorage();
}

export function updateQuantity(productId, newQuantity){
  // let matchingItem;
  cart.forEach((cartItem) =>
  {
    if(cartItem.productId === productId){
      cartItem.quantity = newQuantity;
    }

    saveToStorage();
  })
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) =>
  {
    if(productId === cartItem.productId){
      matchingItem = cartItem
    };
  })

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load',() => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();

};

export function clearCart(){
  cart = [];
  saveToStorage();
  console.log('Cart cleared');
}