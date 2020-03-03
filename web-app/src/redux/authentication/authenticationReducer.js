import {
  REQUEST_AUTHENTICATION,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_ERROR,
  SET_USER,
  REMOVE_USER,
  DISCARD_TOKEN
} from "./authenticationActions";
const initialState = {
  isAuthenticated: false,
  token: "",
  error: {},
  user: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_AUTHENTICATION:
      return state;
    case AUTHENTICATION_ERROR:
      return { ...state, ...payload, token: "", isAuthenticated: false };
    case AUTHENTICATION_SUCCESS:
      return { ...state, error: {}, isAuthenticated: true };
    case SET_USER:
      return { ...state, user: payload.user };
    case REMOVE_USER:
      return { ...state, user: {} };
    case DISCARD_TOKEN:
      return {};
    default:
      return state;
  }
};
