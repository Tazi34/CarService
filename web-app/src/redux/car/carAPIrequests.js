import axios from "axios";
import { receiveCars, receiveCarsError } from "./carActions";
import {
  createRequestPageActionCreator,
  receivePage
} from "../pagination/paginationActions";
import {
  availableCarsEndpoint,
  buildUrl,
  carsEndpoint
} from "../../utilities/urls/apiURL";
import moment from "moment";

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
  startDate,
  endDate,
  spotID = null
) {
  return function(dispatch) {
    dispatch(requestCarPage(pageNo));
    return axios
      .get(
        buildUrl({
          endpoint: availableCarsEndpoint,
          pageNo,
          sortField,
          sortOrder,
          startDate: moment(startDate).toISOString(),
          endDate: moment(endDate).toISOString(),
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
