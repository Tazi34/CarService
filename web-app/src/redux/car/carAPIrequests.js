import axios from "axios";
import { receiveCars, receiveCarsError } from "./carActions";
import { buildUrl } from "../../urlAPI";
import {
  receivePage,
  createRequestPageActionCreator
} from "../pagination/paginationActions";

const requestCarPage = createRequestPageActionCreator("/cars", "cars");

export function fetchCarsPage(pageNo = 0, sortField = null, sortOrder = null) {
  return function(dispatch) {
    dispatch(requestCarPage(pageNo));
    return axios.get(buildUrl("/cars", pageNo, sortField, sortOrder)).then(
      response => {
        dispatch(receiveCars(response.data.content));
        dispatch(
          receivePage(
            response.data.number,
            response.data.content,
            response.data.totalPages
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
    var fromISO = new Date(from).toISOString();
    var toISO = new Date(to).toISOString();

    dispatch(requestCarPage(pageNo));
    return axios
      .get(
        buildUrl("/cars", pageNo, sortField, sortOrder, fromISO, toISO, spotID)
      )
      .then(
        response => {
          dispatch(receiveCars(response.data.content));
          dispatch(
            receivePage(
              response.data.number,
              response.data.content,
              response.data.totalPages
            )
          );
        },
        error => dispatch(receiveCarsError(error))
      );
  };
}
