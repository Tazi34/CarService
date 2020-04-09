import { combineReducers } from "redux";
import cityReducer from "./city/cityReducer";
import spotReducer from "./city/spot/spotReducer";
import authenticationReducer from "./authentication/authenticationReducer";
import registrationReducer from "./registration/registrationReducer";
import reservationReducer from "./reservations/reservationReducer";
import bookingFormReducer from "./booking/bookingReducer";
import { LOGOUT } from "./authentication/authenticationActions";
import { statusReducer } from "./status/statusReducer";
import { carReducer } from "./car/carsReducer";

const paginations = combineReducers({ statusReducer, carReducer });

const appReducer = combineReducers({
  reservations: reservationReducer,
  bookingForm: bookingFormReducer,
  cities: cityReducer,
  spots: spotReducer,
  authentication: authenticationReducer,
  registration: registrationReducer,
  paginations
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
