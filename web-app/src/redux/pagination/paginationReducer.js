import { REQUEST_PAGE, RECEIVE_PAGE, SET_CURRENT_PAGE, SET_SORT_ORDER, SET_SORT_FIELD, SortOrders, SET_SORTING, RESET_PAGINATION } from "./paginationActions";
import { combineReducers } from "redux";

const { NOT_SORTED } = SortOrders

const paginationInitialState = {
    pages: {},
    currentPage: 0,
    totalPages: 0,
}
function pagination(state = paginationInitialState, action) {
    switch (action.type) {
        case REQUEST_PAGE:
            return {
                ...state,
                pages: {
                    [action.payload.page]: {
                        ids: [],
                        fetching: true
                    }
                }
            }
        case RECEIVE_PAGE:
            return {
                ...state,
                currentPage: action.payload.page,
                totalPages: action.payload.totalPages,
                pages: {
                    ...state.pages,
                    [action.payload.page]: {
                        ids: action.payload.results.map(item => item.id),
                        fetching: false,
                    }
                }
            }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload.page }
        case RESET_PAGINATION:
            return paginationInitialState
        default:
            return state
    }
}
function currentPage(state = -1, action) {
    switch (action.type) {
        case REQUEST_PAGE:
            return action.payload.page
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload.page }

        default:
            return state

    }
}

function totalPages(state = -1, action) {
    return action.type == RECEIVE_PAGE ? action.payload.totalPages : state
}

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

function sorting(state = { order: NOT_SORTED, field: null }, action) {
    switch (action.type) {
        case SET_SORTING:
            return  { ...state,order: action.payload.sortOrder, field: action.payload.sortField};
        case SET_SORT_ORDER:
            return { ...state, order: action.payload.sortOrder }
        case SET_SORT_FIELD:
            return { ...state, field: action.payload.sortField}
        default:
            return state;
    }
}

export const paginationReducer = pagination
export const sortingReducer = sorting;

