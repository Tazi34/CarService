import Axios from "axios";
import { carsURL } from "../../../utilities/urls/apiURL";
import { deleteCar } from "../carActions";

export default carId => {
  return dispatch => {
    dispatch(deleteCar(carId));
    return Axios.delete(carsURL + `/${carId}`);
  };
};
