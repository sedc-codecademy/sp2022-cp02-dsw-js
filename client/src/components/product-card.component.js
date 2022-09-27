export default class ProductCard {
  static render({ image, name, brand, discountPrice, price, _id, sale }) {
    return `
      <div class="col mb-5 card-container" data-id="${_id}">
        <div class="product-card h-100">
          ${
            sale
              ? `<!-- Sale badge-->
          <div class="product-card__badge text-white position-absolute" style="top: 0.5rem; right: 0rem">
            Sale
          </div>`
              : ""
          }
          <a href="/#/product/${_id}">
            <img class="card-img-top" src="${image}" alt="${name}"/>
          </a>
          <!-- Product details-->
          <div class="card-body p-4">
            <div class="text-center">
              <!-- Product name-->
              <h5 class="fw-bolder">${name}</h5>
              <!-- Product brand-->
              <h6>${brand}</h6>
              <!-- Product price-->
      
              $${
                discountPrice
                  ? `${discountPrice} <span class="text-muted text-decoration-line-through"><small>$${price}</small></span>`
                  : price
              }
              
            </div>
          </div>
          <!-- Product actions-->
          <div class="card-body__buttons d-flex justify-content-around p-4 pt-0 border-top-0 bg-transparent">
            
            <div class="text-center data-id=${_id}">
                <a class="btn btn-outline-dark d-flex mt-auto" href="/#/product/${_id}">
                  <div class="me-1 product-card__button--text-dissapear">View Details</div>
                </a>
            </div>
          </div>
        </div>
      </div>
  `;
  }
  static category({ category }) {
    return `    
    <button type="button" class="btn btn-category-filter">${category}</button>
    `;
  }
}
