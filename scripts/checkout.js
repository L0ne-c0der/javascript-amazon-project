import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import '../data/cart-class.js';
import '../data/backend-practice.js';
import { loadProductsFetch } from "../data/products.js";

async function loadPage(){
    try {
        // throw 'error1';
        
        console.log('load page');

        await loadProductsFetch();

        // const value = await new Promise((resolve) => {
        //     // throw 'error2';
        //     loadCart(() => {
        //         //resolve('value3');
        //         // reject('error3') // this is not working, although it creates an error after loading
        //         resolve();
        //     });
        // });
        renderOrderSummary();
        renderPaymentSummary();
        // console.log(value);
    } catch (error) {
        console.log('Unexpected error. Please try again later');
    }
    
};

loadPage();


//this creates multiple promises at the same time
//if you run it multiple times, loadPromise() works first
//other times, loadCart() runs first

// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     })

// ]).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// })


//better than using CallBack functions as it increases the indentation,
//while promises flatten the code

//Promises also run parallely, by creating a thread, if then is not used

// new Promise( (resolve) => {
//     loadProducts( () => {
//         resolve('value1');
//     });

// }).then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     });
// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     console.log('after promise')  
// });

// loadProducts(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });
