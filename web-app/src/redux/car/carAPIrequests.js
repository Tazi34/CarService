import axios from "axios";
import { receiveCars, receiveCarsError } from "./carActions";
import {
  createRequestPageActionCreator,
  receivePage
} from "../pagination/paginationActions";
import { buildUrl, carsEndpoint } from "../../utilities/urls/apiURL";

const requestCarPage = createRequestPageActionCreator(carsEndpoint, "cars");

export function fetchCarsPage({
  pageNo = 0,
  sortField = null,
  sortOrder = null,
  size = 10
}) {
  return function(dispatch) {
    dispatch(requestCarPage(pageNo));
    return axios
      .get(
        buildUrl({
          endpoint: carsEndpoint,
          pageNo: pageNo,
          sortField: sortField,
          sortOrder: sortOrder,
          size: size
        })
      )
      .then(
        response => {
          dispatch(receiveCars(response.data.content));

          dispatch(
            receivePage(
              response.data.number,
              response.data.content,
              response.data.totalPages,
              response.data.totalElements,
              response.data.size
            )
          );
        },
        error => dispatch(receiveCarsError(error))
      );
  };
}

export function fetchAvailableCarsPage(
  pageNo = 0,
  sortField = null,
  sortOrder = null,
  from,
  to,
  spotID = null
) {
  return function(dispatch) {
    const fromISO = new Date(from).toISOString();
    const toISO = new Date(to).toISOString();

    dispatch(requestCarPage(pageNo));
    return axios
      .get(
        buildUrl({
          endpoint: carsEndpoint,
          pageNo,
          sortField,
          sortOrder,
          from: fromISO,
          to: toISO,
          spot: spotID
        })
      )
      .then(
        response => {
          dispatch(receiveCars(response.data.content));
          dispatch(
            receivePage(
              response.data.number,
              response.data.content,
              response.data.totalPages,
              response.data.totalElements,
              response.data.size
            )
          );
        },
        error => dispatch(receiveCarsError(error))
      );
  };
}
