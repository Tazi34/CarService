import Axios from "axios";
import { clientDetailsURL } from "../../../utilities/urls/apiURL";

export const REQUEST_CLIENT_DETAILS = "REQUEST_CLIENT_DETAILS";
export const RECEIVE_CLIENT_DETAILS_SUCCESS = "RECEIVE_CLIENT_DETAILS_SUCCESS";
export const RECEIVE_CLIENT_DETAILS_ERROR = "RECEIVE_CLIENT_DETAILS_ERROR";

export const requestClientDetails = () => ({
  type: REQUEST_CLIENT_DETAILS
});
export const receiveClientDetailsSuccess = clientDetails => ({
  type: RECEIVE_CLIENT_DETAILS_SUCCESS,
  payload: { clientDetails: clientDetails }
});
export const receiveClientDetailsError = error => ({
  type: RECEIVE_CLIENT_DETAILS_ERROR,
  payload: { error: error }
});

export function fetchClientDetails(email) {
  return function(dispatch) {
    dispatch(requestClientDetails());
    return Axios.get(clientDetailsURL + "/" + email).then(
      response => {
        let user;
        if (response.data === "") {
          user = null;
        } else {
          user = response.data;
        }
        dispatch(receiveClientDetailsSuccess(user));
      },
      error => {
        dispatch(receiveClientDetailsError(error));
      }
    );
  };
}
