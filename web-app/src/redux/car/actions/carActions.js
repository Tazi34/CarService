import axios from 'axios';
//TODO SPLIT TO DIFFERENT FILES

//ACTION TYPES
export const ADD_CAR = 'ADD_CAR'
export const DELETE_CAR = 'DELETE_CAR'


export const SET_SORT_ORDER = 'SET_SORT_ORDER'

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const REQUEST_CARS = 'REQUEST_CARS'
export const RECEIVE_CARS = 'RECEIVE_CARS'

//Constants

export const VisibilityFilters = {
    SHOW_ALL:'SHOW_ALL',
    SHOW_AVAILABLE:'SHOW_AVAILABLE',
    SHOW_BOOKED:'SHOW_BOOKED'
}

export const SortOrders = {
    NOT_SORTED:'NOT_SORTED',
    SORT_BY_PRICE:'SORT_BY_PRICE',
    SORT_BY_SEATS:'SORT_BY_SEATS',
}


//ACTION CREATORS
//TODO normalize state (change from objects to ids)
export function addCar(car){
    return {type:ADD_CAR, car}
}

export function deleteCar(car){
    return {type:DELETE_CAR, car}
}

export function setVisibilityFilter(filter){
    return {type:SET_VISIBILITY_FILTER,filter} 
}

export function setSortOrder(sortOrder){
    return {type:SET_SORT_ORDER,sortOrder} 
}
export function count(){
    return {type:"COUNT"}
}
//API
export function requestCars(){
    return{
        type:REQUEST_CARS,
    }
}
export function receiveCars(data){
    return{
        type:RECEIVE_CARS,
        cars: data,
        receivedAt : Date.now()
        
    }

}

export function fetchCars(){
    return function(dispatch){
        dispatch(requestCars())
        return axios.get('http://localhost:8080/cars')
            .then(response => {
                console.log(response)
                dispatch(receiveCars(response.data.content))
                
            },error => console.log("Error",error))
       
    }
}