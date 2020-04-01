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
} from "./bookingActions";
import { combineReducers } from "redux";
import clientDetailsReducer from "../clientDetails/clientDetailsReducer";
import {
  REQUEST_TOTAL_RESERVATION_PRICE,
  REQUEST_TOTAL_RESERVATION_PRICE_ERROR,
  REQUEST_TOTAL_RESERVATION_PRICE_SUCCESS
} from "./priceActions";
import moment from "moment";

const initialState = {
  startDate: moment(),
  endDate: moment().add(1, "Days"),
  startSpot: {
    selected: false,
    id: -1,
    name: ""
  },
  endSpot: {
    selected: false,
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
  totalPrice: {
    price: 0,
    fetching: false,
    error: null
  },
  status: {
    dateLocationPicked: false,
    pending: false,
    error: null
  }
};

//TODO split reducer

function reservation(state = initialState, action) {
  switch (action.type) {
    case SET_START_DATE:
      return { ...state, startDate: action.payload.date };
    case SET_END_DATE:
      return { ...state, endDate: action.payload.date };
    case SET_START_SPOT:
      return {
        ...state,
        startSpot: { ...action.payload.spot, selected: true }
      };
    case SET_END_SPOT:
      return { ...state, endSpot: { ...action.payload.spot, selected: true } };
    case SET_START_CITY:
      return {
        ...state,
        startCity: { item: action.payload, selected: true },
        startSpot: initialState.startSpot
      };
    case SET_END_CITY:
      return {
        ...state,
        endCity: { item: action.payload, selected: true },
        endSpot: initialState.endSpot
      };
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
    case REQUEST_TOTAL_RESERVATION_PRICE: {
      return {
        ...state,
        totalPrice: {
          price: 0,
          fetching: true,
          error: null
        }
      };
    }
    case REQUEST_TOTAL_RESERVATION_PRICE_SUCCESS: {
      return {
        ...state,
        totalPrice: {
          price: action.payload.price,
          fetching: false,
          error: null
        }
      };
    }
    case REQUEST_TOTAL_RESERVATION_PRICE_ERROR: {
      return {
        ...state,
        totalPrice: {
          price: -1,
          fetching: false,
          error: action.payload.error
        }
      };
    }
    default:
      return state;
  }
}

const bookingReducer = combineReducers({
  reservation,
  clientDetails: clientDetailsReducer
});
export default bookingReducer;
