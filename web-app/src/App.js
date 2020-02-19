import React from 'react';
import logo from './logo.svg';
import './App.css';
import carReducer from './redux/reducers/carsReducer';
import { createStore } from 'redux';
import { addCar, deleteCar } from './redux/car/actions/carActions';

function App() {
  const store = createStore(carReducer)
  const unsubscribe = store.subscribe(()=>console.log(store.getState()))

  store.dispatch(
    addCar( 
      {
        id:1,
        make:"Honda",
        price:150,
      }

  ))
  store.dispatch(
    addCar( 
      {
        id:2,
        make:"Honda",
        price:150,
      }

  ))
  store.dispatch(
    deleteCar(
      {
          id:1,
          make:"Honda",
          price:150,
      }

    )
  )

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
