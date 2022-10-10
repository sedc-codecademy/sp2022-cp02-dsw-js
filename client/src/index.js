import {
  parseRequestUrl,
  getAllProducts,
  reveal,
  navbarCounter,
} from "./utils/utils.js";
import { getCartItems } from "./local-storage";
import HomepageView from "./views/homepage.view.js";
import ContactView from "./views/contact.view.js";
import CartView from "./views/cart.view.js";
import SigninView from "./views/signin.view.js";
import OrderView from "./views/order.view.js";
import ProductsView from "./views/products.view.js";
import PrivacyPolicyView from "./views/privacy-policy.view.js";
import AboutView from "./views/about.view.js";
import Error404View from "./views/error404.view.js";
import ProductDetailsView from "./views/product-details.view.js";
import FaqView from "./views/faq.view.js";
import FilteredProductsView from "./views/filtered-products.view.js";
import SearchFilteredProductsView from "./views/search-filtered-products.view.js";
import RegisterView from "./views/register.view.js";
import ErrorView from "./views/error.view.js";
import TeamView from "./views/team.view.js";
import TermsAndConditions from "./views/terms-and-conditions.view.js";
import axios from "axios";

const routes = {
  "/": HomepageView,
  "/search/:id": SearchFilteredProductsView,
  "/men/:id": FilteredProductsView,
  "/men": ProductsView,
  "/women/:id": FilteredProductsView,
  "/women": ProductsView,
  "/product/:id": ProductDetailsView,
  "/sale/:id": FilteredProductsView,
  "/sale": ProductsView,
  "/contact": ContactView,
  "/cart/:id": CartView,
  "/cart": CartView,
  "/signin": SigninView,
  "/order": OrderView,
  "/privacy-policy": PrivacyPolicyView,
  "/about": AboutView,
  // "/product-details": ProductDetailsView
  "/faq": FaqView,
  "/register": RegisterView,
  "/error": ErrorView,
  "/team": TeamView,
  "/terms-and-conditions": TermsAndConditions,
};

export default class App {
  static async router() {
    const request = parseRequestUrl();
    const parseUrl =
      (request.resource ? `/${request.resource}` : "/") +
      (request.id ? `/:id` : "") +
      (request.verb ? `/${request.verb}` : "");
    // console.log("REQUEST", request);
    // console.log("parseURL", parseUrl);
    const view = routes[parseUrl] ? routes[parseUrl] : Error404View;
    const main = document.getElementById("main-container");
    const options = {
      request: request,
      data: getAllProducts(),
    };

    // Show user and logout when loggedin and registered

    // IF NOT LOGGED IN

    if (
      !JSON.parse(localStorage.getItem("user")) &&
      document.querySelector(".signInLogo").classList.contains("notLoggedUser")
    ) {
      document.querySelector(".notLoggedUser").addEventListener("click", () => {
        document.location.hash = `/signin`;
      });
    }

    // IF USER LOGGEDIN

    // show username if loggedin
    if (JSON.parse(localStorage.getItem("user"))) {
      document
        .querySelector(".signInLogo")
        .classList.remove("bi-person-circle", "notLoggedUser");
      if (document.querySelector(".signInLogo")) {
        document.querySelector(
          ".signInLogo"
        ).innerHTML = `<span class="user_name">${
          JSON.parse(localStorage.getItem("user")).username
        }</span>`;
      }

      // mouseleave show username
      if (localStorage.getItem("user")) {
        if (document.querySelector(".signInLogo")) {
          document
            .querySelector(".signInLogo")
            .addEventListener("mouseleave", (e) => {
              if (document.querySelector(".signInLogo")) {
                document.querySelector(
                  ".signInLogo"
                ).innerHTML = `<span class="user_name">${
                  JSON.parse(localStorage.getItem("user")).username
                }</span>`;
              }
            });
        }
      }

      // show logout when hovered
      document
        .querySelector(".signInLogo")
        .addEventListener("mouseenter", (e) => {
          if (localStorage.getItem("user")) {
            document.querySelector(
              ".signInLogo"
            ).innerHTML = `<span class="logout_button">Logout</span>`;
          }

          if (document.querySelector(".logout_button")) {
            document
              .querySelector(".logout_button")
              .addEventListener("click", () => {
                console.log("ovo mi treba ", localStorage.getItem("token"));
                axios
                  .post(
                    `http://localhost:3000/api/auth/logout`,
                    {
                      _id: JSON.parse(localStorage.getItem("user")).id,
                    },
                    {
                      headers: {
                        authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  )
                  .then(() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    document
                      .querySelector(".signInLogo")
                      .classList.add("bi-person-circle", "notLoggedUser");
                    document.querySelector(".signInLogo").innerHTML = ``;

                    // document.location.hash = `/`;
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
          }
        });
    }

    // console.log("OPTIONS", options);
    main.innerHTML = await view.render(options);
    await ProductDetailsView.after_render(options);
    await CartView.after_render(options);
    await ProductsView.after_render(options);
    await SigninView.after_render();
    await RegisterView.after_render();
  }
  static init() {
    const axios = require("axios").default;
    document
      .getElementById("search-bar")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        let searchKeyword = document.getElementById("q").value;
        if (!searchKeyword) {
          searchKeyword = Math.random();
        }
        document.location.hash = `/search/${searchKeyword}`;
        document.getElementById("q").value = "";
      });

    document.querySelector(".footer-links").addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        window.scrollTo(0, 0);
      }
    });

    window.addEventListener("load", this.router);
    window.addEventListener("hashchange", this.router);
    window.addEventListener("scroll", reveal);

    navbarCounter();
  }
}

App.init();
