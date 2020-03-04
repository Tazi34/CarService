import {
  RECEIVE_RESERVATIONS_ERROR,
  RECEIVE_RESERVATIONS_SUCCESS,
  REQUEST_RESERVATIONS,
  REQUEST_RESERVATIONS_PAGE
} from "./reservationsActions";
import { createPaginator } from "../pagination/paginationReducer";
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
      return { ...state, isFetching: true, fetched: false };
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
    case RECEIVE_RESERVATIONS_ERROR:
      return { ...state, error: payload.error };
    default:
      return state;
  }
};

export default combineReducers({ reservations });
