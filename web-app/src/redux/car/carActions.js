//TODO SPLIT TO DIFFERENT FILES

//ACTION TYPES
export const ADD_CAR = "ADD_CAR";
export const DELETE_CAR = "DELETE_CAR";

export const SET_SORT_FIELD = "SET_SORT_FIELD";
export const SET_SORT_ORDER = "SET_SORT_ORDER";

export const REQUEST_CARS = "REQUEST_CARS";
export const RECEIVE_CARS_SUCCESS = "RECEIVE_CARS_SUCCESS";
export const RECEIVE_CARS_ERROR = "RECEIVE_CARS_ERROR";

//ACTION CREATORS
//TODO normalize state (change from objects to ids)
export function addCar(car) {
  return { type: ADD_CAR, car };
}

export function deleteCar(car) {
  return { type: DELETE_CAR, car };
}

//API
