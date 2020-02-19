import { ADD_CAR,DELETE_CAR,SET_VISIBILITY_FILTER,VisibilityFilters, SortOrders, SET_SORT_ORDER } from '../car/actions/carActions'
import {  } from '../car/actions/carActions'
import { combineReducers } from 'redux'



const {SHOW_ALL} = VisibilityFilters
const {NOT_SORTED} = SortOrders

function cars(state = [], action) {
    switch (action.type) {
        case ADD_CAR:
            return  [
                        ...state,
                        action.car
                    ]
        case DELETE_CAR:
            return state.filter((car) => car.id !== action.car.id)  
        default:
            return state
    }

}

function visibilityFilter(state = SHOW_ALL,action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state
    }
}

function sortOrder(state = NOT_SORTED,action){
    switch(action.type){
        case SET_SORT_ORDER:
            return action.sortOrder;
        default:
            return state
    }
}

const carReducer = combineReducers(
    {
        visibilityFilter,
        sortOrder,
        cars,
    }
)

export default carReducer;

