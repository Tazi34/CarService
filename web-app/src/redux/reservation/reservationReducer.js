import {
  SET_START_DATE,
  SET_END_DATE,
  SET_END_SPOT,
  SET_START_SPOT,
  SET_START_CITY,
  SET_END_CITY
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
      id: -1,
      spots: [],
      name: "Start city"
    },
    endCity: {
      id: -1,
      spots: [],
      name: "End city"
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
      return { ...state, startCity: action.payload };
    case SET_END_CITY:
      return { ...state, endCity: action.payload };
    default:
      return state;
  }
}
const reservationsReducer = reservations;
export default reservationsReducer;
