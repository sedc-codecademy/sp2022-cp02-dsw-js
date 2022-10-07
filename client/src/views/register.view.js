const axios = require("axios").default;
import { setToken, setUser } from "../local-storage";

export default class RegisterView {
  static after_render() {
    const form = document.getElementById("registerForm");
    const registerErrorMessage = document.querySelector(
      ".register__error-message"
    );

    if (form) {
      form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName");
        const username = document.getElementById("username");
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        registerErrorMessage.style.display = "none";
        axios
          .post(`http://localhost:3000/api/auth/register`, {
            fullName: fullName.value,
            username: username.value,
            email: email.value,
            password: password.value,
          })
          .then((res) => {
            console.log(res.data);
            setToken(res.data.token);
            setUser({
              fullName: res.data.fullName,
              username: res.data.username,
              email: res.data.email,
              id: res.data._id,
            });
            fullName.value = "";
            username.value = "";
            email.value = "";
            password.value = "";
            document.location.hash = `/`;
          })
          .catch((err) => {
            console.log(err);
            if (
              err.response.data.errors &&
              Object.values(err.response.data.errors)[0].message
            ) {
              console.log(Object.values(err.response.data.errors)[0].message);
              registerErrorMessage.innerText = Object.values(
                err.response.data.errors
              )[0].message;
              registerErrorMessage.style.display = "block";
            } else if (err.response.data.keyValue["email"]) {
              registerErrorMessage.innerText =
                "This e-mail address already exists";
              registerErrorMessage.style.display = "block";
            } else if (err.response.data.keyValue["username"]) {
              registerErrorMessage.innerText = "This username already exists";
              registerErrorMessage.style.display = "block";
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
                  <h4 class="mb-4">Create your account</h4>
                  </div>
                  <form id="registerForm" class="form-sign-in">
                  <div class="form-floating mb-4">
                  <input type="text" id="fullName" class="form-control"
                    placeholder="Phone number or email address" />
                  <label class="form-label" for="fullName">Full Name</label>
                </div>

                <div class="form-floating mb-4">
                      <input type="text" id="username" class="form-control"
                        placeholder="Username"  />
                      <label class="form-label" for="username">Username</label>
                    </div>


                    <div class="form-floating mb-4">
                      <input type="email" id="email" class="form-control"
                        placeholder="Phone number or email address"  />
                      <label class="form-label" for="email">Email</label>
                    </div>
  
                  
                    <div class="form-floating mb-4">
                    <input type="password" id="password" class="form-control" 
                        placeholder="Input password"  />
                      <label class="form-label" for="password">Password</label>
                    </div>
  
                    <div class=" text-center pt-1 mb-3 pb-1 log-in-button">
                      <button class="btn btn-block fa-lg  btn-lg btn btn-outline-dark" type="submit">Sign Up</button>
                     </div>

                     <div class="register__error-message align-items-center justify-content-center pb-4">
                      <p class="mb-0 me-2">Please fill out all fields</p>
                     
                    </div>
  
                    <div class="d-flex align-items-center justify-content-center pb-4 buttons-create-new">
                      <p class="mb-0 me-2">Already have an account?</p>
                      <a href="/#/signin" class="btn btn-outline-light btn-dark btn-create-new">Sign in</a>
                     
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center card-logo">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                <div class="text-company">
                <object data="images/logo/white-logo.svg" width="100em" height="100em"> </object>
                  <h4 class="mb-4">We are more than just a company</h4>
                  <p class="small mb-0">ORYX caters to thoughtful shoppers who appreciate unique designs and top quality pieces you just can’t find anywhere else. We are constantly curating fresh new collections and looking for the next big thing our customers will love. Founded in Skopje, Macedonia in 2016, we are proud to be your Online Clothing Shop that you can rely on for our expert service and care.</p>
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
