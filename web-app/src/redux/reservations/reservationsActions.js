import {
  apiURL,
  buildUrl,
  reservationsEndpoint,
  userReservationsURL
} from "../../urlAPI";
import Axios from "axios";

export const REQUEST_RESERVATIONS = "REQUEST_RESERVATIONS";
export const RECEIVE_RESERVATIONS_SUCCESS = "RECEIVE_RESERVATIONS_SUCCESS";
export const RECEIVE_RESERVATIONS_ERROR = "RECEIVE_RESERVATIONS_ERROR";

export const receiveReservationsSuccess = data => ({
  type: RECEIVE_RESERVATIONS_SUCCESS,
  payload: { reservations: data, receivedAt: Date.now() }
});
export const receiveReservationsError = error => ({
  type: RECEIVE_RESERVATIONS_ERROR,
  payload: { error: error }
});

export const requestReservations = () => ({
  type: REQUEST_RESERVATIONS
});

export const fetchUsersReservations = email => {
  return function(dispatch) {
    dispatch(requestReservations());
    return Axios.get(`${userReservationsURL}/${email}`).then(
      response => {
        dispatch(receiveReservationsSuccess(response.data));
      },
      error => dispatch(receiveReservationsError(error))
    );
  };
};
