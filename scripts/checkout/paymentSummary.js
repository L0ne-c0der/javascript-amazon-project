import { cart, clearCart } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { getDeliveryOption, deliveryOptions} from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export default function renderPaymentSummary(){
    let productPriceCents = 0;
    let productCount = cart.length;
    let deliveryCharges = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);

        if(product){
          productPriceCents += product.priceCents * cartItem.quantity;

          const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        
          deliveryCharges += deliveryOption.priceCents;
        }
    });

    const totalBeforeTax = productPriceCents + deliveryCharges;
    const taxAmount = totalBeforeTax * 0.1;
    const orderTotal = totalBeforeTax + taxAmount;

    let paymentHTML = 
    `
        <div class="payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${productCount}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(deliveryCharges)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxAmount)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
        </div>
    `
    document.querySelector('.js-payment-summary').innerHTML = paymentHTML;

    document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method : 'POST',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });
      
        const order = await response.json()
        addOrder(order);
        clearCart();
      } catch (error) {
        console.log('Unexpected error. Try again later');
      }

      window.location.href = 'orders.html';
    });
}