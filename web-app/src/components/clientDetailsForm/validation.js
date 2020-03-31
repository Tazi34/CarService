import * as yup from "yup";
import { string } from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const requiredFieldMessage = "This field is required";

export const clientDetailsValidationSchema = yup.object().shape({
  firstName: string().required(requiredFieldMessage),
  lastName: string().required(requiredFieldMessage),
  email: string()
    .email()
    .required(requiredFieldMessage),
  pid: string()
    .required(requiredFieldMessage)
    .nullable(),
  street: string().required(requiredFieldMessage),
  houseNumber: string().required(requiredFieldMessage),
  country: string().required(requiredFieldMessage),
  city: string().required(requiredFieldMessage),
  phoneNumber: string()
    .matches(phoneRegExp, { message: "Enter valid phone number" })
    .required(requiredFieldMessage)
    .nullable(),
  postalCode: string().required(requiredFieldMessage)
});
