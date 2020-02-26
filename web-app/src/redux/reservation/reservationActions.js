//ACTIONS
export const SET_START_DATE = "SET_START_DATE";
export const SET_END_DATE = "SET_END_DATE";
export const SET_START_SPOT = "SET_START_SPOT";
export const SET_END_SPOT = "SET_END_SPOT";

export function setStartDate(date) {
  return { type: SET_START_DATE, payload: { date: date } };
}
export function setEndDate(date) {
  return { type: SET_END_DATE, payload: { date: date } };
}

export function setEndSpot(spot) {
  return { type: SET_END_SPOT, payload: { spot: spot } };
}
export function setStartSpot(spot) {
  return { type: SET_START_SPOT, payload: { spot: spot } };
}
