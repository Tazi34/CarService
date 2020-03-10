import {
  CANCEL_RESERVATION_ERROR,
  CANCEL_RESERVATION_SUCCESS,
  RECEIVE_RESERVATIONS_ERROR,
  RECEIVE_RESERVATIONS_SUCCESS,
  REQUEST_RESERVATION_CANCELLATION,
  REQUEST_RESERVATIONS
} from "./reservationsActions";
import { combineReducers } from "redux";

const initialState = {
  items: {},
  isFetching: false,
  error: null,
  byId: [],
  lastUpdated: 0,
  fetched: false
};

const reservations = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_RESERVATIONS: {
      return {
        ...state,
        isFetching: true,
        fetched: false,
        byId: [],
        items: {}
      };
    }
    case RECEIVE_RESERVATIONS_SUCCESS: {
      const byId = payload.reservations.map(res => res.id);
      let _items = {};
      payload.reservations.forEach(
        reservation => (_items[reservation.id] = reservation)
      );
      return {
        ...state,
        isFetching: false,
        byId: [...state.byId, ...byId],
        items: { ...state.items, ..._items },
        lastUpdated: payload.receivedAt,
        fetched: true
      };
    }
    case REQUEST_RESERVATION_CANCELLATION: {
      return { ...state, error: {} };
    }
    case CANCEL_RESERVATION_ERROR: {
      return { ...state, error: payload.error };
    }
    case CANCEL_RESERVATION_SUCCESS: {
      return state;
    }
    case RECEIVE_RESERVATIONS_ERROR:
      return { ...state, error: payload.error };
    default:
      return state;
  }
};

export default combineReducers({ reservations });
