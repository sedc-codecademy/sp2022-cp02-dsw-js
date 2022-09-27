export default class AboutView {
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
                  <h1 class="py-4 h_element"><strong>About Us</strong></h1>

                  <p>
                  <strong>ORYX</strong> is an online shopping destination for men and women’s clothing. 
                  Our edit makes it possible for you to choose from the finest 
                  selection of the world’s most sought-after designer brands such as Bottega Veneta, Givenchy, 
                  and Burberry. We pride ourselves on creating an easy-to-navigate online shopping platform while 
                  maintaining an elevated boutique-like feel.
              </p> 
              <p>
                  Our expert team of buyers scours the globe each season to bring you the most exquisite selection 
                  of fashion straight from the runways of New York, London, Paris and Milan. With our daily New Arrivals 
                  we make it effortless for you to stay up-to-date on all of the latest industry trends. Whether you’re 
                  looking to invest in a timeless piece from established labels like Gucci, Balenciaga, Christian Louboutin 
                  and&nbsp;Saint Laurent, or you want to be a fashion pioneer and set trends in Off-White, Acne Studios 
                  and Alanui, Mytheresa is the go-to fashion and designer website that can fulfill all your sartorial wishes. 
                  Our unique assortment of menswear and womenswear now makes it possible to shop for your loved 
                  ones all in one place.
              </p>
              <p>
                  ORYX has a long and rich fashion heritage that spans more than 10 years. What began in the heart of Munich 
                  as a contained local boutique offering creations from international designers has now grown to become one of the
                  most innovative e-commerce companies in the world. Whether you’re paying a visit to our ORYX Store, 
                  browsing from your computer at home, or shopping on-the-go via our mobile app, our goal always remains the same: 
                  to provide the perfect space that caters to all your shopping desires.
              </p>
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
