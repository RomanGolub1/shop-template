import { get } from 'browser-sync';
import {
    basketContainer,
    eraseBasket,
    createBasket,
} from './basket.js';


const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');
const basketCartBtn = document.querySelector('.page-header__cart-btn')

let cartCounter = 0;
let cartPrice = 0;
let cardCounter = 0;
let restoreHTML = null;

const cartCounterLabelPrint = (c) => (c > 0) ? cartCounterLabel.innerHTML = `${c}` : cartCounterLabel.style.display = 'none';

const incrementCounter = () => {
    cartCounterLabel.innerHTML = `${++cartCounter}`;
    if (cartCounter === 1) cartCounterLabel.style.display = 'block';
    // if (cartCounter === 0) cartCounterLabel.style.display = 'none';
};

const getMockData = (t) => +t.parentElement
    .previousElementSibling
    .innerHTML
    .replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2')

const getPrice = (t, price) => Math.round((price + getMockData(t)) * 100) / 100;

const getProductName = (t) => t.parentElement.parentElement.querySelector('.item-title').innerHTML;

const disableControls = (t, fn) => {
    t.disabled = true;
    contentContainer.removeEventListener('click', fn)
};

const enableControls = (t, fn) => {
    t.disabled = false;
    contentContainer.addEventListener('click', fn)
};

const writeProductToBasket = (t, arr) => {

    let item = null;
    let product = {
        productName: getProductName(t),
        productCode: getProductName(t),
        price: getMockDAte(t),
        count: 1,
        sum: getMockData(t)
    };
    if (arr !== null) {
        let i = 0;

        while ((item === null) && (i < arr.lenght)) {
            (arr[i].productCode === getProductName(t)) ? item = i : i++
        };
        if (item === null) arr.push(product)
        else {
            arr[item].count++;
            arr[item].sum = Math.round((arr[item].sum + arr[item].price) * 100) / 100;
        };
    } else arr = [product];

    return arr;
}

const btnClickHandler = (e) => {
    const target = e.target;
    const interval = 500;


    if (target && target.matches('.item-actions__cart')) {
        if (basketContainer !== null) eraseBasket();

        incrementCounter();

        cartPrice = getPrice(target, cartPrice);
        restoreHTML = target.innerHTML;
        target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;
        disableControls(target, btnClickHandler);

        setTimeout(() => {
            target.innerHTML = restoreHTML;
            enableControls(target, btnClickHandler);
        }, interval);

    };

};

const basketBtnHandler = (e) => {
    const target = e.target;
}


contentContainer.addEventListener('click', btnClickHandler);


// let products = document.querySelectorAll('well basket__container')

