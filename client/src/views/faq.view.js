export default class FaqView {
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
                    <h4 class="mb-4">F.A.Q</h4>
                    <p>Frequently asked questions about ORYX eCommerce website.</p>       
                  </div>
                  <ul class="faq-list">
                    <li data-aos="fade-up" data-aos-delay="100" class="aos-init aos-animate">
                      <a data-toggle="collapse" class="collapsed" href="#faq1" aria-expanded="false">How does the fashion connector work? <i class="fas fa-arrow-up"></i></a>
                      <div id="faq1" class="collapse" data-parent=".faq-list" >
                        <p>
                        The Fashion Connector, as the name indicates, is a fashion website that enables customers to buy beautiful & unique, limited edition jewellery, handbag and clothing products sourced by us and created by independent designers. All our designers are vetted, before they can use our platform thus any product you buy, using our website, should be of the highest quality. When purchasing jewellery products from The Fashion Connector you are buying directly from the corresponding designer (Seller). We therefore act as a link between you, the customer (buyer) and the designer – handling the payment on behalf of both the buyer and designer. We also have a dedicated customer care team, on hand 12 hours a day, to help in assisting you if you have any queries regarding the use of the site.
                        </p>
                      </div>
                    </li>

                    <li data-aos="fade-up" data-aos-delay="200" class="aos-init aos-animate">
                      <a data-toggle="collapse" href="#faq2" class="collapsed">Can i change or cance my order? <i class="fas fa-arrow-up"></i></a>
                      <div id="faq2" class="collapse" data-parent=".faq-list">
                        <p>
                            Sure! You can cancel, or change your order within 12 hours of confirmation. Please contact us with your name and order number at: info@oryxbynoworcrylater.com
                        </p>
                      </div>
                    </li>

                    <li data-aos="fade-up" data-aos-delay="300" class="aos-init aos-animate">
                      <a data-toggle="collapse" href="#faq3" class="collapsed">Is my personal information kept private? <i class="fas fa-arrow-up"></i></a>
                      <div id="faq3" class="collapse" data-parent=".faq-list">
                        <p>
                        Yes, we do not share any information given by you to a third party. Please read our privacy policy for more information concerning this matter.
                        </p>
                      </div>
                    </li>

                    <li data-aos="fade-up" data-aos-delay="400" class="aos-init aos-animate">
                      <a data-toggle="collapse" href="#faq4" class="collapsed">How long does delivery take and how much does it cost? <i class="fas fa-arrow-up"></i></a>
                      <div id="faq4" class="collapse" data-parent=".faq-list">
                        <p>
                        The cost for delivery and the estimated delivery times, provided by each designer, will be clearly indicated at checkout and alongside the individual product descriptions. As a general rule any items that the designer has in stock will be dispatched within 48 hours of you placing your order. With items that are made to order, delivery times will vary and will therefore be specific to the product. Shipping times are indicated on each product page underneath the "Delivery & Returns" tab.
                        </p>
                      </div>
                    </li>

                    <li data-aos="fade-up" data-aos-delay="500" class="aos-init aos-animate">
                      <a data-toggle="collapse" href="#faq5" class="collapsed">Is this the latest version of an item? <i class="fas fa-arrow-up"></i></a>
                      <div id="faq5" class="collapse" data-parent=".faq-list">
                        <p>
                        Each item in Oryx is maintained to its latest version.
                        </p>
                      </div>
                    </li>

                    <li data-aos="fade-up" data-aos-delay="600" class="aos-init aos-animate">
                      <a data-toggle="collapse" href="#faq6" class="collapsed">Do you ship to my country? <i class="fas fa-arrow-up"></i></a>
                      <div id="faq6" class="collapse" data-parent=".faq-list">
                        <p>
                          We proudly ship wordwide! Better yet, out tracked shipping is always 100% free of charge, with no minimum purchase!
                        </p>
                      </div>
                    </li>

                    <li data-aos="fade-up" data-aos-delay="400" class="aos-init aos-animate">
                      <a data-toggle="collapse" href="#faq7" class="collapsed">What methods of payment do you take? <i class="fas fa-arrow-up"></i></a>
                      <div id="faq7" class="collapse" data-parent=".faq-list">
                        <p>
                          We accept all major credit cards, PayPay, and Apple Pay.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center card-logo-faq">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                <div class="text-company text-faq">
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
