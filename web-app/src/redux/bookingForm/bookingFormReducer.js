import {
  CONFIRM_DATE_LOCATION,
  POST_RESERVATION,
  POST_RESERVATION_ERROR,
  POST_RESERVATION_SUCCESS,
  SELECT_CAR,
  SET_END_CITY,
  SET_END_DATE,
  SET_END_SPOT,
  SET_START_CITY,
  SET_START_DATE,
  SET_START_SPOT
} from "./bookingFormActions";
import { combineReducers } from "redux";
import clientDetailsReducer from "../clientDetails/clientDetailsReducer";

function reservation(
  state = {
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 86400000),
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
    },
    status: {
      dateLocationPicked: false,
      pending: false,
      error: null
    }
  },
  action
) {
  //TODO split into different reducers
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
    case SELECT_CAR:
      return { ...state, car: { item: action.payload.car, selected: true } };
    case POST_RESERVATION:
      return { ...state, status: { ...state.status, pending: true } };
    case POST_RESERVATION_SUCCESS:
      return { ...state, status: { ...state.status, pending: false } };
    case POST_RESERVATION_ERROR:
      return {
        ...state,
        status: { pending: false, error: action.payload.error }
      };
    case CONFIRM_DATE_LOCATION:
      return {
        ...state,
        status: { ...state.status, dateLocationPicked: true }
      };
    default:
      return state;
  }
}

const bookingFormReducer = combineReducers({
  reservation,
  clientDetails: clientDetailsReducer
});
export default bookingFormReducer;
