import {
  RECEIVE_PAGE,
  REQUEST_PAGE,
  RESET_PAGINATION,
  SET_CURRENT_PAGE,
  SET_SORTING,
  SET_SORT_FIELD,
  SET_SORT_ORDER,
  SortOrders
} from "./paginationActions";

const { NOT_SORTED } = SortOrders;

const paginationInitialState = {
  pages: {},
  currentPage: 0,
  totalPages: 0
};
function pagination(state = paginationInitialState, action) {
  switch (action.type) {
    case REQUEST_PAGE:
      return {
        ...state,
        pages: {
          ...state.pages,

          [action.payload.page]: {
            ids: [],
            fetching: true
          }
        }
      };
    case RECEIVE_PAGE:
      return {
        ...state,
        currentPage: action.payload.page,
        totalPages: action.payload.totalPages,
        pages: {
          ...state.pages,
          [action.payload.page]: {
            ids: action.payload.results.map(item => item.id),
            fetching: false
          }
        }
      };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.page };
    case RESET_PAGINATION:
      var _state = {
        pages: {},
        currentPage: 0,
        totalPages: 0
      };
      return _state;
    default:
      return state;
  }
}

function sorting(state = { order: NOT_SORTED, field: null }, action) {
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

export const paginationReducer = pagination;
export const sortingReducer = sorting;

// function currentPage(state = -1, action) {
//   switch (action.type) {
//     case REQUEST_PAGE:
//       return action.payload.page;
//     case SET_CURRENT_PAGE:
//       return { ...state, currentPage: action.payload.page };

//     default:
//       return state;
//   }
// }

// function totalPages(state = -1, action) {
//   return action.type == RECEIVE_PAGE ? action.payload.totalPages : state;
// }

// function sortOrder(state = NOT_SORTED, action) {
//     switch (action.type) {
//         case SET_SORT_ORDER:
//             return action.payload.sortOrder
//         default:
//             return state
//     }
// }
// function sortField(state = null, action) {
//     switch (action.type) {
//         case SET_SORT_FIELD:
//             return action.payload.sortField
//         default:
//             return state
//     }
// }
