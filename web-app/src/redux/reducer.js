import carReducer from "./car/carsReducer";
import { combineReducers } from "redux";
import cityReducer from "./city/cityReducer";
import spotReducer from "./city/spot/spotReducer";
import authenticationReducer from "./authentication/authenticationReducer";
import registrationReducer from "./registration/registrationReducer";
import reservationReducer from "./reservations/reservationReducer";
import bookingFormReducer from "./booking/bookingReducer";

export default combineReducers({
  cars: carReducer,
  reservations: reservationReducer,
  bookingForm: bookingFormReducer,
  cities: cityReducer,
  spots: spotReducer,
  authentication: authenticationReducer,
  registration: registrationReducer
});
