import Error404View from "./error404.view";
import { getCartItems, setCartItems } from "../local-storage";
import { shoppingCartBackRoute } from "../utils/utils";
import ProductCard from "../components/product-card.component";
const axios = require("axios").default;
// import axios from "axios";

export default class ProductDetailsView {
  static async after_render({ request: { id }, data }) {
    const products = await data;

    // Check existence in Local Storage and take SIZE property
    let existingProperty = null;
    const cartItems = getCartItems();
    const existItem = cartItems.find((locStorItem) => locStorItem._id === +id);

    if (existItem) {
      existingProperty = existItem.size;
    }

    if (id) {
      // const foundProduct = products.find((product) => product._id === +id);

      const response = await axios.get(
        `http://localhost:3000/api/products/${id}`
      );

      const foundProduct = await response.data;
      if (!foundProduct) return Error404View.render(); //PAZI NA + -ot za bekend

      const selectSize = document.querySelector(".form-select__singleProduct");
      if (!selectSize) return;

      // local Memory
      let memory = {
        size: existingProperty || "",
        count: foundProduct.quantity || 1,
      };
      const addToCartBtn = document.querySelector(".cart__btn-add-to-cart");
      if (!addToCartBtn) return;

      // addToCart LISTENER
      addToCartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const sizeErrorMessage = document.querySelector(".size__error-message");
        // const quantityErrorMessage = document.querySelector(".quantity__error-message");

        if (sizeErrorMessage) {
          sizeErrorMessage.style.display = "none";
        }

        let productNumber = document.getElementById(`counter${id}`).innerHTML;
        memory.count = parseInt(productNumber);
        let cartItems = getCartItems();
        let existenceCheck = cartItems.find(
          (locStorItems) => locStorItems._id === foundProduct._id
        );
        if (!existenceCheck) {
          foundProduct.size = memory.size;
          if (!foundProduct.size) {
            sizeErrorMessage.style.display = "block";

            // alert("Please select your size");
            return;
          }
          foundProduct.quantity = memory.count || 1;
          cartItems = [...cartItems, foundProduct];
          setCartItems(cartItems);
        }
        if (existenceCheck) {
          let filtered = cartItems.filter(
            (item) => item._id !== foundProduct._id
          );
          foundProduct.size = memory.size;
          if (!foundProduct.size) {
            sizeErrorMessage.style.display = "block";

            // alert("Please select your size");
            return;
          }
          foundProduct.quantity = memory.count || 1;
          setCartItems((cartItems = [...filtered, foundProduct]));
        }
        document.location.hash = `/cart/${id}`;
      });

      // counterPlus
      const plusButton = document.getElementsByClassName(`fa-plus${id}`);

      // const indexOfProduct = products.findIndex(
      //   (product) => product._id === +id
      // );
      // const numberInStock = products[indexOfProduct].stock;
      const numberInStock = foundProduct.stock;

      plusButton[0].addEventListener("click", () => {
        const quantityErrorMessage = document.querySelector(
          ".quantity__error-message"
        );
        if (quantityErrorMessage) {
          quantityErrorMessage.style.display = "none";
        }

        if (!selectSize) return;
        let numberFromProduct = parseInt(
          document.getElementById(`counter${id}`).innerHTML
        );
        if (numberFromProduct < numberInStock) {
          let incremented = (numberFromProduct += 1);
          document.getElementById(`counter${id}`).innerHTML =
            incremented.toString();
        } else {
          quantityErrorMessage.style.display = "block";
          // alert("No more available in store :(");
          return;
        }
      });

      // counterMinus
      const minusButton = document.getElementsByClassName(`fa-minus${id}`);

      minusButton[0].addEventListener("click", () => {
        const quantityErrorMessage = document.querySelector(
          ".quantity__error-message"
        );
        if (quantityErrorMessage) {
          quantityErrorMessage.style.display = "none";
        }
        let numberFromProduct = parseInt(
          document.getElementById(`counter${id}`).innerHTML
        );
        if (numberFromProduct >= 2) {
          let incremented = (numberFromProduct -= 1);
          document.getElementById(`counter${id}`).innerHTML =
            incremented.toString();
          quantityErrorMessage.style.display = "none";
        } else {
          return;
        }
      });

