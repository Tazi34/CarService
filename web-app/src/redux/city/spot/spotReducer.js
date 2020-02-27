import { ADD_SPOTS } from "./spotActions";

const initialState = {
  items: {},
  byIds: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_SPOTS:
      var _items = {};
      payload.spots.forEach(spot => (_items[spot.id] = spot));

      return {
        ...state,
        items: { ...state.items, ..._items },
        byIds: payload.spots.map(spot => spot.id)
      };
    default:
      return state;
  }
};
