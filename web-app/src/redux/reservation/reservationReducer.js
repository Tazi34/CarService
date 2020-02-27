import {
  SET_START_DATE,
  SET_END_DATE,
  SET_END_SPOT,
  SET_START_SPOT,
  SET_START_CITY,
  SET_END_CITY,
  SET_RESERVATION_CAR
} from "./reservationActions";

function reservations(
  state = {
    startDate: new Date(),
    endDate: new Date(),
    startSpot: {
      id: -1,
      name: ""
    },
    endSpot: {
      id: -1,
      name: ""
    },
    startCity: {
      selected: false,
      item: {
        id: -1,
        spots: [],
        name: "Start city"
      }
    },
    endCity: {
      selected: false,
      item: {
        id: -1,
        spots: [],
        name: "Start city"
      }
    },
    car: {
      item: {},
      selected: false
    }
  },
  action
) {
  switch (action.type) {
    case SET_START_DATE:
      return { ...state, startDate: action.payload.date };
    case SET_END_DATE:
      return { ...state, endDate: action.payload.date };
    case SET_START_SPOT:
      return { ...state, startSpot: action.payload.spot };
    case SET_END_SPOT:
      return { ...state, endSpot: action.payload.spot };
    case SET_START_CITY:
      return { ...state, startCity: { item: action.payload, selected: true } };
    case SET_END_CITY:
      return { ...state, endCity: { item: action.payload, selected: true } };
    case SET_RESERVATION_CAR:
      return { ...state, car: { item: action.payload.car, selected: true } };
    default:
      return state;
  }
}
const reservationsReducer = reservations;
export default reservationsReducer;
