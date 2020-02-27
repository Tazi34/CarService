export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
export const REQUEST_PAGE = "REQUEST_PAGE";
export const RECEIVE_PAGE = "RECEIVE_PAGE";
export const RESET_PAGINATION = "RESET_PAGINATION";

export const SET_SORT_FIELD = "SET_SORT_FIELD";
export const SET_SORT_ORDER = "SET_SORT_ORDER";
export const SET_SORTING = "SET_SORTING";

export const SortFields = {
  NONE: "NONE"
};
export const SortOrders = {
  ASC: "ASC",
  NOT_SORTED: "NOT_SORTED",
  DESC: "DESC"
};
export function setSortField(sortField) {
  return { type: SET_SORT_FIELD, payload: { sortField } };
}

export function setSortOrder(sortOrder) {
  return { type: SET_SORT_ORDER, payload: { sortOrder } };
}
export function setSorting(sortField, sortOrder) {
  return { type: SET_SORTING, payload: { sortField, sortOrder } };
}

export function setCurrentPage(page) {
  return { type: SET_CURRENT_PAGE, payload: { page } };
}

export function setTotalePages(totalPages) {
  return { type: SET_TOTAL_PAGES, payload: { totalPages } };
}

export function requestPage(endpoint, resultKey, page) {
  return {
    type: REQUEST_PAGE,
    payload: { page },
    meta: { endpoint, resultKey }
  };
}
export function resetPagination() {
  return { type: RESET_PAGINATION };
}

export function receivePage(page, results, totalPages) {
  return { type: RECEIVE_PAGE, payload: { page, results, totalPages } };
}

export function createRequestPageActionCreator(endpoint, resultKey) {
  return page => requestPage(endpoint, resultKey, page);
}
