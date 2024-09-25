import {cart, removeFromCart, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import { products, getProduct} from '../../data/products.js';
import formatCurrency  from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import renderPaymentSummary from './paymentSummary.js';
import { calculateCartItems } from '../utils/cartQty.js';


export default function renderOrderSummary(){

    displayCartItemsQty()

    let cartSummaryHTML = '';
    cart.forEach((cartItem) => {
        const matchingItem = getProduct(cartItem.productId);
        
        if(matchingItem){
            const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        );
        const dateString = deliveryDate.format("dddd, MMMM D");
            cartSummaryHTML+= 
            `
            <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingItem.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingItem.name}
                    </div>
                    <div class="product-price">
                        ${matchingItem.getPrice()}
                    </div>
                    <div class="product-quantity">
                        <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-cart-qty-update" data-product-id = "${matchingItem.id}">
                        Update
                        </span>
                        <input class = "quantity-input js-quantity-input-${matchingItem.id}">
                        <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id = "${matchingItem.id}">Save</span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingItem.id}">
                        Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingItem, cartItem)}
                    </div>
                </div>
            </div> 
            `;
        }
    }
    ); 


    function deliveryOptionsHTML(matchingItem, cartItem) {
        let html = '';

        deliveryOptions.forEach((deliveryOption) =>{
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'days'
            );
            const dateString = deliveryDate.format("dddd, MMMM D");
            const priceString = deliveryOption.priceCents 
            === 0 
                ?   'FREE'
                : `$${formatCurrency(deliveryOption.priceCents)}`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html+=
            `
                <div class="delivery-option js-delivery-option"
                data-product-id = "${matchingItem.id}"
                data-delivery-option-id = "${deliveryOption.id}">
                    <input type="radio" 
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} - Shipping
                        </div>
                    </div>
                </div> 
            `;
        })
        return html;
    }



    document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link')
    .forEach ((link) =>{
        link.addEventListener('click',() =>
        {
            const productId = link.dataset.productId;

            removeItemEverywhere(productId);
            
            renderOrderSummary();
            renderPaymentSummary();
        });
    })

    //to remove cart item everywhere

    function removeItemEverywhere(productId){
        //adding function to remove an element from the cart
        removeFromCart(productId);

        //getting the element to remove from the dom using special class
        let itemId = document.querySelector(`.js-cart-item-container-${productId}`)

        //removing from dom using remove()
        // renderOrderSummary();

    }

    //updating and displaying cart quantity
    function displayCartItemsQty(){
        const cartQuantityDOM = document.querySelector('.js-cart-quantity-display')
        let cartQuantity = calculateCartItems();
        if(cartQuantity > 0){
            cartQuantityDOM.innerHTML = `${cartQuantity} items`
        }
        else{
            cartQuantityDOM.innerHTML = '';
        }
    }

    document.querySelectorAll('.js-cart-qty-update').forEach(
        (link) => {
            link.addEventListener('click', () => {
                const prodId = link.dataset.productId;
                const itemContainer = document.querySelector(`.js-cart-item-container-${prodId}`)
                itemContainer.classList.add('is-editing-quantity');
            })   
        }
    )

    document.querySelectorAll('.js-save-quantity-link').forEach(
        (saveLink) => {
            saveLink.addEventListener('click', () =>{
                const prodId = saveLink.dataset.productId;
                

                let newQuantity= Number(document.querySelector(`.js-quantity-input-${prodId}`).value);
                
                if(newQuantity<0 || newQuantity>=1000){
                    alert('The quantity should be between 0 and 1000');
                    return;
                }

                const itemContainer = document.querySelector(`.js-cart-item-container-${prodId}`)
                itemContainer.classList.remove('is-editing-quantity');

                if(newQuantity==0){
                    removeItemEverywhere(prodId);
                }
                else{
                    updateQuantity(prodId, newQuantity);

                    displayCartItemsQty();

                    document.querySelector(`.js-quantity-label-${prodId}`).innerHTML = newQuantity;
                }

                renderOrderSummary();
                renderPaymentSummary();
            })
        }
    )


    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {

            const {productId,deliveryOptionId} = element.dataset;

            updateDeliveryOption(productId, deliveryOptionId);

            renderOrderSummary();

            renderPaymentSummary();
        })
    })
}


