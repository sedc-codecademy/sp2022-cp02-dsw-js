export default class CartItem {
    static render({
        _id: itemId,
        name,
        brand,
        image,
        sale,
        price,
        discountPrice,
        stock,
        quantity,
        gender,
        size,
    }) {
        return `
                <div class="row">
                    <div class="row cart__main align-items-center ">
                        <div class="col-2">
                            <a href="/#/product/${itemId}" class="shopping-cart__first-link">
                                <img class="shopping-cart__img" src="${image}" alt="${name}">
                            </a>
                        </div>
                        <div class="col">
                            <div class="row text-muted">${brand}</div>
                            <div class="row">
                                <a href="/#/product/${itemId}" class="shopping-cart__link">
                                    ${name}
                                </a>
                            </div>
                            <div class="row text-muted size${itemId}">Size: ${size} </div>
                        </div>
                        <div class="col d-flex justify-content-center cart-container py-0">
                            <button class="page-link">
                                <i class="fas fa-minus ${itemId}"></i>
                            </button>
                            <div style="display:flex; align-items: center; justify-content: center;" class="page-link" id="counter${itemId}"> ${quantity}</div>
                            <button class="page-link counter__plus me-0">
                                <i class="fas fa-plus ${itemId}"></i>
                            </button> 
                            <div class="quantity-cart__error-message" id="${itemId}-error-quantity"">No more items available in store<i class="bi bi-emoji-frown"></i></div>
                        </div>
                        <div class="col d-flex ps-0">$${discountPrice
                ? (discountPrice * quantity).toFixed(2)
                : (price * quantity).toFixed(2)
            }
                            <i class="bi bi-trash cart__close-btn" id="${itemId}"></i>
                        </div>
                    </div>
                </div>
                

            `;
    }
}
