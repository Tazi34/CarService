import { combineReducers } from "redux";
import {
  RECEIVE_PAGE,
  REQUEST_PAGE,
  RESET_PAGINATION,
  SET_SORT_FIELD,
  SET_SORT_ORDER,
  SET_SORTING,
  SortOrders
} from "./paginationActions";

export const createPaginator = () => {
  const pages = (pages = {}, action = {}) => {
    switch (action.type) {
      case REQUEST_PAGE:
        return {
          ...pages,
          [action.payload.page]: {
            ids: [],
            fetching: true
          }
        };
      case RESET_PAGINATION:
        return {};
      case RECEIVE_PAGE:
        return {
          ...pages,
          [action.payload.page]: {
            ids: action.payload.results.map(item => item.id),
            fetching: false
          }
        };
      default:
        return pages;
    }
  };

  const currentPage = (currentPage = 0, { type, payload }) => {
    switch (type) {
      case REQUEST_PAGE:
        return payload.page;
      case RESET_PAGINATION:
        return 0;
      default:
        return currentPage;
    }
  };

  // const itemsReducer = (items = {}, action = {}) => {
  //   switch (action.type) {
  //     case RECEIVE_PAGE:
  //       let _items = {};
  //       for (let item of action.payload.results) {
  //         _items = {
  //           ..._items,
  //           [item.id]: item
  //         };
  //       }
  //       return {
  //         ...items,
  //         ..._items
  //       };
  //     default:
  //       return items;
  //   }
  // };
  function sorting(
    state = { order: SortOrders.NOT_SORTED, field: null },
    action
  ) {
    switch (action.type) {
      case SET_SORTING:
        return {
          ...state,
          order: action.payload.sortOrder,
          field: action.payload.sortField
        };
      case SET_SORT_ORDER:
        return { ...state, order: action.payload.sortOrder };
      case SET_SORT_FIELD:
        return { ...state, field: action.payload.sortField };
      default:
        return state;
    }
  }
  const totalPages = (state = -1, { type, payload }) => {
    switch (type) {
      case RECEIVE_PAGE:
        return payload.totalPages;
      case RESET_PAGINATION:
        return -1;
      default:
        return state;
    }
  };

  return combineReducers({
    pages,
    currentPage,
    // itemsReducer,
    totalPages,
    sorting
  });
};
