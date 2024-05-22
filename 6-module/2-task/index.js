

import createElement from '../../assets/lib/create-element.js';
export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.createProductCard();
    this.addProductCard();
    this.addToCart();
  }
  createProductCard() {
    const productCard = createElement(`
    <div class="card">
    <div class="card__top">
        <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
        <span class="card__price">€${this.product.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${this.product.name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
</div>
`)
    return productCard
  }

  addProductCard() {
    let createProductCard = this.createProductCard();
    this.elem = createProductCard
  }

  addToCart() {
    let btnAddToCart = this.elem.querySelector('.card__button');
    console.log(btnAddToCart);
    btnAddToCart.addEventListener('product-add', event => {

    })
    btnAddToCart.addEventListener('click', event => {
      let clickEvent = new CustomEvent('product-add', {
        detail: this.product.id,
        bubbles: true,
      })
      btnAddToCart.dispatchEvent(clickEvent);
    })
  }
}


