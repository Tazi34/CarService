import axios from 'axios'
import { receiveCars } from '../car/actions/carActions'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES'
export const REQUEST_PAGE = 'REQUEST_PAGE'
export const RECEIVE_PAGE = 'RECEIVE_PAGE'

export function setCurrentPage(page){
    return {type:SET_CURRENT_PAGE,payload:{page}} 
}

export function setTotalePages(totalPages){
    return {type:SET_TOTAL_PAGES
        ,payload:{totalPages}}
}


export function requestPage(endpoint,resultKey,page){
    return {type:REQUEST_PAGE,
        payload:{page},
        meta:{endpoint,resultKey}
    }
}

export function receivePage(page,results,totalPages){
    return {type:RECEIVE_PAGE,payload:{page,results,totalPages}}
}

export function createRequestPageActionCreator(endpoint,resultKey) {
    return (page) => requestPage(endpoint,resultKey,page)
}

const requestCarPage = createRequestPageActionCreator('/cars','cars')

export function fetchCarPage(pageNo){
    return function(dispatch){
        dispatch(requestCarPage(pageNo))
        return axios.get(`http://localhost:8080/cars?page=${pageNo}`)
            .then(response => {
                dispatch(receivePage(response.data.number,response.data.content,response.data.totalPages ))
                dispatch(receiveCars(response.data.content))
            },error => console.log("Error",error))
       
    }
}