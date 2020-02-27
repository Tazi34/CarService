import carReducer from "./car/carsReducer";
import { combineReducers } from "redux";
import {
  paginationReducer,
  sortingReducer
} from "./pagination/paginationReducer";
import reservationReducer from "./reservation/reservationReducer";
import cityReducer from "./city/cityReducer";
import spotReducer from "./city/spot/spotReducer";

export default combineReducers({
  cars: carReducer,
  pagination: paginationReducer,
  sorting: sortingReducer,
  currentReservation: reservationReducer,
  cities: cityReducer,
  spots: spotReducer
});
