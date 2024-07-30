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

    if (product) {
      let cartItemIndex = this.cartItems.indexOf(
        this.cartItems.find(item => item.product.id === product.id));

      if (this.cartItems.find(item => item.product.id === product.id)) {
        this.cartItems[cartItemIndex].count++;
        this.onProductUpdate(this.cartItems[cartItemIndex])
      } else {
        this.cartItems.push({ product, count: 1, })
        this.onProductUpdate(this.cartItems[cartItemIndex + 1])
      }

    }

  }

  updateProductCount(productId, amount) {
    let cartItemIndex = this.cartItems.indexOf(
      this.cartItems.find(item => item.product.id === productId)
    );
    if (cartItemIndex !== -1) {
      this.cartItems[cartItemIndex].count += amount;

      if (this.cartItems[cartItemIndex].count === 0) {
        this.cartItems.splice(cartItemIndex, 1)
      }
    }
    this.onProductUpdate(this.cartItems[cartItemIndex])
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      totalCount += this.cartItems[i].count;
    }
    return totalCount
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      totalPrice += this.cartItems[i].product.price * this.cartItems[i].count;
    }
    return totalPrice
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
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
    this.modalWindow = new Modal();

    this.modalWindow.setTitle(`Your order`);

    let modalContent = createElement(`<div></div>`)
    for (let i = 0; i < this.cartItems.length; i++) {
      modalContent.append(
        this.renderProduct(this.cartItems[i].product, this.cartItems[i].count)
      );
    };
    modalContent.append(this.renderOrderForm());
    this.modalWindow.setBody(modalContent);
    // add or emove product
    this.modalBody = this.modalWindow.modal.querySelector('.modal__body')
    this.modalBody.addEventListener('click', (ev) => {
      let cartProduct = ev.target.closest('.cart-product')
      if (cartProduct) {
        this.productId = cartProduct.dataset.productId;
        let addProduct = ev.target.closest('.cart-counter__button_plus');
        let removeProduct = ev.target.closest('.cart-counter__button_minus');
        if (addProduct) this.updateProductCount(this.productId, 1);
        if (removeProduct) this.updateProductCount(this.productId, -1);

        let cartItemIndex = this.cartItems.indexOf(
          this.cartItems.find(item => item.product.id === this.productId)
        );
        if (cartItemIndex === -1) cartProduct.remove();
        if (!this.cartItems.length) this.modalWindow.close();
      }
    });

    this.sendDataForm = this.modalBody.querySelector('.cart-form');
    this.sendDataForm.addEventListener('submit', (ev) => {
      if (ev.target.closest('.cart-form')) this.onSubmit(ev);
    })

    this.modalWindow.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (document.querySelector('.is-modal-open')) {
      let productCount = this.modalBody.querySelector(`
          [data-product-id="${this.productId}"] .cart-counter__count
        `);
      let productPrice = this.modalBody.querySelector(`
          [data-product-id="${this.productId}"] .cart-product__price
        `);
      let infoPrice = this.modalBody.querySelector(`.cart-buttons__info-price`);

      if (cartItem) {
        productCount.innerHTML = cartItem.count
        productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      }
    };
  }


  async onSubmit(event) {
    event.preventDefault();

    this.modalBody
      .querySelector('button[type="submit"]')
      .classList.add('is-loading');

    let fd = new FormData(this.sendDataForm);
    await fetch('https://httpbin.org/post', { method: 'POST', body: fd, })
      .then(response => {
        if (response.ok) {
          this.modalWindow.setTitle(`Success!`);
          this.cartItems = []
          this.cartIcon.update(this);
          this.modalWindow.setBody(createElement(`
             <div class="modal__body-inner">
               <p>
                 Order successful! Your order is being cooked :) <br>
                 We’ll notify you about delivery time shortly.<br>
                 <img src="/assets/images/delivery.gif">
               </p>
             </div>
             `));
        }
        if (!response.ok) {
          throw new Error()
        }
        return response.json();
      })
      .catch((err) => {
        // console.log(err)
      })
  };

  /* 
    async onSubmit(event) {
      event.preventDefault();
  
      this.modalBody
        .querySelector('button[type="submit"]')
        .classList.add("is-loading");
      let form = this.modalBody.querySelector('.cart-form');
      let userData = new FormData(form);
  
      await fetch('https://httpbin.org/post', { method: 'POST', body: userData });
  
      this.modal.setTitle("Success!");
      this.modalBody
        .querySelector('button[type="submit"]')
        .classList.remove("is-loading");
  
      this.cartItems = [];
      this.cartIcon.update(this);
  
      this.modalBody.innerHTML = `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
        `;
    };
  
   */

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
