import carReducer from "./car/carsReducer";
import { combineReducers } from "redux";
import {
  paginationReducer,
  sortingReducer
} from "./pagination/paginationReducer";
import reservationReducer from "./reservation/reservationReducer";
import cityReducer from "./city/cityReducer";
import spotReducer from "./city/spot/spotReducer";
import authenticationReducer from "./authentication/authenticationReducer";
import registrationReducer from "./registration/registrationReducer";

export default combineReducers({
  cars: carReducer,
  pagination: paginationReducer,
  sorting: sortingReducer,
  currentReservation: reservationReducer,
  cities: cityReducer,
  spots: spotReducer,
  authentication: authenticationReducer,
  registration: registrationReducer
});