      // Sizes LISTENER
      selectSize.addEventListener("change", (e) => {
        foundProduct.size = e.target.value;
        if (!foundProduct.size) {
          return;
        } else {
          memory.size = e.target.value;
        }
      });
    }
  }

  static async render({ request: { id, resource }, data }) {
    console.log("render");
    window.scrollTo({
      top: 0,
    });

    const products = await data;

    const response = await axios.get(
      `http://localhost:3000/api/products/${id}`
    );

    const foundProduct = await response.data;

    // const foundProduct = products.find((product) => product._id === +id); //PAZI NA + -ot za bekend
    if (!foundProduct) return Error404View.render();

    let {
      image,
      name,
      brand,
      description,
      discountPrice,
      price,
      gender,
      sale,
      size,
      quantity,
      stock,
      choosenSize,
    } = foundProduct;

    const cartItems = getCartItems();
    const existItem = cartItems.find(
      (locStorItems) => locStorItems._id === foundProduct._id
    );

    if (existItem) {
      quantity = existItem.quantity;
      choosenSize = existItem.size;
    }

    // random 12 products

    const filteredProducts = products.filter(
      (product) => product.gender === gender
    );
    const random12Products = [...Array(filteredProducts.length).keys()]
      .sort(() => 0.5 - Math.random())
      .slice(0, 12)
      .map((index) => filteredProducts[index]);
    const random12ProductCards = random12Products
      .map((product) => {
        return ProductCard.render(product);
      })
      .join("");

    $(document).ready(function () {
      $(".card-container").slice(0, 24).show();
      if ($(".card-container").length < 24) {
        $("#loadMore").hide();
      }
      $("#loadMore").on("click", function (e) {
        e.preventDefault();
        $(".card-container:hidden").slice(0, 24).slideDown();
        if ($(".card-container:hidden").length === 0) {
          $("#loadMore").hide();
        }
      });
    });

    return `
      <section class="py-5">
        <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="col-md-6 img-fluid">
              <img 
                class="mb-5 mb-md-0 singleProduct__custom_img" width="1500"
                src="${image}"
                alt="${name}"
              />
            </div>
            <div class="col-md-6 single-product-info">
              <h5 class="fw-bolder fs-2">
              ${brand}
              </h5>
              <h1 class="display-5 fw-bolder singleProduct__name">
              ${name}
              </h1>
              <div class="fs-1 mb-3">
                ${
                  !stock
                    ? `<span class="text-muted text-decoration-line-through">
                <small>$${price}</small>
              </span>`
                    : discountPrice
                    ? `$${discountPrice} 
                <span class="text-muted text-decoration-line-through">
                  <small>$${price}</small>
                </span>`
                    : `$${price}`
                }
              </div>
              <p class="lead singleProduct__description">
                ${description}
              </p>
              <br/>
              <div class="d-flex"> 
              ${
                !stock
                  ? `<div class="out-of-stock"><h2>Out of Stock</h2><a href="/#/${
                      gender === "male" ? "men" : "women" || ""
                    }" 
                        class="cart__back-to-shop-link nav-link">Back to shop</a></div>`
                  : ` 
                <button class="page-link">
                  <i class="fas fa-minus fa-minus${id}"></i>
                </button>

                <div style="display:flex; align-items: center; justify-content: center;" class="page-link" id="counter${id}" > ${
                      quantity ? quantity : 1
                    }
                  </div>

                <button class="page-link counter__plus">
                  <i" class="fas fa-plus fa-plus${id}"></i>
                </button>
                <select style="width: 5rem" class="form-select__singleProduct me-3 " required>
                  <option value="" disabled selected>${
                    choosenSize || "Size"
                  }</option>
                  ${size.map((s) => `<option value="${s}">${s}</option>`)}
                </select>
                <button class="btn btn-outline-dark flex-shrink-0 cart__btn-add-to-cart" type="button">
                  <i class="bi-cart-fill me-1"></i>
                  Add to cart
                </button>`
              }
                </div>
                <div class="size__error-message mt-3 mb-3 fs-5 px-3 py-2">Please choose size!</div>
                <div class="quantity__error-message mt-3 mb-3 fs-5 px-3 py-2">No more items available in store<i class="bi bi-emoji-frown"></i></div>
            </div>
          </div>
        </div>
      </section>
      <section class="homepage-middle-section container pt-3">
      <div class="container">
        <div class="row  justify-content-center">
          <div class="col">
            <h2 class="homepage__offers_H2 mb-2 px-4 pb-4 fs-1">EXPLORE YOUR TRUE STYLE</h2>
          </div>
        </div>
        <div class= "mt-3">
        <div class="row gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-center reveal">
          ${random12ProductCards}
          </div>
        </div>
      </div>
    </section>
    `;
  }
}
