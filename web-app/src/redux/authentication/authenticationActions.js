import Axios from "axios";
import { apiURL } from "../../urlAPI";
import localStorage from "redux-persist/es/storage";

export const AUTHENTICATED_USER = "AUTHENTICATED_USER";
export const UNAUTHENTICATED = "UNAUTHENTICATED";

export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";
export const SET_TOKEN = "SET_TOKEN";
export const SET_USER = "SET_USER";
export const DISCARD_TOKEN = "DISCARD_TOKEN";

export const REQUEST_AUTHENTICATION = "REQUEST_AUTHENTICATION";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const requestAuthenticaton = () => ({
  type: REQUEST_AUTHENTICATION
});
export const authenticateSuccess = user => ({
  type: AUTHENTICATION_SUCCESS,
  payload: {
    user: user
  }
});
export const authenticateError = error => ({
  type: AUTHENTICATION_ERROR,
  payload: { error: error }
});

export const authSetToken = token => ({
  type: SET_TOKEN,
  payload: { token: token }
});
export const authDiscardToken = () => ({
  type: DISCARD_TOKEN
});

export const authSetUser = user => ({
  type: SET_USER,
  payload: { user: user }
});

export function loginAction(email, password) {
  return function(dispatch) {
    dispatch(requestAuthenticaton());
    return Axios.post(apiURL + "/login", { email, password }).then(
      data => {
        dispatch(authenticateSuccess());
        dispatch(authSetToken(data));
        //localStorage.setItem('userToken',data)
      },
      error => dispatch(authenticateError(error))
    );
  };
}
