import {
  AUTHENTICATION_ERROR,
  AUTHENTICATION_SUCCESS,
  DISCARD_TOKEN,
  LOGOUT,
  REMOVE_USER,
  REQUEST_AUTHENTICATION,
  REQUEST_USER,
  SET_USER
} from "./authenticationActions";

const initialState = {
  isAuthenticated: false,
  token: "",
  error: {},
  user: null,
  pending: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_AUTHENTICATION:
      return { ...state };
    case AUTHENTICATION_ERROR:
      return {
        ...state,
        ...payload,
        token: "",
        isAuthenticated: false,
        pending: false,
        user: null
      };
    case AUTHENTICATION_SUCCESS:
      return { ...state, error: {}, isAuthenticated: true, pending: false };
    case SET_USER:
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true,
        pending: false
      };
    case REMOVE_USER:
      return { ...state, user: null };
    case DISCARD_TOKEN:
      return {};
    case REQUEST_USER:
      return {
        ...state,
        pending: true
      };

    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
