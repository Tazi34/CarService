import Axios from "axios";
import { carsURL } from "../../../utilities/urls/apiURL";
import { blockCar } from "../carActions";

export default (car, startDate, endDate, comment) => {
  return dispatch => {
    dispatch(blockCar(car, startDate, endDate));
    return Axios.post(
      carsURL +
        `/${car.id}?startDate=${startDate}&endDate=${endDate}&comment=${comment}`,
      car
    );
  };
};
s;
