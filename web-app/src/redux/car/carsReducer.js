import { combineReducers } from 'redux'
import { RECEIVE_CARS_ERROR,RECEIVE_CARS_SUCCESS, REQUEST_CARS,  SET_VISIBILITY_FILTER, VisibilityFilters } from './actions/carActions'

const { SHOW_ALL } = VisibilityFilters



function cars(state =
    {
        items: {},
        isFetching: false,
        error: null,
        byId:[],
        lastUpdated:0,
        fetched:false,
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
            var _items = {}
            payload.cars.forEach(car => _items = {..._items,[car.id]: car});
            
            return Object.assign({}, state, {
                isFetching: false,
                byId:[...state.byId,byId],
                items: {...state.items,..._items},
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




const carReducer = cars

export default carReducer;

