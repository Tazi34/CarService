import {
  REGISTRATION_ERROR,
  REGISTRATION_SUCCESS,
  REQUEST_REGISTRATION
} from "./registrationActions";

const initialState = {
  pending: false,
  error: {},
  success: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_REGISTRATION:
      return { ...state, pending: true };
    case REGISTRATION_SUCCESS:
      return { ...state, pending: false };
    case REGISTRATION_ERROR:
      return { ...state, error: payload.error, pending: false };
    default:
      return state;
  }
};
