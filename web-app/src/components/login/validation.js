import * as yup from "yup";
import { string } from "yup";

export const loginValidationSchema = yup.object().shape({
  email: string()
    .email()
    .required("Enter your email."),
  password: string().required("Enter password.")
});
