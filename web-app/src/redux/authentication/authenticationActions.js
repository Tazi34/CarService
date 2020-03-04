import Axios from "axios";
import { apiURL, authUserURL, login } from "../../urlAPI";
import localStorage from "redux-persist/es/storage";

export const localStorageTokenItemName = "userToken";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";
export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";
export const DISCARD_TOKEN = "DISCARD_TOKEN";
export const REQUEST_AUTHENTICATION = "REQUEST_AUTHENTICATION";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const LOGOUT = "LOGOUT";

export const requestAuthenticaton = () => ({
  type: REQUEST_AUTHENTICATION
});
export const authenticateSuccess = user => ({
  type: AUTHENTICATION_SUCCESS,
  payload: {
    user: user
  }
});
export const authenticationError = error => ({
  type: AUTHENTICATION_ERROR,
  payload: { error: error }
});
export const setUser = user => ({
  type: SET_USER,
  payload: { user: user }
});

export const removeUser = payload => ({
  type: REMOVE_USER,
  payload: { payload }
});

export const logout = () => {
  localStorage.setItem("userToken", "");
  return {
    type: LOGOUT
  };
};

export function loginAction({ email, password }) {
  return function(dispatch) {
    dispatch(requestAuthenticaton());
    return Axios.post(apiURL + "/login", { email, password }).then(
      response => {
        var token = getToken(response);
        dispatch(authenticateSuccess());
        localStorage.setItem("userToken", token);
        Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        dispatch(fetchUser());
      },
      error => {
        dispatch(authenticationError(error));
        localStorage.setItem("userToken", "");
      }
    );
  };
}

const getToken = response => {
  var authorizationString = response.headers.authorization;
  return extractToken(authorizationString);
};

const extractToken = tokenBearerString => {
  return tokenBearerString.replace("Bearer ", "");
};
export const redirectToLogin = history => {
  history.push(login);
};
export const REQUEST_USER = "REQUEST_USER";

export const requestUser = () => ({
  type: REQUEST_USER
});

export function fetchUser() {
  return async function(dispatch) {
    dispatch(requestUser());
    var token = await localStorage.getItem(localStorageTokenItemName);
    if (token === "") return;

    return Axios.post(
      authUserURL,
      {},
      {
        headers: {
          crossDomain: true,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      }
    ).then(
      response => {
        var user = response.data;
        dispatch(setUser(user));
      },
      error => dispatch(authenticationError(error))
    );
  };
}
