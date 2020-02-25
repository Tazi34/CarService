import { combineReducers } from 'redux'
import { RECEIVE_CARS_ERROR,RECEIVE_CARS_SUCCESS, REQUEST_CARS, SET_SORT_ORDER, SET_VISIBILITY_FILTER, SortOrders, VisibilityFilters } from './actions/carActions'

const { SHOW_ALL } = VisibilityFilters
const { NOT_SORTED } = SortOrders

function cars(state =
    {
        items: [],
        isFetching: false,
        error: null,
    },
    action) {
    switch (action.type) {
        case REQUEST_CARS:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_CARS_SUCCESS:
            var payload = action.payload
            var byId = payload.cars.map((car) => car.id)
            var items = {}
            payload.cars.forEach(car => items[car.id] = car)
            return Object.assign({}, state, {
                isFetching: false,
                byId: byId,
                items: items,
                lastUpdated: payload.receivedAt,
                fetched: true,
            })
        case RECEIVE_CARS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                lastUpdated: action.receivedAt,
                error:action.error,
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




const carReducer = combineReducers(
    {
        visibilityFilter,
        cars,
    }
)

export default carReducer;

