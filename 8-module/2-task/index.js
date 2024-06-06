import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
          
        </div>
      </div>
    `);
    this.productsGridAll = this.elem.querySelector('.products-grid__inner');
    for (let i = 0; i < this.products.length; i++) {
      this.productsGridAll.append(new ProductCard(this.products[i]).elem);
    }
    this.currentFilters = {};
  }

  updateFilter(filters) {
    for (let key in filters) {
      if (key !== undefined) this.currentFilters[key] = filters[key]
    }
    let conditNoNuts = true;
    let conditVegOnly = true;
    let conditSpiciness = true;
    let conditCategory = true;

    if (filters) {
      this.productsGridAll.innerHTML = ""

      for (let i = 0; i < this.products.length; i++) {
        if (this.currentFilters.noNuts) {
          conditNoNuts =
            (this.products[i].nuts === undefined || this.products[i].nuts === false);
        };
        if (this.currentFilters.vegeterianOnly) {
          conditVegOnly =
            (this.products[i].vegeterian === this.currentFilters.vegeterianOnly);
        };
        if (-this.currentFilters.maxSpiciness) {
          conditSpiciness =
            (this.products[i].spiciness <= this.currentFilters.maxSpiciness);
        };
        if (this.currentFilters.category) {
          conditCategory =
            (this.products[i].category === this.currentFilters.category);
        };
        if (conditNoNuts & conditVegOnly & conditSpiciness & conditCategory) {
          this.productsGridAll.append(new ProductCard(this.products[i]).elem);
        };
      }
      
    }
  }
}

/* 
  {
    name: "Som tam papaya salad",
    price: 9.5,
    category: "salads",
    image: "som_tam_papaya_salad.png",
    id: "som-tam-papaya-salad",
    spiciness: 0
  },

let filters = {
noNuts: true, // true/false         = >  products[i].nuts == false
vegeterianOnly: true, // true/false = >  products[i].vegeterian == true
maxSpiciness: 3, // числа от 0 до 4 = >  products[i].spiciness <= filters.maxSpiciness
category: 'soups' // ID категории   = >  products[i].category === filters.category 
};


*/

