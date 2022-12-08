export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
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
    // ваш код
    let cartItem = {};
    for (let i = 0; i < this.cartItems.length; i++) {
      if (productId == this.cartItems[i].product.id) {
        this.cartItems[i].count = this.cartItems[i].count + amount;
        cartItem = this.cartItems[i];
        this.onProductUpdate(cartItem);
        if (this.cartItems[i].count == 0) {
          this.cartItems.splice(i, 1);
          cartItem = {};
          this.onProductUpdate(cartItem);

        }
      }
    }
    return this.cartItems;
  }

  isEmpty() {
    // ваш код
    if (this.cartItems.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  getTotalCount() {
    // ваш код
    let totalCount = 0;

    for (let i = 0; i < this.cartItems.length; i++) {
      totalCount = totalCount + this.cartItems[i].count;
    }
    return totalCount;
  }

  getTotalPrice() {
    // ваш код
    let totalPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      totalPrice = totalPrice + (this.cartItems[i].product.price * this.cartItems[i].count);
    }
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче


    this.cartIcon.update(this);
  }
}

