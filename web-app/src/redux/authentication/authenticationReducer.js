import {
  REQUEST_AUTHENTICATION,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_ERROR,
  SET_TOKEN,
  SET_USER,
  DISCARD_TOKEN
} from "./authenticationActions";
const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_AUTHENTICATION:
      return state;
    case AUTHENTICATION_ERROR:
      return { ...state, ...payload };
    case AUTHENTICATION_SUCCESS:
      return { ...state };
    case SET_TOKEN:
      return { ...state, ...payload };
    case SET_USER:
      return { ...state, ...payload };
    case DISCARD_TOKEN:
      return {};
    default:
      return state;
  }
};
