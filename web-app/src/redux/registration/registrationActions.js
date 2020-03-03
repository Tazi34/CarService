import {
  authenticateError,
  authenticateSuccess,
  authSetToken,
  REQUEST_AUTHENTICATION,
  requestAuthenticaton
} from "../authentication/authenticationActions";
import Axios from "axios";
import { apiURL } from "../../urlAPI";

export const REQUEST_REGISTRATION = "REQUEST_REGISTRATION";
export const REGISTRATION_SUCCESS = "REQUEST_SUCCESS";
export const REGISTRATION_ERROR = "REQUEST_ERROR";

export const requestRegistration = () => ({
  type: REQUEST_REGISTRATION
});

export const registrationSuccess = user => ({
  type: REGISTRATION_SUCCESS
});

export const registrationError = error => ({
  type: REGISTRATION_ERROR
});

export function register(userData) {
  return function(dispatch) {
    dispatch(requestRegistration());
    return Axios.post(apiURL + "/users/sign-in", userData).then(
      response => {
        dispatch(registrationSuccess());
      },
      error => dispatch(registrationError(error))
    );
  };
}
