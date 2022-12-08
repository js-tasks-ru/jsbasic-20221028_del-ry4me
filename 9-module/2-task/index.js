import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.slides = slides;
  }

  async render() {
    // ... ваш код
    let carouselHolder = document.querySelector('[data-carousel-holder]');
    let ribbonHolder = document.querySelector('[data-ribbon-holder]');
    let sliderlHolder = document.querySelector('[data-slider-holder]');
    let cartIconlHolder = document.querySelector('[data-cart-icon-holder]');
    let productGridlHolder = document.querySelector('[data-products-grid-holder]');
    let loadingSceleton = document.querySelector('.is-loading');

    let config = {steps: 5, value: 3};

    let carousel = new Carousel(this.slides);
    let ribbonMenu = new RibbonMenu(categories);
    let stepSlider = new StepSlider(config);
    let cartIcon = new CartIcon();
    let cart = new Cart(cartIcon);

    carouselHolder.append(carousel.elem);
    ribbonHolder.append(ribbonMenu.elem);
    sliderlHolder.append(stepSlider.elem);
    cartIconlHolder.append(cartIcon.elem);

    let response = await fetch('products.json');
    let products = await response.json();

    let productGrid = new ProductsGrid(products);

    loadingSceleton.remove();
    productGridlHolder.append(productGrid.elem);

    productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value
    });
    // ADD PRODUCT TO CART
    document.body.addEventListener('product-add', function(event) {
      for (let i = 0; i < products.length; i++) {
        if (event.detail === products[i].id) {
          cart.addProduct(products[i]);
        }
      }
    });
    // UPDATE FILTER ON SPICINESS
    stepSlider.elem.addEventListener('slider-change', function(event) {
      productGrid.updateFilter({maxSpiciness: event.detail});
    });
    // UPDATE FILTER ON CATEGORIES (RIBBON MENU)
    document.body.addEventListener('ribbon-select', function(event) {
      productGrid.updateFilter({category: event.detail});
    });
    // NO NUTS FILTER (CHECKBOX)
    document.body.querySelector('#nuts-checkbox').addEventListener('change', function(event) {
      if (event.target.checked) {
        productGrid.updateFilter({noNuts: true});
      } else {
        productGrid.updateFilter({noNuts: false});
      }
    });

    document.body.querySelector('#vegeterian-checkbox').addEventListener('change', function(event) {
      if (event.target.checked) {
        productGrid.updateFilter({vegeterianOnly: true});
      } else {
        productGrid.updateFilter({vegeterianOnly: false});
      }
    });

  }
}
