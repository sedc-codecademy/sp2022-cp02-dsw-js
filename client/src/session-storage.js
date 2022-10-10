export const getOrderInfo = () => {
  const orderInfo = sessionStorage.getItem("order")
    ? JSON.parse(sessionStorage.getItem("order"))
    : [];
  return orderInfo;
};

export const setOrderInfo = (orderInfo) => {
  sessionStorage.setItem("order", JSON.stringify(orderInfo));
};

export const getDeliveryDay = () => {
  const deliveryDay = sessionStorage.getItem("deliveryDay")
    ? JSON.parse(sessionStorage.getItem("deliveryDay"))
    : [];
  return deliveryDay;
};

export const setDeliveryDay = (deliveryDay) => {
  sessionStorage.setItem("deliveryDay", JSON.stringify(deliveryDay));
};
