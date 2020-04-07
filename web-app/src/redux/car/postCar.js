import Axios from "axios";
import { carsURL } from "../../utilities/urls/apiURL";
import { addCar } from "./carActions";

export default car => {
  return dispatch => {
    dispatch(addCar);
    return Axios.post(carsURL, car);
  };
};
