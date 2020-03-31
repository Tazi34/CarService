import {
  RECEIVE_CLIENT_DETAILS_ERROR,
  RECEIVE_CLIENT_DETAILS_SUCCESS,
  REQUEST_CLIENT_DETAILS
} from "./clientDetailsActions";

const initialState = {
  isFetching: false,
  fetched: false,
  item: null,
  error: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_CLIENT_DETAILS:
      return { ...state, isFetching: true };
    case RECEIVE_CLIENT_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        item: payload.clientDetails
      };
    case RECEIVE_CLIENT_DETAILS_ERROR: {
      return {
        ...state,
        fetched: false,
        isFetching: false,
        item: null,
        error: payload.error
      };
    }
    default:
      return state;
  }
};
