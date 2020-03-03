import {
  REGISTRATION_ERROR,
  REGISTRATION_SUCCESS,
  REQUEST_REGISTRATION
} from "./registrationActions";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_REGISTRATION:
      return { ...state };
    case REGISTRATION_SUCCESS:
      return { ...state };
    case REGISTRATION_ERROR:
      return { ...state, error: payload.error };
    default:
      return state;
  }
};
