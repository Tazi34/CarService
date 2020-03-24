import Axios from "axios";

const appendAuthorizationTokenToRequests = token => {
  Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
const removeTokenFromRequestHeaders = () => {
  Axios.defaults.headers.common["Authorization"] = ``;
};

const addTokenToLocalStorage = token => {
  localStorage.setItem("userToken", token);
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("userToken");
};

export const addAuthorizationToken = token => {
  appendAuthorizationTokenToRequests(token);
  addTokenToLocalStorage(token);
};

export const removeAuthorizationToken = () => {
  removeTokenFromLocalStorage();
  removeTokenFromRequestHeaders();
};
