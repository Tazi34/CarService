import axios from 'axios';
//TODO SPLIT TO DIFFERENT FILES

//ACTION TYPES
export const ADD_CAR = 'ADD_CAR'
export const DELETE_CAR = 'DELETE_CAR'

export const SET_SORT_FIELD = 'SET_SORT_FIELD'
export const SET_SORT_ORDER = 'SET_SORT_ORDER'

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const REQUEST_CARS = 'REQUEST_CARS'
export const RECEIVE_CARS_SUCCESS = 'RECEIVE_CARS_SUCCESS'
export const RECEIVE_CARS_ERROR = 'RECEIVE_CARS_ERROR'
//Constants

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_AVAILABLE: 'SHOW_AVAILABLE',
    SHOW_BOOKED: 'SHOW_BOOKED'
}




//ACTION CREATORS
//TODO normalize state (change from objects to ids)
export function addCar(car) {
    return { type: ADD_CAR, car }
}

export function deleteCar(car) {
    return { type: DELETE_CAR, car }
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}



//API
export function requestCars() {
    return {
        type: REQUEST_CARS,
    }
}
export function receiveCars(data) {
    return {
        type: RECEIVE_CARS_SUCCESS,
        payload: {
            cars: data,
            receivedAt: Date.now()
        }

    }
}
export function receiveCarsError(error) {
    return {
        type: RECEIVE_CARS_ERROR,
        payload: {
            error: error
        }
    }
}

