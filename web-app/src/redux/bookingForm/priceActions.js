export const REQUEST_TOTAL_RESERVATION_PRICE =
  "REQUEST_TOTAL_RESERVATION_PRICE";
export const REQUEST_TOTAL_RESERVATION_PRICE_SUCCESS =
  "REQUEST_TOTAL_RESERVATION_PRICE_SUCCESS";
export const REQUEST_TOTAL_RESERVATION_PRICE_ERROR =
  "REQUEST_TOTAL_RESERVATION_PRICE_ERROR";

export const requestPrice = payload => ({
  type: REQUEST_TOTAL_RESERVATION_PRICE
});
export const fetchPriceSuccess = price => ({
  type: REQUEST_TOTAL_RESERVATION_PRICE_SUCCESS,
  payload: { price: price }
});
export const fetchPriceError = error => ({
  type: REQUEST_TOTAL_RESERVATION_PRICE_ERROR,
  payload: { error: error }
});
