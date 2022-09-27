import CartItem from "../components/cart-item.component";
import { getCartItems } from "../local-storage";
import {
  deleteCartItem,
  counterPlus,
  counterMinus,
  navbarCounter,
  shoppingCartBackRoute,
  shippingPrice,
} from "../utils/utils";

export default class CartView {
  static async after_render() {
    counterPlus(CartView);
    counterMinus(CartView);
    shippingPrice();
    deleteCartItem(CartView);
  }
  static async render() {
    // window.scrollTo({
    //   top: 0,
    // });
    const cartItems = getCartItems();
    const filteredPrice = cartItems.map((x) => {
      if (x.discountPrice == null) {
        return x.price * x.quantity;
      } else {
        return x.discountPrice * x.quantity;
      }
    });

    navbarCounter();

    return `
      <div class="shopping-cart__card container mt-5 mb-5 rounded-3">
        <div class="row">
          <div class="col-md-8 cart">
            <div class="cart__title">
              <div class="row">
                <div class="col"><h4><b>Shopping Cart</b></h4></div>
                <div class="col align-self-center text-end text-muted">
                  ${
                    cartItems.length > 0
                      ? `${cartItems.reduce((a, c) => a + c.quantity, 0)} 
                  items`
                      : "Empty"
                  } 
                </div>
              </div >
            </div >
            ${cartItems
              .map((cartItem) => `${CartItem.render(cartItem)}`)
              .join("")}
            <div class="cart__back-to-shop"><a href="/#/${
              shoppingCartBackRoute() || ""
            }" 
            class="cart__back-to-shop-link nav-link">Back to shop</a></div>
          </div >
          <div class="col-md-4  cart__summary">
            <div><h5><b>Summary</b></h5></div>
            <hr>
            <div class="row" >
              <div class="col" style="padding-left:2vh;">
                ITEMS ${cartItems.reduce((a, c) => a + c.quantity, 0)}
              </div>
              <div class="col text-right">$${filteredPrice
                .reduce((a, c) => a + c, 0)
                .toFixed(2)}</div>
            </div>
            <form class="cart__summary__form">
              <p>SHIPPING*</p>
              <select class="shipping-options" required>
                <option value="" disabled selected>Delivery</option>
                <option value="standard" class="text-muted">Standard - $5.00</option>
                <option value="express" class="text-muted">Express - $10.00</option>
              </select>
              <p>GIVE CODE</p>
                <input class="cart__summary__form__code" placeholder="Enter your code">
            </form>
            <div class="row" style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;">
              <div class="col">TOTAL PRICE</div>
              <div class="col text-right total-order-price">$ 
                ${filteredPrice.reduce((a, c) => a + c, 0).toFixed(2)}
              </div>
            </div>
            <a href="/#/order" class="order-now-link link-light">
              <button class="cart__summary__form__btn mb-4">ORDER NOW</button>
            </a>
            <div class="shipping__error-message mt-3 mb-3 fs-6">* Select delivery method
            </div>
          </div>
        </div >
      </div >
    `;
  }
}
