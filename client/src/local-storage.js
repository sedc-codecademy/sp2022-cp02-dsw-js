export const getCartItems = () => {
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  return cartItems;
};
export const setCartItems = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
export const clearCartItems = () => {
  localStorage.removeItem("cartItems"), localStorage.removeItem("bill");
  sessionStorage.removeItem("order");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};
export const setUser = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const setBill = (bill) => {
  console.log("ulazi ovde");
  localStorage.setItem("bill", bill);
};
