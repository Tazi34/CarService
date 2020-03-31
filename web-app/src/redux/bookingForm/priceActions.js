import axios from "axios";
import { priceURL } from "../../utilities/urls/apiURL";

export const REQUEST_TOTAL_RESERVATION_PRICE =
  "REQUEST_TOTAL_RESERVATION_PRICE";
export const REQUEST_TOTAL_RESERVATION_PRICE_SUCCESS =
  "REQUEST_TOTAL_RESERVATION_PRICE_SUCCESS";
export const REQUEST_TOTAL_RESERVATION_PRICE_ERROR =
  "REQUEST_TOTAL_RESERVATION_PRICE_ERROR";

export const requestPrice = () => ({
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

export function fetchBookingPrice({ carId, startDate, endDate }) {
  return function(dispatch) {
    dispatch(requestPrice());
    return axios.get(priceURL).then(
      response => {
        dispatch(fetchPriceSuccess(response.data));
      },
      error => dispatch(fetchPriceError(error))
    );
  };
}
