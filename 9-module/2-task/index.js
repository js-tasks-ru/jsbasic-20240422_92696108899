import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";



export default class Main {
  constructor() { }

  async render() {

    this.renderCarousel();
    this.renderRibbonMenu();
    this.renderStepSlider();
    this.renderCartIcon();
    this.cart = new Cart(this.cartIcon);

    this.productArray = await this.fetchProducts();
    this.renderProductsGrid();

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', (ev) => {
      let productId = ev.detail;
      let product = this.productArray.find(item => item.id === productId);
      this.cart.addProduct(product);
    });
    document.addEventListener('slider-change', (ev) => {
      this.productsGrid.updateFilter({ maxSpiciness: ev.detail });
    });
    document.addEventListener('ribbon-select', (ev) => {
      this.productsGrid.updateFilter({ category: ev.detail });
    });
    document.addEventListener('change', (ev) => {
      if (ev.target.closest('#nuts-checkbox')) {
        let checked = document.getElementById('nuts-checkbox').checked;
        this.productsGrid.updateFilter({ noNuts: checked })
      }
      if (ev.target.closest('#vegeterian-checkbox')) {
        let checked = document.getElementById('vegeterian-checkbox').checked;
        this.productsGrid.updateFilter({ vegeterianOnly: checked })
      }
    });
  }

  renderCarousel() {
    this.carousel = new Carousel(slides);
    document.querySelector("[data-carousel-holder]")
      .append(this.carousel.elem);
  };
  renderRibbonMenu() {
    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector("[data-ribbon-holder]")
      .append(this.ribbonMenu.elem);
  };
  renderStepSlider() {
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document.querySelector("[data-slider-holder]")
      .append(this.stepSlider.elem);
  };
  renderCartIcon() {
    this.cartIcon = new CartIcon();
    document.querySelector("[data-cart-icon-holder]")
      .append(this.cartIcon.elem);
  };
  renderProductsGrid() {
    this.productsGrid = new ProductsGrid(this.productArray);
    document.querySelector('[data-products-grid-holder]')
      .innerHTML = '';
    document.querySelector('[data-products-grid-holder]')
      .append(this.productsGrid.elem);
  };
  async fetchProducts() {
    let response = await fetch('products.json');
    let products = await response.json();

    return products;
  }
}
