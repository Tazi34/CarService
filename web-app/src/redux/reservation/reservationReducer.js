import {
  SET_START_DATE,
  SET_END_DATE,
  SET_END_SPOT,
  SET_START_SPOT
} from "./reservationActions";

function reservations(
  state = {
    startDate: new Date(),
    endDate: new Date(),
    startSpot: "",
    endSport: ""
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
    default:
      return state;
  }
}
const reservationsReducer = reservations;
export default reservationsReducer;
