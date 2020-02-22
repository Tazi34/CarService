import { REQUEST_PAGE, RECEIVE_PAGE, SET_CURRENT_PAGE } from "./paginationActions";
import { combineReducers } from "redux";



function pages(state = {}, action) {
    switch (action.type) {
        case REQUEST_PAGE:
            return {
                ...state,
                [action.payload.page]: {
                    ids: [],
                    fetching: true
                }
            }

        case RECEIVE_PAGE:
            return {
                ...state,
                [action.payload.page]: {
                    ids: action.payload.results.map(item => item.id),
                    fetching: false,
                }
            }
        default:
            return state
    }
}

function currentPage(state = 0, action) {
    switch (action.type) {
        case REQUEST_PAGE : 
            return action.payload.page
        case SET_CURRENT_PAGE:
            return action.payload.page
        default:
            return state

    }
}

function totalPages(state = -1, action) {
    return action.type == RECEIVE_PAGE ? action.payload.totalPages : state
}

export const paginationReducer =
    combineReducers({
        pages,
        currentPage,
        totalPages
    })

