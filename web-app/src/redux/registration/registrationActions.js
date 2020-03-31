import { loginAction } from "../authentication/authenticationActions";
import Axios from "axios";
import { signUpURL } from "../../utilities/urls/apiURL";

export const REQUEST_REGISTRATION = "REQUEST_REGISTRATION";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_ERROR = "REGISTRATION_ERROR";

export const requestRegistration = () => ({
  type: REQUEST_REGISTRATION
});

export const registrationSuccess = user => ({
  type: REGISTRATION_SUCCESS,
  payload: { user }
});

export const registrationError = error => ({
  type: REGISTRATION_ERROR,
  payload: { error }
});

export function register(userData) {
  return async function(dispatch) {
    dispatch(requestRegistration());
    return Axios.post(signUpURL, userData).then(
      response => {
        const user = response.data;
        dispatch(registrationSuccess(user));
        dispatch(loginAction(userData));
      },
      error => {
        dispatch(registrationError(error));
        return error;
      }
    );
  };
}
