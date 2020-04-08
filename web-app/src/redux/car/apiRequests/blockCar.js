import Axios from "axios";
import { carsURL } from "../../../utilities/urls/apiURL";
import { blockCar } from "../carActions";
import moment from "moment";

export default (car, startDate, endDate, comment) => {
  return dispatch => {
    dispatch(blockCar(car, startDate, endDate));
    return Axios.post(
      carsURL +
        `/${car.id}/block?startDate=${moment(
          startDate
        ).toISOString()}&endDate=${moment(
          endDate
        ).toISOString()}&comment=${comment}`,
      car
    );
  };
};
