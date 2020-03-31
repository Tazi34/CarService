import Axios from "axios";

import { addSpots } from "./spot/spotActions";
import { citiesURL } from "../../utilities/urls/apiURL";

export const RECEIVE_CITIES_SUCCESS = "RECEIVE_CITIES_SUCCESS";
export const RECEIVE_CITIES_ERROR = "RECEIVE_CITIES_ERROR";
export const REQUEST_CITIES = "RECEIVE_CITIES";

export const receiveCitiesSuccess = cities => {
  return {
    type: RECEIVE_CITIES_SUCCESS,
    payload: { cities: cities }
  };
};

export const receiveCitiesError = error => ({
  type: RECEIVE_CITIES_ERROR,
  payload: {
    error: error
  }
});

export const requestCities = () => {
  return {
    type: REQUEST_CITIES
  };
};

export function fetchCities() {
  return function(dispatch) {
    dispatch(requestCities());
    Axios.get(citiesURL).then(
      response => {
        dispatch(receiveCitiesSuccess(response.data));

        dispatch(
          addSpots(
            response.data.map(city => city.spots).reduce((a, b) => a.concat(b))
          )
        );
      },
      error => dispatch(receiveCitiesError(error))
    );
  };
}
