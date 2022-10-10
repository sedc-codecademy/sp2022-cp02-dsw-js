export default class OrderView {
  static after_render() {
    const orderForm = document.getElementById("orderForm");
    const orderErrorMessage = document.querySelector(".order__error-message");

    // from local storage
    const items = JSON.parse(localStorage.getItem("cartItems"));
    const userId = JSON.parse(localStorage.getItem("user").id);

    const fullName = document.getElementById("orderName");
    const email = document.getElementById("orderEmail");
    const phone = document.getElementById("orderPhone");
    const address = document.getElementById("orderAddress");
    const bill = document.getElementById("bill");
    const shippingType = document.getElementById("shippingType");
    let deliveryDay = Array.from(
      document.getElementsByName("deliveryOptions")
    ).find((r) => r.checked).value;

    if (localStorage.getItem("user")) {
      fullName.value = JSON.parse(localStorage.getItem("user").fullName);
      email.value = JSON.parse(localStorage.getItem("user").email);
    }

    if (orderForm) {
      orderForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        orderErrorMessage.style.display = "none";
        axios
          .post(`http://localhost:3000/api/order`, {
            userId: userId,
            name: fullName.value,
            email: email.value,
            phone: phone.value,
            address: address.value,
            items: items,
            bill: bill,
            dayOfDelivery: deliveryOptions,
            shippingType: shippingType,
          })
          .then((res) => {
            console.log(res.data);

            fullName.value = "";
            email.value = "";
            phone.value = "";
            address.value = "";
            document.location.hash = `/`;
          })
          .catch((err) => {
            console.log(err);
            // if (
            //   err.response.data.errors &&
            //   Object.values(err.response.data.errors)[0].message
            // ) {
            //   console.log(Object.values(err.response.data.errors)[0].message);
            //   registerErrorMessage.innerText = Object.values(
            //     err.response.data.errors
            //   )[0].message;
            //   registerErrorMessage.style.display = "block";
            // } else if (err.response.data.keyValue["email"]) {
            //   registerErrorMessage.innerText =
            //     "This e-mail address already exists";
            //   registerErrorMessage.style.display = "block";
            // } else if (err.response.data.keyValue["username"]) {
            //   registerErrorMessage.innerText = "This username already exists";
            //   registerErrorMessage.style.display = "block";
            // }
          });
      });
    }
  }

  static render() {
    window.scrollTo({
      top: 0,
    });
    return `
    <section class="h-100 gradient-form mt-5">
    <div class="container py-5 h-100 shadow-lg p-3 mb-5 bg-body rounded">
      <div class="row d-flex justify-content-center align-items-center h-100 ">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">
  
                  <div class="text-center">
                  
                  <h4 class="mb-4">Make An Order</h4>
                
                      <form id="orderForm">
                      <div class="row">
                        <div class="col-md-6">
                        <div class="form-floating mb-4">
                            <input type="text" id="orderName" class="form-control" placeholder="Enter Name" />
                            <label class="form-label" for="orderName">Name</label>
                          </div>
                        </div>
                        <div class="col-md-6">
                        <div class="form-floating mb-4">
                            <input type="email" id="orderEmail" class="form-control" placeholder="Enter Email" />
                            <label class="form-label" for="orderEmail">Email</label>
                          </div>
                        </div>
                      </div>
                      <div class="form-floating mb-4">
                        <input type="tel" id="orderPhone" class="form-control" placeholder="Enter Phone Number"" />
                        <label class="form-label" for="orderPhone">Phone</label>
                      </div>
                      <div class="form-floating mb-4">
                      <input type="text" id="orderAddress" name="address" class="form-control" placeholder="Address" />
                      <label class="form-label" for="orderAddress">Address</label>   
                      </div>
                      <p>Preferred day of delivery</p>
                          <div class='delivery-day btn-group'>
                            <input type="radio" class="btn-check" name="deliveryOptions" id="monday" autocomplete="off"  />
                            <label class="btn btn-outline-light btn-secondary btn-create-new" for="monday">Monday</label>
                          
                            <input type="radio" class="btn-check" name="deliveryOptions" id="tuesday" autocomplete="off" />
                            <label class="btn btn-outline-light btn-secondary btn-create-new" for="tuesday">Tuesday</label>
                          
                            <input type="radio" class="btn-check" name="deliveryOptions" id="wednesday" autocomplete="off" />
                            <label class="btn btn-outline-light btn-secondary btn-create-new" for="wednesday">Wednesday</label>
                            <input type="radio" class="btn-check" name="deliveryOptions" id="thursday" autocomplete="off" />
                            <label class="btn btn-outline-light btn-secondary btn-create-new" for="thursday">Thursday</label>       
                            <input type="radio" class="btn-check" name="deliveryOptions" id="friday" autocomplete="off" />
                            <label class="btn btn-outline-light btn-secondary btn-create-new" for="friday">Friday</label> 

                            <input type="radio" class="btn-check" name="deliveryOptions" id="saturday" autocomplete="off" />
                            <label class="btn btn-outline-light btn-secondary btn-create-new" for="saturday">Saturday</label>       
                            </div>
                      <button type="button" class="btn btn-outline-light btn-dark btn-lg btn-create-new">Submit</button>
                    </form>
                </div>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center card-logo">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                <div class="text-company">
                <object id="image-logo" data="images/logo/white-logo.svg" width="100em" height="100em"> </object>
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
  `;
  }
}
