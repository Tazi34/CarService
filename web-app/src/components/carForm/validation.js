import * as yup from "yup";
import { number, string } from "yup";
import moment from "moment";

const requiredFieldMessage = "This field is required";
const yearErrorMessage = "Enter valid production year.";
const validNumberMessage = "Enter valid number.";
const makeErrorMessage = "Enter valid make.";
const modelErrorMessage = "Enter valid model.";
const validPriceMessage = "Enter valid price";

export const carFormValidationSchema = yup.object().shape({
  model: string().required(modelErrorMessage),
  make: string().required(makeErrorMessage),
  year: number()
    .typeError(yearErrorMessage)
    .min(1885, "First car was build in 1885. Don't lie.")
    .max(moment().year(), yearErrorMessage)
    .integer(validNumberMessage)
    .required(yearErrorMessage),
  doors: number()
    .typeError(validNumberMessage)
    .min(1, validNumberMessage)
    .max(7, validNumberMessage)
    .integer(validNumberMessage)
    .required(validNumberMessage),
  seats: number()
    .typeError(validNumberMessage)
    .min(1, validNumberMessage)
    .max(20, validNumberMessage)
    .integer(validNumberMessage)
    .required(validNumberMessage),

  price: string()
    .matches(/\d+(\.\d{2})/, { message: "Enter valid price." })
    .required(validPriceMessage),

  licence: string()
    .max(8, "Enter valid licence")
    .required(requiredFieldMessage)
});
