import ProductCard from "../components/product-card.component";
export default class FilteredProductsView {
  static async render({ request: { id, resource }, data }) {
    console.log("ID", id);
    const mainCategory =
      resource === "men" ? "male" : resource === "women" ? "female" : "sale";
    const categoryHeader =
      resource === "men" ? "MEN'S COLLECTION" : resource === "women" ? "WOMEN'S COLLECTION" : "COLLECTION ON SALE";
    console.log("Category", mainCategory);
    const products = await data;
    const filteredData = products
      .filter((product) => {
        return product.category === id;
      })
      .filter((product) => {
        if (mainCategory === "female") {
          return product.gender === "female";
        } else if (mainCategory === "male") return product.gender === "male";
        else {
          return product.sale;
        }
      })
      .map((product) => {
        return ProductCard.render(product);
      })
      .join("");

    let filterCategory = new Set();
    let filteredButtons = products
      .filter((product) => {
        const isPresentInSet = filterCategory.has(product.category);
        filterCategory.add(product.category);
        return !isPresentInSet;
      })
      .map((product) => {
        return ProductCard.category(product);
      })
      .join("");

    $(document).ready(function () {
      $(".card-container").slice(0, 24).show();
      if ($(".card-container").length <= 24) {
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
            <div class="col">
              <h2 class="text-center homepage__offers_H2 mt-4 mt-lg-5 mb-2 fs-1">${categoryHeader}</h2>
            </div>
            <section class="filtered-buttons-section container">
              <div class="filtered_buttons_products mt-2">
                ${filteredButtons}
              </div>
            </section>
            <section style="width: 100% ;" class="pt-3 pt-lg-5">
              <div style="width: 100% justify-content: center ;" class='container px-4 px-lg-5'>
                <div class="row__products gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-5 justify-content-center">
                  ${filteredData}
                </div>
              </div>
              <div class="container load-more-btn pb-5"><a href="#" id="loadMore"><button type="button" class="btn btn-outline-light btn-dark btn-create-new">Load More</button></a></div>
            </section>    
              
       `;
  }
}
