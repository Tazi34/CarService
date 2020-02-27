//ACTIONS
export const SET_START_DATE = "SET_START_DATE";
export const SET_END_DATE = "SET_END_DATE";
export const SET_START_SPOT = "SET_START_SPOT";
export const SET_END_SPOT = "SET_END_SPOT";

export const SET_START_CITY = "SET_START_CITY";
export const SET_END_CITY = "SET_END_CITY";
export function setStartDate(date) {
  return { type: SET_START_DATE, payload: { date: date } };
}
export function setEndDate(date) {
  return { type: SET_END_DATE, payload: { date: date } };
}
export const setStartCity = payload => ({
  type: SET_START_CITY,
  payload
});
export const setEndCity = payload => ({
  type: SET_END_CITY,
  payload
});

export function setEndSpot(spot) {
  return { type: SET_END_SPOT, payload: { spot: spot } };
}
export function setStartSpot(spot) {
  return { type: SET_START_SPOT, payload: { spot: spot } };
}
