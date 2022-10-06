import { getCartItems, setCartItems } from "../local-storage";
const axios = require("axios").default;

export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split("/");

  return {
    resource: request[1],
    id: request[2],
    verb: request[3],
  };
};

export const getAllProducts = async () => {
  try {
    // const response = await fetch("../data/clothes.json");
    const { data } = await axios.get("http://localhost:3000/api/products");
    // const data = await response.json();

    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    // To do something with the error
  }
};

export const reveal = () => {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 70;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
};

export const navbarCounter = () => {
  const counters = [
    ...document.getElementsByClassName("shopping-cart-navbar-items"),
  ];
  const cartItems = getCartItems();
  const navbarItems =
    cartItems.length > 0 ? cartItems.reduce((a, c) => a + c.quantity, 0) : 0;
  counters.forEach((counter) => {
    counter.innerHTML = navbarItems;
    navbarItems < 1
      ? (counter.style.visibility = "hidden")
      : (counter.style.visibility = "visible");
  });
};

export const deleteCartItem = (view) => {
  const deleteButtons = [...document.querySelectorAll(".cart__close-btn")];
  if (!deleteButtons) return;
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (ev) => {
      const cartItems = getCartItems();
      const filteredProducts = cartItems.filter(
        (cartItem) => cartItem._id != ev.target.id
      );
      setCartItems(filteredProducts);
      rerender(view);
    });
  });
};

export const counterPlus = (view) => {
  const plusButtons = [...document.querySelectorAll(".fa-plus")];
  if (!plusButtons) return;

  plusButtons.forEach((plusButton) => {
    plusButton.addEventListener("click", (ev) => {
      const id = ev.target.classList[2];

      const quantityErrorMessage = document.getElementById(
        `${id}-error-quantity`
      );
      if (quantityErrorMessage) {
        quantityErrorMessage.style.display = "none";
      }

      if (document.getElementById(`counter${id}`)) {
        let numberFromProduct = parseInt(
          document.getElementById(`counter${id}`).innerHTML
        );
        const cartItems = getCartItems();
        console.log(cartItems);
        if (cartItems.length > 0) {
          const indexOfUpdate = cartItems.findIndex(
            (cartItem) => cartItem._id === id
          );

          let helper =
            cartItems[indexOfUpdate].quantity ===
            cartItems[indexOfUpdate].stock;
          if (!helper) {
            cartItems[indexOfUpdate].quantity += 1;
            setCartItems(cartItems);
            numberFromProduct += 1;
            document.getElementById(`counter${id}`).innerHTML =
              numberFromProduct.toString();
            rerender(view);
          }
          if (helper) {
            quantityErrorMessage.style.display = "block";
            // alert("No more available in store :(");
            return;
          }
        }
      }
    });
  });
};

export const counterMinus = (view) => {
  const minusButtons = [...document.querySelectorAll(".fa-minus")];
  if (!minusButtons) return;
  minusButtons.forEach((minusButton) => {
    minusButton.addEventListener("click", (ev) => {
      const id = ev.target.classList[2];
      if (document.getElementById(`counter${id}`)) {
        let numberFromProduct = parseInt(
          document.getElementById(`counter${id}`).innerHTML
        );
        const cartItems = getCartItems();
        if (cartItems.length > 0) {
          const indexOfUpdate = cartItems.findIndex(
            (cartItem) => cartItem._id === id
          );
          let helper = cartItems[indexOfUpdate].quantity;
          if (helper > 1) {
            cartItems[indexOfUpdate].quantity -= 1;
            setCartItems(cartItems);
            numberFromProduct -= 1;
            document.getElementById(`counter${id}`).innerHTML =
              numberFromProduct.toString();
            rerender(view);
          }
          if ((helper = 1)) {
            return;
          }
        }
      }
    });
  });
};

export const rerender = async (component) => {
  document.getElementById("main-container").innerHTML =
    await component.render();
  await component.after_render();
};

export const shoppingCartBackRoute = () => {
  const cartItems = getCartItems();
  if (cartItems.length < 1) return "";
  const lastCartItemGender = cartItems[cartItems.length - 1].gender;
  return lastCartItemGender === "male" ? "men" : "women";
};

export const shippingPrice = () => {
  const shippingOptions = document.querySelector(".shipping-options");
  // if (!shippingOptions) return;
  // const quantityErrorMessage = document.getElementById(`${id}-error-quantity`)
  const quantityErrorMessage = document.querySelector(
    ".quantity-cart__error-message"
  );
  if (quantityErrorMessage) {
    quantityErrorMessage.style.display = "none";
  }
  if (shippingOptions) {
    shippingOptions.addEventListener("change", (e) => {
      const quantityErrorMessage = document.querySelector(
        ".quantity-cart__error-message"
      );
      if (quantityErrorMessage) {
        quantityErrorMessage.style.display = "none";
      }

      const cartItems = getCartItems();
      if (cartItems.length < 1) return;
      let filteredPrice = cartItems.map((x) => {
        if (x.discountPrice == null) {
          return x.price * x.quantity;
        } else {
          return x.discountPrice * x.quantity;
        }
      });
      let totalPrice = Number(
        filteredPrice.reduce((a, c) => a + c, 0).toFixed(2)
      );
      let selectedOption = e.target.value;
      let selectedShippingPrice =
        selectedOption === "standard"
          ? 5
          : selectedOption === "express"
          ? 10
          : null;
      let updatedPrice = (selectedShippingPrice + totalPrice).toFixed(2);
      document.querySelector(
        ".total-order-price"
      ).innerHTML = `$${updatedPrice}`;
    });
  }
};
