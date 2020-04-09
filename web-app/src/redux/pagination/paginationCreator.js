import { combineReducers } from "redux";
import { SortOrders } from "../../utilities/sortOrders";
import { LOGOUT } from "../authentication/authenticationActions";

export const RESET_PAGINATION = "RESET_PAGINATION";
export const SET_RESULT_PAGE = "SET_RESULT_PAGE";
export const RECEIVE_PAGE = "RECEIVE_PAGE";
export const REQUEST_PAGE = "REQUEST_PAGE";
export const RECEIVE_PAGE_ERROR = "RECEIVE_PAGE_ERROR";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";

export const SET_SORT_FIELD = "SET_SORT_FIELD";
export const SET_SORT_ORDER = "SET_SORT_ORDER";
export const SET_SORTING = "SET_SORTING";
export const SET_TOTAL_ELEMENTS = "SET_TOTAL_ELEMENTS";

export const SET_PAGE_SIZE = "SET_PAGE_SIZE";

export const createPaginator = (endpoint, resultKey) => {
  const requestPage = page => ({
    type: REQUEST_PAGE,
    payload: {
      page
    },
    meta: {
      endpoint,
      resultKey
    }
  });
  const setSortField = sortField => {
    return {
      type: SET_SORT_FIELD,
      payload: { sortField },
      meta: {
        endpoint,
        resultKey
      }
    };
  };
  const setTotalElements = totalElements => {
    return {
      type: SET_TOTAL_ELEMENTS,
      payload: { totalElements },
      meta: {
        endpoint,
        resultKey
      }
    };
  };
  const setSortOrder = sortOrder => {
    return {
      type: SET_SORT_ORDER,
      payload: { sortOrder },
      meta: {
        endpoint,
        resultKey
      }
    };
  };
  const setPageSize = pageSize => ({
    type: SET_PAGE_SIZE,
    payload: { pageSize },
    meta: {
      endpoint,
      resultKey
    }
  });
  const receivePage = (page, results, totalPages, totalElements, pageSize) => {
    return dispatch => {
      dispatch(setPageResult(page, results));
      dispatch(setCurrentPage(page));
      dispatch(setTotalPages(totalPages));
      dispatch(setTotalElements(totalElements));
      dispatch(setPageSize(pageSize));
    };
  };
  const setCurrentPage = page => {
    return {
      type: SET_CURRENT_PAGE,
      payload: { page },
      meta: {
        endpoint,
        resultKey
      }
    };
  };
  const setPageResult = (page, results) => ({
    type: SET_RESULT_PAGE,
    payload: { page, results },
    meta: {
      endpoint,
      resultKey
    }
  });
  const setTotalPages = totalPages => {
    return {
      type: SET_TOTAL_PAGES,
      payload: { totalPages },
      meta: {
        endpoint,
        resultKey
      }
    };
  };

  const receivePageError = error => ({
    type: RECEIVE_PAGE_ERROR,
    payload: {
      error
    },
    meta: {
      endpoint,
      resultKey
    }
  });

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
      case SET_RESULT_PAGE:
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
      case SET_CURRENT_PAGE:
        return payload.page;
      case RESET_PAGINATION:
        return 0;
      default:
        return currentPage;
    }
  };
  const pageSize = (pageSize = 10, { type, payload }) => {
    switch (type) {
      case SET_PAGE_SIZE:
        return payload.pageSize;
      default:
        return pageSize;
    }
  };
  const totalElements = (totalElements = 0, { type, payload }) => {
    switch (type) {
      case SET_TOTAL_ELEMENTS:
        return payload.totalElements;
      default:
        return totalElements;
    }
  };

  const onlyForEndpoint = reducer => {
    return (state = {}, action = {}) => {
      console.log(action.type);
      if (action.type.startsWith("@@") || action.type === LOGOUT) {
        return reducer(state, action);
      }
      if (typeof action.meta === "undefined") {
        return state;
      }

      return action.meta.endpoint == endpoint ? reducer(state, action) : state;
    };
  };
  const sorting = (
    state = { order: SortOrders.NOT_SORTED, field: null },
    action
  ) => {
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
  };
  const itemsReducer = (items = {}, action = {}) => {
    switch (action.type) {
      case SET_RESULT_PAGE:
        let _items = {};
        for (let item of action.payload.results) {
          _items = {
            ..._items,
            [item.id]: item
          };
        }
        return {
          ...items,
          ..._items
        };
      default:
        return items;
    }
  };
  const totalPages = (state = -1, { type, payload }) => {
    switch (type) {
      case SET_TOTAL_PAGES:
        return payload.totalPages;
      case RESET_PAGINATION:
        return -1;
      default:
        return state;
    }
  };
  const resetPagination = () => {
    return {
      type: RESET_PAGINATION,
      meta: {
        endpoint,
        resultKey
      }
    };
  };
  const reducer = onlyForEndpoint(
    combineReducers({
      pages,
      currentPage,
      totalElements,
      totalPages,
      sorting,
      pageSize
    })
  );
  return {
    setSortField,
    setSortOrder,
    setPageSize,
    setCurrentPage,
    setTotalPages,
    requestPage,
    receivePage,
    receivePageError,
    reducer,
    resetPagination,
    itemsReducer: onlyForEndpoint(itemsReducer)
  };
};
