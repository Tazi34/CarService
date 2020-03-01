import Axios from "axios";
import { apiURL } from "../../urlAPI";
//ACTIONS
export const SET_START_DATE = "SET_START_DATE";
export const SET_END_DATE = "SET_END_DATE";
export const SET_START_SPOT = "SET_START_SPOT";
export const SET_END_SPOT = "SET_END_SPOT";
export const SET_START_CITY = "SET_START_CITY";
export const SET_END_CITY = "SET_END_CITY";
export const SELECT_CAR = "SELECT_CAR";
export const POST_RESERVATION = "POST_RESERVATION";
export const POST_RESERVATION_SUCCESS = "POST_RESERVATION_SUCCESS";
export const POST_RESERVATION_ERROR = "POST_RESERVATION_ERROR";
export const CONFIRM_DATE_LOCATION = "CONFIRM_DATE_LOCATION";
export const selectCar = car => ({
  type: SELECT_CAR,
  payload: { car: car }
});

export function setStartDate(date) {
  return { type: SET_START_DATE, payload: { date: date } };
}
export function setEndDate(date) {
  return { type: SET_END_DATE, payload: { date: date } };
}
export const setStartCity = payload => ({
  type: SET_START_CITY,
  payload
});
export const setEndCity = payload => ({
  type: SET_END_CITY,
  payload
});

export function setEndSpot(spot) {
  return { type: SET_END_SPOT, payload: { spot: spot } };
}
export function setStartSpot(spot) {
  return { type: SET_START_SPOT, payload: { spot: spot } };
}

export const postReservation = () => ({
  type: POST_RESERVATION
});

export const postReservationError = error => ({
  type: POST_RESERVATION_ERROR,
  payload: { error: error }
});
export const postReservationSuccess = () => ({
  type: POST_RESERVATION_SUCCESS
});
export const confirmDateLocation = payload => ({
  type: CONFIRM_DATE_LOCATION
});

export function postReservationForm(reservation) {
  return function(dispatch) {
    dispatch(postReservation());
    return Axios.post(apiURL + "/reservations", reservation).then(
      () => dispatch(postReservationSuccess()),
      error => {
        console.log(error);
        dispatch(postReservationError(error));
      }
    );
  };
}
