import Axios from "axios";

const authorizationHeader = "Authorization";
const tokenLocalStorageKey = "userToken";

const appendAuthorizationTokenToRequests = token => {
  Axios.defaults.headers.common[authorizationHeader] = `Bearer ${token}`;
};
const removeTokenFromRequestHeaders = () => {
  Axios.defaults.headers.common[authorizationHeader] = ``;
};

const addTokenToLocalStorage = token => {
  localStorage.setItem(tokenLocalStorageKey, token);
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(tokenLocalStorageKey);
};

export const addAuthorizationToken = token => {
  appendAuthorizationTokenToRequests(token);
  addTokenToLocalStorage(token);
};

export const removeAuthorizationToken = () => {
  removeTokenFromLocalStorage();
  removeTokenFromRequestHeaders();
};
