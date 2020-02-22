import { paginationReducer } from "./pagination/paginationReducer";
import carReducer from "./car/carsReducer";
import { combineReducers } from "redux";


export default combineReducers({cars:carReducer,pagination:paginationReducer})