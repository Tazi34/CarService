import Axios from "axios";
import {
  reservationsURL,
  userReservationsURL
} from "../../utilities/urls/apiURL";

export const REQUEST_RESERVATIONS = "REQUEST_RESERVATIONS";
export const RECEIVE_RESERVATIONS_SUCCESS = "RECEIVE_RESERVATIONS_SUCCESS";
export const RECEIVE_RESERVATIONS_ERROR = "RECEIVE_RESERVATIONS_ERROR";
export const REQUEST_RESERVATION_CANCELLATION =
  "REQUEST_RESERVATION_CANCELLATION";
export const CANCEL_RESERVATION_SUCCESS = "CANCEL_RESERVATION_SUCCESS";
export const CANCEL_RESERVATION_ERROR = "CANCEL_RESERVATION_ERROR";

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
export const deleteReservationRequest = id => ({
  type: REQUEST_RESERVATION_CANCELLATION,
  payload: { id }
});
export const cancelReservationError = error => ({
  type: CANCEL_RESERVATION_ERROR,
  payload: { error }
});
export const cancelReservationSuccess = () => ({
  type: CANCEL_RESERVATION_SUCCESS
});
export const cancelReservation = id => {
  return dispatch => {
    dispatch(deleteReservationRequest());
    return Axios.delete(`${reservationsURL}/${id}`)
      .then(response => dispatch(cancelReservationSuccess()))
      .catch(err => dispatch(cancelReservationError(err)));
  };
};
