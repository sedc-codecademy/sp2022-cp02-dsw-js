export const getCartItems = () => {
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  return cartItems;
};
export const setCartItems = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
export const setToken = (token) => {
  localStorage.setItem("token", token);
};
export const setRefreshToken = (refreshToken) => {
  localStorage.setItem("refreshToken", refreshToken);
};

export const setUser = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};
