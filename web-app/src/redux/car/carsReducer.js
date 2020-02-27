import {
  RECEIVE_CARS_ERROR,
  RECEIVE_CARS_SUCCESS,
  REQUEST_CARS
} from "./carActions";

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
    case RECEIVE_CARS_SUCCESS:
      var payload = action.payload;

      var byId = payload.cars.map(car => car.id);
      var _items = {};
      payload.cars.forEach(car => (_items = { ..._items, [car.id]: car }));

      return Object.assign({}, state, {
        isFetching: false,
        byId: [...state.byId, byId],
        items: { ...state.items, ..._items },
        lastUpdated: payload.receivedAt,
        fetched: true
      });
    case RECEIVE_CARS_ERROR:
      return { ...state, error: action.payload.error };

    default:
      return state;
  }
}

const carReducer = cars;

export default carReducer;
