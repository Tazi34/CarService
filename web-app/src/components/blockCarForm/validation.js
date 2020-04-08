import * as yup from "yup";
import { date, string } from "yup";
import moment from "moment";

export const blockFormValidationSchema = yup.object().shape({
  startDate: date().required(),
  endDate: date().when(
    "startDate",
    (startDate, schema) =>
      startDate && schema.min(moment(startDate).add(1, "day"), "Incorrect date")
  ),
  comment: string().required("Enter description")
});
