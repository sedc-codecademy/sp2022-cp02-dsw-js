export const getOrderInfo = () => {
  const orderInfo = sessionStorage.getItem("order")
    ? JSON.parse(sessionStorage.getItem("order"))
    : [];
  return orderInfo;
};

export const setOrderInfo = (orderInfo) => {
  sessionStorage.setItem("order", JSON.stringify(orderInfo));
};
