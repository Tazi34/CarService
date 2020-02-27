import {
  RECEIVE_CITIES_SUCCESS,
  REQUEST_CITIES,
  RECEIVE_CITIES_ERROR
} from "./cityActions";

const initialState = {
  items: {},
  byId: [],
  isFetching: false,
  error: null,
  fetched: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CITIES:
      return { ...state, isFetching: true };
    case RECEIVE_CITIES_SUCCESS:
      var _items = {};
      //normalize data - whole items
      action.payload.cities.forEach(city => (_items[city.id] = city));
      return {
        ...state,
        //only id array
        byId: [...state.byId, ...action.payload.cities.map(city => city.id)],
        items: { ...state.items, ..._items }
      };
    case RECEIVE_CITIES_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};
