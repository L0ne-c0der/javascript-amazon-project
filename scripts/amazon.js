import {cart, updateCart} from '../data/cart.js'
import {products, loadProductsFetch} from '../data/products.js'
import formatCurrency from './utils/money.js';
import { displayCartQty } from './utils/cartQty.js';

// loadProducts(renderProductsGrid);

function renderProductsGrid (){
  displayCartQty();
  let productsHTML = ``;

  products.forEach((product) =>{
      productsHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>
  
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
  
            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStartURL()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>
  
            <div class="product-price">
              ${product.getPrice()}
            </div>
  
            <div class="product-quantity-container">
              <select class = "js-quantity-selector-${product.id}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
  
            ${product.extraInfoHTML()}
  
            <div class="product-spacer"></div>
  
            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>
  
            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
              Add to Cart
            </button>
          </div>`
  });
  
  //to display cart quantity immediately when the page loads
  
  document.querySelector('.js-products-grid').innerHTML = productsHTML;
  
  
  document.querySelectorAll('.js-add-to-cart').forEach(
    (button) =>
    {
        let intervalToken;
        button.addEventListener('click', () => {
          let productId = button.dataset.productId;
  
          updateCart(productId);
  
          
          
          //to display cart quantity in home page
          displayCartQty()
  
          //displaying added message
          intervalToken = addedPopUp(productId,intervalToken)
          
        })
    }
  )
  
  
  function addedPopUp(productId, intervalToken){
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`)
    addedMessage.classList.add('added-to-cart-visible')
  
    //13m
    if(intervalToken){
      clearInterval(intervalToken);
    }
    //13l
    return setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible')
    }, 2000);
  } 
}

async function loadPage(){
  await loadProductsFetch();
  renderProductsGrid();
};

loadPage();