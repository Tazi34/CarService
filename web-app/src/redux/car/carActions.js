//ACTION TYPES
export const ADD_CAR = "ADD_CAR";
export const DELETE_CAR = "DELETE_CAR";
export const BLOCK_CAR = "BLOCK_CAR";

export const SET_SORT_FIELD = "SET_SORT_FIELD";
export const SET_SORT_ORDER = "SET_SORT_ORDER";

export function addCar(car) {
  return { type: ADD_CAR, car };
}

export function deleteCar(car) {
  return { type: DELETE_CAR, car };
}

export function blockCar(car) {
  return { type: BLOCK_CAR, car };
}
