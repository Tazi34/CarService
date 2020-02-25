import { ADD_CAR,DELETE_CAR,SET_VISIBILITY_FILTER,VisibilityFilters, SortOrders, SET_SORT_ORDER } from '../car/actions/carActions'
import {  } from '../car/actions/carActions'
import { combineReducers } from 'redux'





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




const carReducer = cars

export default carReducer;

