
import carReducer from "./car/carsReducer";
import { combineReducers } from "redux";
import {paginationReducer, sortingReducer } from "./pagination/paginationReducer";
import reservationsReducer from './reservation/reservationReducer'



export default combineReducers({cars:carReducer,pagination:paginationReducer,sorting:sortingReducer,reservations:reservationsReducer})