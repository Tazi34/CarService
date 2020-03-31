import Axios from "axios";
import { authUserURL, loginURL } from "../../utilities/urls/apiURL";

import {
  addAuthorizationToken,
  removeAuthorizationToken
} from "./tokenService";

export const localStorageTokenItemName = "userToken";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";
export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";
export const DISCARD_TOKEN = "DISCARD_TOKEN";
export const REQUEST_AUTHENTICATION = "REQUEST_AUTHENTICATION";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const LOGOUT = "LOGOUT";
export const POST_USER = "POST_USER";

export const requestAuthentication = () => ({
  type: REQUEST_AUTHENTICATION
});
export const authenticateSuccess = () => ({
  type: AUTHENTICATION_SUCCESS
});
export const authenticationError = error => ({
  type: AUTHENTICATION_ERROR,
  payload: { error: error }
});
export const setUser = user => {
  return {
    type: SET_USER,
    payload: { user: user }
  };
};

export const removeUser = payload => ({
  type: REMOVE_USER,
  payload: { payload }
});

export const logout = () => {
  removeAuthorizationToken();
  return {
    type: LOGOUT
  };
};

export function loginAction(userCredentials, loginHandlers) {
  const { onSuccess, onError } = loginHandlers;
  const { email, password } = userCredentials;

  return function(dispatch) {
    dispatch(requestAuthentication());
    return Axios.post(loginURL, { email, password }).then(
      response => {
        const token = getAuthorizationTokenFromResponse(response);
        addAuthorizationToken(token);
        dispatch(fetchUser());
        if (typeof onSuccess !== "undefined") onSuccess();
      },
      error => {
        dispatch(authenticationError(error));
        removeAuthorizationToken();
        if (typeof onError !== "undefined") onError(error);
      }
    );
  };
}

const getAuthorizationTokenFromResponse = response => {
  const authorizationString = response.headers.authorization;
  return extractToken(authorizationString);
};

const extractToken = tokenBearerString => {
  return tokenBearerString.replace("Bearer ", "");
};

export const REQUEST_USER = "REQUEST_USER";

export const requestUser = () => ({
  type: REQUEST_USER
});

export function fetchUser() {
  return async function(dispatch) {
    dispatch(requestUser());
    const token = await localStorage.getItem(localStorageTokenItemName);
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
        const user = response.data;
        dispatch(setUser(user));
      },
      error => dispatch(authenticationError(error))
    );
  };
}
