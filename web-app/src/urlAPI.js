export const apiURL = "http://localhost:8080";

const addParam = (url, key, value) => {
  return `${url}&${key}=${value}`;
};

export function buildUrl({
  endpoint,
  pageNo,
  sortField,
  sortOrder,
  from,
  to,
  spot,
  size
}) {
  let url = apiURL;
  url += endpoint + "?";

  if (from) url = addParam(url, "from", from);
  if (to) url = addParam(url, "to", to);
  if (pageNo) url = addParam(url, "page", pageNo);
  if (sortOrder && sortField) url += `&sort=${sortField},${sortOrder}`;
  if (spot) url = addParam(url, "spot", spot);
  if (size) url = addParam(url, "size", size);
  return url;
}

//WEB PAGE
export const detailsPage = "/details";
export const loginPage = "/login";
export const reservationSummaryPage = "/reservation/summary";
export const logoutPage = "/logout";
//API
export const loginURL = apiURL + "/login";
export const authUserURL = apiURL + "/auth/current";
export const signUpURL = apiURL + "/auth/sign-up";
export const citiesURL = apiURL + "/cities";
export const reservationsEndpoint = "/reservations";
export const reservationsURL = apiURL + reservationsEndpoint;
export const clientDetailsURL = `${apiURL}/clientinfos/email`;
export const userReservationsURL = apiURL + reservationsEndpoint + "/user";
