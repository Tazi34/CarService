import { createPaginator } from "../pagination/paginationCreator";
import { combineReducers } from "redux";

const carPaginator = createPaginator("/cars", "cars");

export const carReducer = combineReducers({
  cars: carPaginator.itemsReducer,
  pagination: carPaginator.reducer
});

export const {
  requestPage: requestCarPage,
  receivePage: receiveCarPage,
  receivePageError: receiveCarPageError,
  setCarCurrentPage: setCurrentPage,
  setSortField: setCarSortField,
  setSortOrder: setCarSortOrder,
  setPageSize: setCarPageSize,
  setCurrentPage: setCarCurrentPage,
  setTotalPages: setCarTotalPages,
  resetPagination: resetCarPagination
} = carPaginator;
