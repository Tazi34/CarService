import { createPaginator } from "../pagination/paginationCreator";
import { combineReducers } from "redux";
import Axios from "axios";

import { buildUrl, statusEndpoint } from "../../utilities/urls/apiURL";

const statusPaginator = createPaginator("/statuses", "statuses");

export const statusReducer = combineReducers({
  statuses: statusPaginator.itemsReducer,
  pagination: statusPaginator.reducer
});

export const {
  requestPage: requestStatusPage,
  receivePage: receiveStatusPage,
  receivePageError: receiveStatusPageError,
  setSortField: setStatusSortField,
  setSortOrder: setStatusSortOrder,
  setPageSize: setStatusPageSize,
  setCurrentPage: setStatusCurrentPage,
  setTotalPages: setStatusTotalPages,
  resetPagination: resetStatusPagination
} = statusPaginator;

export const fetchStatusPage = ({ pageNo, size, sortField, sortOrder }) => {
  return dispatch => {
    dispatch(requestStatusPage(pageNo));
    return Axios.get(
      buildUrl({ pageNo, size, endpoint: statusEndpoint, sortField, sortOrder })
    ).then(
      response => {
        dispatch(
          receiveStatusPage(
            response.data.number,
            response.data.content,
            response.data.totalPages,
            response.data.totalElements,
            response.data.size
          )
        );
      },
      error => dispatch(receiveStatusPageError(error))
    );
  };
};
