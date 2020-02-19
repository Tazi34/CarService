//TODO SPLIT TO DIFFERENT FILES

//ACTION TYPES
export const ADD_CAR = 'ADD_CAR'
export const DELETE_CAR = 'DELETE_CAR'


export const SET_SORT_ORDER = 'SET_SORT_ORDER'

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'


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