import { REQUEST_PAGE, RECEIVE_PAGE, SET_CURRENT_PAGE, SET_SORT_ORDER,SET_SORT_FIELD,SortOrders, SET_SORTING } from "./paginationActions";
import { combineReducers } from "redux";

const {NOT_SORTED} = SortOrders


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

function sorting(state = {order:NOT_SORTED,field:null}, action){
    switch(action.type){
        case SET_SORTING:
            return Object.assign({},state,{order:action.payload.sortOrder,field:action.payload.sortField});
        default:
             return state;
    }
}
function currentPage(state = -1, action) {
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
        totalPages,
        sorting,
    })

