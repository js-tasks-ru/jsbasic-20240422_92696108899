export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

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
    // console.log(this.cartItems)
  };

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
    // console.log(this.cartItems)

  }

  isEmpty() {
    return Boolean(this.cartItems.length);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
