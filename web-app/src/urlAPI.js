export const apiURL = "http://localhost:8080";

const addParam = (url, key, value) => {
  return `${url}&${key}=${value}`;
};

export function buildUrl(
  endpoint,
  pageNo,
  sortField,
  sortOrder,
  from,
  to,
  spot
) {
  var url = apiURL;
  url += endpoint + "?";

  if (from) url = addParam(url, "from", from);
  if (to) url = addParam(url, "to", to);
  if (pageNo) url = addParam(url, "page", pageNo);
  if (sortOrder && sortField) url += `&sort=${sortField},${sortOrder}`;
  if (spot) url = addParam(url, "spot", spot);

  return url;
}

export const citiesURL = apiURL + "/cities";
