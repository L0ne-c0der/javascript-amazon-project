import {orders} from '../data/orders.js';
import { cart, updateCart } from '../data/cart.js';
import formatCurrency from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {loadProductsFetch,products,getProduct} from '../data/products.js';
import getDates from './utils/dates.js';

async function loadProductsHTML(){
  await loadProductsFetch();
  loadContainers();
  loadOrdersHTML();
  addTackingLink();
  orderAgain();
};

loadProductsHTML();



function loadOrdersHTML() {
  let orderHeaderHTML = '';


  if(orders.length>0){
    orders.forEach((orderDetails) => {
        
        orderHeaderHTML = `
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${getDates(orderDetails.orderTime, 'MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(orderDetails.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderDetails.id}</div>
            </div>
        `

        let orderedProducts = '';
        (orderDetails.products).forEach((product) => {
            const productDetails = getProduct(product.productId);

            orderedProducts += `
              <div class="product-image-container">
                <img src="${productDetails.image}">
              </div>

              <div class="product-details">
                <div class="product-name">
                  ${productDetails.name}
                </div>
                <div class="product-delivery-date">
                  ${getDates(product.estimatedDeliveryTime, 'MMMM D')}
                </div>
                <div class="product-quantity">
                  Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again" data-prodid = ${productDetails.id}>
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>

              <div class="product-actions">
                  <button class="track-package-button button-secondary" data-productid=${productDetails.id}  data-order-id=${orderDetails.id}'>
                    Track package
                  </button>
              </div>
            `;
        });
        let orderHeader = document.querySelector(`.js-order-header-${orderDetails.id}`);
        orderHeader.innerHTML = orderHeaderHTML;
        let orderDetailsGrid = document.querySelector(`.js-order-details-grid-${orderDetails.id}`);
        orderDetailsGrid.innerHTML = orderedProducts;
    });
  };
}

function loadContainers() {
  let orderContainerHTML = '';

  if(orders.length>0){
    orders.forEach((orderContainer) => {
      orderContainerHTML += `
      <div class="order-container js-order-container-${orderContainer.id}">

          <div class="order-header js-order-header-${orderContainer.id}">
          </div>

          <div class="order-details-grid js-order-details-grid-${orderContainer.id}">
          </div>
      </div>
      `
    })
    let ordersGrid = document.querySelector('.orders-grid');
    ordersGrid.innerHTML = orderContainerHTML;
  }
};


function addTackingLink(){
  document.querySelectorAll('.track-package-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const orderId = event.target.dataset.orderId;
      const productId = event.target.dataset.productid;
      window.location.href = `https://l0ne-c0der.github.io/javascript-amazon-project/tracking.html?orderId=${orderId}&productId=${productId}`
    })
  })
};

function orderAgain(){
  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', (event) => {
      let prodId = String(event.target.dataset.prodid);
      updateCart(prodId);
      window.location.href = `https://l0ne-c0der.github.io/javascript-amazon-project/checkout.html`;
    })
  })
}







