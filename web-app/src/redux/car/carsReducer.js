import {
  RECEIVE_CARS_ERROR,
  RECEIVE_CARS_SUCCESS,
  REQUEST_CARS
} from "./carActions";
import { combineReducers } from "redux";
import { createPaginator } from "../pagination/paginationReducer";

function cars(
  state = {
    items: {},
    isFetching: false,
    error: null,
    byId: [],
    lastUpdated: 0,
    fetched: false
  },
  action
) {
  switch (action.type) {
    case REQUEST_CARS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_CARS_SUCCESS: {
      const payload = action.payload;
      const byId = payload.cars.map(car => car.id);
      let _items = {};
      payload.cars.forEach(car => (_items = { ..._items, [car.id]: car }));
      //todo zmien na {...state}
      return Object.assign({}, state, {
        isFetching: false,
        byId: [...state.byId, ...byId],
        items: { ...state.items, ..._items },
        lastUpdated: payload.receivedAt,
        fetched: true
      });
    }

    case RECEIVE_CARS_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
}

const carReducer = combineReducers({
  cars,
  pagination: createPaginator()
});

export default carReducer;
