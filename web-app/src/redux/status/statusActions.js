//TODO SPLIT TO DIFFERENT FILES

//ACTION TYPES
export const ADD_STATUS = "ADD_STATUS";
export const DELETE_STATUS = "DELETE_STATUS";

export const SET_SORT_FIELD = "SET_SORT_FIELD";
export const SET_SORT_ORDER = "SET_SORT_ORDER";

//ACTION CREATORS
export function addStatus(car) {
  return { type: ADD_STATUS, car };
}

export function deleteStatus(car) {
  return { type: DELETE_STATUS, car };
}
