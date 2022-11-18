import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this._container = this.makeContainer(this.product);
  }

  get elem() {
    return this._container;
  }

  makeContainer() {

    const price = this.product.price.toFixed(2);
    const image = this.product.image;
    const name = this.product.name;

    const div = createElement(`
      <div class="card">
    <div class="card__top">
        <img src="/assets/images/products/${image}" class="card__image" alt="product">
        <span class="card__price">${"€" + price}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
</div>
    `);

    let ttt = new CustomEvent("product-add", {
      detail: this.product.id,
      bubbles: true
    });




    div.onclick = function(event) {
      let target = event.target;

      if (target.className == 'card__button') {
        div.dispatchEvent(ttt);
      }
    };

    return div;
  }
}


