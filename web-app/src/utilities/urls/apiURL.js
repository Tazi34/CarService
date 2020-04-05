//API
import moment from "moment";

export const apiURL =
  process.env.NODE_ENV === "production"
    ? "https://tazi34-car-service.herokuapp.com"
    : "http://localhost:8080";

export const carsEndpoint = "/cars";
export const carsURL = apiURL + carsEndpoint;
export const availableCarsEndpoint = "/cars/available";

export const getPriceEndpoint = (carId, startDate, endDate) => {
  const startDateISO = moment(startDate).toISOString();
  const endDateISO = moment(endDate).toISOString();
  return `${priceURL}/?carId=${carId}&startDate=${startDateISO}&endDate=${endDateISO}`;
};
export const priceEndpoint = "/price";
export const priceURL = apiURL + priceEndpoint;

export const loginURL = apiURL + "/login";
export const authUserURL = apiURL + "/auth/current";
export const signUpURL = apiURL + "/auth/sign-up";
export const citiesURL = apiURL + "/cities";

export const reservationsEndpoint = "/reservations";
export const reservationsURL = apiURL + reservationsEndpoint;

export const clientDetailsURL = `${apiURL}/clientinfos/email`;
export const userReservationsURL = apiURL + reservationsEndpoint + "/user";

const addParam = (url, key, value) => {
  return `${url}&${key}=${value}`;
};

export function buildUrl({
  endpoint,
  pageNo,
  sortField,
  sortOrder,
  startDate,
  endDate,
  spot,
  size
}) {
  let url = apiURL;
  url += endpoint + "?";

  if (startDate) url = addParam(url, "startDate", startDate);
  if (endDate) url = addParam(url, "endDate", endDate);
  if (pageNo) url = addParam(url, "page", pageNo);
  if (sortOrder && sortField) url += `&sort=${sortField},${sortOrder}`;
  if (spot) url = addParam(url, "spot", spot);
  if (size) url = addParam(url, "size", size);
  return url;
}
