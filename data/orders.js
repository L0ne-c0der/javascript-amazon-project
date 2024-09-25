export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}

export function findOrder(orderId){
    let orderObject = null;
    orders.forEach((orderDetails) => {
        if(orderDetails.id === orderId){
            orderObject = orderDetails;
        }
    })
    return orderObject;
};

export function findOrderProduct(orderId, productId){
    const orderObject = findOrder(orderId);
    let foundProduct = null;
    orderObject.products.forEach(product => {
        if(productId === product.productId){
            foundProduct = product;
        }
    })
    return foundProduct;
}