export default class PrivacyPolicyView {
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
                     
                      </div>
                      <h1 class="py-4 h_element"><strong>Privacy Policy</strong></h1>
    
                      
                        <p><strong>Consent</strong></p>
                        <p>
                            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                            Information we collect:
                            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                            When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
                        </p> 
                        <p><strong>How we use your information</strong></p>
                        <p>
                            We use the information we collect in various ways, including to:<br>
                            - Provide, operate, and maintain our website<br>
                            - Improve, personalize, and expand our website<br>
                            - Understand and analyze how you use our website<br>
                            - Develop new products, services, features, and functionality<br>
                            - Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes<br>
                            - Send you emails<br>
                            - Find and prevent fraud
                        </p>
                        <p>
                        <p><strong>Log Files</strong></p>
                        Website Name follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
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
