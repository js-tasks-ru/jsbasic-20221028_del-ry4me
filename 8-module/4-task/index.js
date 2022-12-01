import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let cartItem = {};
    if (product === {} || product === null || product === '' || product == undefined) {
      return this.cartItems;
    } else if (this.cartItems.some((element) => product.id == element.product.id)) {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (product.id == this.cartItems[i].product.id) {
          let count = this.cartItems[i].count + 1;
          this.cartItems[i].count = count;
          cartItem = {product: product, count: count};
        }
      }
    } else if (!this.cartItems.some((element) => product.id == element.product.id)) {
      cartItem = {product: product, count: 1};
      this.cartItems.push(cartItem);
    }


    this.onProductUpdate(cartItem);
    return this.cartItems;
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let cartItem = {};
    for (let i = 0; i < this.cartItems.length; i++) {
      if (productId == this.cartItems[i].product.id) {
        this.cartItems[i].count = this.cartItems[i].count + amount;
        cartItem = this.cartItems[i];
        this.onProductUpdate(cartItem);
        if (this.cartItems[i].count == 0) {
          this.cartItems.splice(i, 1);
          cartItem = ''; // type change to prevent error in  onProductUpdate
          this.onProductUpdate(cartItem);

        }
      }
    }
    return this.cartItems;
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if (this.cartItems.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalCount = 0;

    for (let i = 0; i < this.cartItems.length; i++) {
      totalCount = totalCount + this.cartItems[i].count;
    }
    return totalCount;
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      totalPrice = totalPrice + (this.cartItems[i].product.price * this.cartItems[i].count);
    }
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
  product.id
}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
    2
  )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    let modal = new Modal();
    let title = 'Your order';
    let orderForm = this.renderOrderForm();

    let div = document.createElement('div');
    for (let i = 0; i < this.cartItems.length; i++) {
      let newProduct = this.renderProduct(this.cartItems[i].product, this.cartItems[i].count);
      div.append(newProduct);
    }
    div.append(orderForm);



    modal.setTitle(title);
    modal.setBody(div);
    modal.open();

    document.body.addEventListener('click', (event) => {
      let target = event.target;
      if (target.parentNode.className == 'cart-counter__button cart-counter__button_plus') {
        let currentProductId = target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.productId;
        for (let i = 0; i < this.cartItems.length; i++) {
          if (currentProductId == this.cartItems[i].product.id) {
            let amount = 1;
            this.updateProductCount(currentProductId, amount);
            let cartItem = this.cartItems[i];
            this.onProductUpdate(cartItem);
          }
        }
      }
    });

    document.body.addEventListener('click', (event) => {
      let target = event.target;
      if (target.parentNode.className == 'cart-counter__button cart-counter__button_minus') {
        let currentProductId = target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.productId;
        for (let i = 0; i < this.cartItems.length; i++) {
          if (currentProductId == this.cartItems[i].product.id) {
            let amount = -1;
            this.updateProductCount(currentProductId, amount);
            let cartItem = this.cartItems[i];
            this.onProductUpdate(cartItem);
          }
        }
      }
    });

    let form = document.forms[0];

    form.onsubmit = (event) => this.onSubmit(event);


  }

  onProductUpdate(cartItem) {
    // ...ваш код
    if (this.cartItems.length === 0) {
      document.body.classList.remove('is-modal-open');
      document.querySelector('.modal').remove();

    }

    if (document.body.className == 'is-modal-open' && cartItem !== '') {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal__body');
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      let total = this.getTotalPrice();

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${total.toFixed(2)}`;

    }


    this.cartIcon.update(this);



  }

  onSubmit(event) {
    // ...ваш код
    event.preventDefault();
    let submitButton = document.body.querySelector('[type="submit"]');
    let bodyInner = document.querySelector('.modal__body');
    let title = document.body.querySelector('.modal__title');
    submitButton.classList.add('.is-loading');

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(document.forms[0])})
      .then((response) => {if (response.ok) {
        title.innerHTML = 'Success!';
        this.cartItems = [];
        this.cartIcon.update(this);
        bodyInner.innerHTML = '<div class="modal__body-inner"><p>\
          Order successful! Your order is being cooked :) <br>\
          We’ll notify you about delivery time shortly.<br>\
          <img src="/assets/images/delivery.gif"></p></div>';
      }});

  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

