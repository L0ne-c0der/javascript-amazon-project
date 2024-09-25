import { getProduct, loadProductsFetch } from "../data/products.js";
import { orders } from '../data/orders.js';
import getDates from "./utils/dates.js";
import { findOrder, findOrderProduct } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'


//fetching order details
async function loadTrackingPage() {
    await loadProductsFetch();
    loadTrackingHTML();
}

loadTrackingPage();

function getObjects(){
    const params = new URLSearchParams(window.location.search);
    let productId = (params.get('productId')); // Gets the value of the "name" parameter
    let orderId = params.get('orderId').trim();
    orderId = orderId.substring(0,orderId.length-1);

    const orderDetails = findOrder(orderId);
    const orderProduct = findOrderProduct(orderId , productId);

    const productDetails = getProduct(productId);

    return [orderDetails, orderProduct, productDetails]
}

function loadTrackingHTML(){
    console.log(orders);
    let [orderDetails, orderProduct, productDetails] = getObjects();
    const deliveryProgress = getDeilveryProgress(orderDetails, orderProduct);
    let orderTrackingHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${getDates(orderProduct.estimatedDeliveryTime, 'dddd, MMMM D')}
        </div>

        <div class="product-info">
          ${productDetails.name}
        </div>

        <div class="product-info">
          Quantity: ${orderProduct.quantity}
        </div>

        <img class="product-image" src="${productDetails.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style = "width:${deliveryProgress}%"></div>
        </div>
    `;
    
    document.querySelector('.order-tracking').innerHTML = orderTrackingHTML;

    setProgressBar(deliveryProgress);
    
};

function getDeilveryProgress(orderDetails, orderProduct){
    const currentTime = dayjs();
    const orderTime = dayjs(orderDetails.orderTime);
    const deliveryTime = dayjs(orderProduct.estimatedDeliveryTime);
    return (currentTime.diff(orderTime)/deliveryTime.diff(orderTime) * 100);
}

function setProgressBar(deliveryProgress){

    // const progressBar = document.querySelector('.progress-bar')
    // progressBar.style.width = deliveryProgress;
    const progressIndicators = document.querySelectorAll('.progress-label');
    const currentStatus = document.querySelector('.current-status');
    if(currentStatus){
        currentStatus.classList.remove('.current-status');
    }

    let statusIndex = 0;

    if(deliveryProgress<50){
        statusIndex = 0;
    } else if(deliveryProgress<99) {
        statusIndex = 1;
    }
    else{
        statusIndex = 2;
    };

    progressIndicators[statusIndex].classList.add('current-status');
}



