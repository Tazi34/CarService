import { createPaginator } from "../pagination/paginationCreator";
import { combineReducers } from "redux";
import Axios from "axios";

import { statusURL } from "../../utilities/urls/apiURL";

const statusPaginator = createPaginator("/status", "statuses");

export const statusReducer = combineReducers({
  statuses: statusPaginator.itemsReducer,
  pagination: statusPaginator.reducer
});

const {
  requestPage: requestStatusPage,
  receivePage: receiveStatusPage,
  receivePageError: receiveStatusPageError
} = statusPaginator;

export { requestStatusPage, receiveStatusPageError, receiveStatusPage };

export const fetchStatusPage = page => {
  return dispatch => {
    dispatch(requestStatusPage(page));
    return Axios.get(statusURL).then(
      resp => {
        dispatch(receiveStatusPage(page, resp.data.content));
      },
      error => dispatch(receiveStatusPageError(error))
    );
  };
};
