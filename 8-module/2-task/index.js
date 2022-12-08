import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this._productGrid = this.makeGrid(this.products);
  }

  get elem() {
    return this._productGrid;
  }

  makeGrid() {
    let grid = createElement(`
    <div class="products-grid">
  <div class="products-grid__inner">

  </div>
</div>`);
    let root = grid.querySelector('.products-grid__inner');

    for (let i = 0; i < this.products.length; i++) {
      let productCard = new ProductCard(this.products[i]);
      root.append(productCard.elem);
    }

    return grid;
  }

  updateFilter(filters) {
    let elems = document.querySelectorAll('.card__title');
    // CHECKING SPICE
    if (1 < filters.maxSpiciness <= 4) {
      let filteredProducts = this.products.filter(product => product.spiciness > filters.maxSpiciness);

      for (let elem of elems) {
        for (let i = 0; i < filteredProducts.length; i++) {

          if (elem.innerHTML == filteredProducts[i].name) {
            elem.parentNode.parentNode.remove();
          }
        }
      }
    }
    // CHECKING CATEGORY
    if (filters.category) {
      let filteredProducts = this.products.filter(product => product.category != `${filters.category}`);

      for (let elem of elems) {
        for (let i = 0; i < filteredProducts.length; i++) {

          if (elem.innerHTML == filteredProducts[i].name) {
            elem.parentNode.parentNode.remove();
          }
        }
      }
    }
    // CHECKING "NONUTS"
    if (filters.noNuts) {
      let filteredProducts = this.products.filter(product => product.nuts);

      for (let elem of elems) {
        for (let i = 0; i < filteredProducts.length; i++) {

          if (elem.innerHTML == filteredProducts[i].name) {
            elem.parentNode.parentNode.remove();
          }
        }
      }
    }
    // CHECKING VEGGIES
    if (filters.vegeterianOnly) {
      let filteredProducts = this.products.filter(product => !product.vegeterian);

      for (let elem of elems) {
        for (let i = 0; i < filteredProducts.length; i++) {

          if (elem.innerHTML == filteredProducts[i].name) {
            elem.parentNode.parentNode.remove();
          }
        }
      }
    }

  }
}
