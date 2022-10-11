const axios = require("axios").default;
import { setToken, setUser } from "../local-storage";

export default class SigninView {
  static after_render() {
    const loginForm = document.getElementById("loginForm");
    const loginErrorMessage = document.querySelector(".login__error-message");
    if (loginForm) {
      loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const emailLogin = document.getElementById("emailLogin");
        const passwordLogin = document.getElementById("passwordLogin");

        loginErrorMessage.style.display = "none";
        axios
          .post(`http://localhost:3000/api/auth/login`, {
            email: emailLogin.value,
            password: passwordLogin.value,
          })
          .then((res) => {
            setToken(res.data.token);
            setUser({
              fullName: res.data.fullName,
              username: res.data.username,
              email: res.data.email,
              id: res.data._id,
            });
            emailLogin.value = "";
            passwordLogin.value = "";
            if (sessionStorage.getItem("order")) {
              document.location.hash = `/order`;
            } else {
              document.location.hash = `/`;
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.response.data) {
              loginErrorMessage.innerText = err.response.data;

              loginErrorMessage.style.display = "block";
            }
          });
      });
    }
  }

  static render() {
    window.scrollTo({
      top: 0,
    });
    return `<section class="h-100 gradient-form mt-5">
    <div class="container py-5 h-100 shadow-lg p-3 mb-5 bg-body rounded">
      <div class="row d-flex justify-content-center align-items-center h-100 ">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">
  
                  <div class="text-center">
                  <h4 class="mb-4">Please login to your account</h4>
                  </div>
                  <form id="loginForm" class="form-sign-in">
  
                    <div class="form-floating mb-4">
                      <input type="email" id="emailLogin" class="form-control"
                        placeholder="Phone number or email address" />
                      <label class="form-label" for="emailLogin">Email</label>
                    </div>
  
                  
                    <div class="form-floating mb-4">
                    <input type="password" id="passwordLogin" class="form-control" 
                        placeholder="Input password" />
                      <label class="form-label" for="passwordLogin">Password</label>
                    </div>
  
                    <div class="text-center pt-1 mb-5 pb-1 log-in-button">
                      <button class="btn btn-block fa-lg mb-3 btn-lg btn btn-outline-dark" type="submit">
                      Log in</button>
                        <div class="login__error-message align-items-center justify-content-center pb-4">
                      <p class="mb-0 me-2">Please fill out all fields</p>
                    </div>
                      <a class="text-muted" href="#!">Forgot password?</a>
                    </div>
  
                    <div class="d-flex align-items-center justify-content-center pb-4 buttons-create-new">
                      <p class="mb-0 me-2">Don't have an account?</p>
                      <a href="/#/register" class="btn btn-outline-light btn-dark btn-create-new">Create new</a>
                      </div>
                  </form>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center card-logo">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                <div class="text-company">
                <object data="images/logo/white-logo.svg" width="100em" height="100em"> </object>
                  <h4 class="mb-4">We are more than just a company</h4>
                  <p class="small mb-0">ORYX caters to thoughtful shoppers who appreciate unique designs and top quality pieces you just can’t find anywhere else. We are constantly curating fresh new collections and looking for the next big thing our customers will love. Founded in Skopje, Macdonia in 2016, we are proud to be your Online Clothing Shop that you can rely on for our expert service and care.</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
  }
}
