import { combineReducers } from 'redux'
import { RECEIVE_CARS, REQUEST_CARS, SET_SORT_ORDER, SET_VISIBILITY_FILTER, SortOrders, VisibilityFilters } from './actions/carActions'




const { SHOW_ALL } = VisibilityFilters
const { NOT_SORTED } = SortOrders

function cars(state =
    {
        items: [],
        isFetching: false,
    },
    action) {
    switch (action.type) {
        case REQUEST_CARS:
            return Object.assign({},state,{
                isFetching:true,
            })
        case RECEIVE_CARS:
            var byId = action.cars.map((car) => car.id)
            var items = {}
            action.cars.forEach(car => items[car.id] = car)
            return Object.assign({},state,{
                isFetching: false,
                byId: byId,
                items: items,
                lastUpdated: action.receivedAt,
                fetched:true,
            })      
        default:
            return state
    }

}

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state
    }
}

function sortOrder(state = NOT_SORTED, action) {
    switch (action.type) {
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

