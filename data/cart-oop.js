function Cart(localStorageKey){
    const cart = {
        cartItems : undefined,
    
        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        
            if(!Array.isArray(this.cartItems)){
            this.cartItems =[
                {
                productId : "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                quantity : 5,
                deliveryOptionId : '1'
                },
                {
                productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId : '2'
                }
            ];
            this.saveToStorage();
            };
        },
    
        saveToStorage(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
    
        calculateCartQuantity(){
            let cartQuantity = 0;
            if (!Array.isArray(this.cartItems)) {
              return 0;
            }
            else{
              this.cartItems.forEach((cartItem) => {
                cartQuantity = cartQuantity + cartItem.quantity;
              });
              return cartQuantity;
            }
        },
    
        updateCart(productId) {
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
          
            this.cartItems.forEach((cartItem) =>{
              if(cartItem.productId === productId){
                matchingItem = cartItem;
              }
            })
          
            if(matchingItem){
              matchingItem.quantity+=itemQuantity
            }
            else{
              this.cartItems.push(
                {
                  productId : productId,
                  quantity: itemQuantity,
                  deliveryOptionId : '1' 
                }
              )
            }
            this.saveToStorage();
        },
    
        //removing an item from the cart
        removeFromCart(productId){
            //create new array
            //loop thu the cart
            //add each product to the new array and the assign the new array to the cart
            
            const newCart = [];
          
            this.cartItems.forEach((cartItem) =>{
              if(cartItem.productId !== productId){
                newCart.push(cartItem);
              }
            })
            this.cartItems = newCart; 
          
            this.saveToStorage();
        },
    
        updateQuantity(productId, newQuantity){
            // let matchingItem;
            this.cartItems.forEach((cartItem) =>
            {
              if(cartItem.productId === productId){
                cartItem.quantity = newQuantity;
              }
          
              this.saveToStorage();
            })
        },
    
        updateDeliveryOption(productId, deliveryOptionId){
            let matchingItem;
          
            this.cartItems.forEach((cartItem) =>
            {
              if(productId === cartItem.productId){
                matchingItem = cartItem
              };
            })
          
            matchingItem.deliveryOptionId = deliveryOptionId;
          
            this.saveToStorage();
        }
    };
    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
cart.updateCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53')

businessCart.loadFromStorage();


console.log(cart);
console.log(businessCart); 
















