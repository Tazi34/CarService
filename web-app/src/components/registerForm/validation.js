import { ref, string } from "yup";

let yup = require("yup");

export const registerFormValidationSchema = yup.object().shape({
  email: string()
    .email("Please enter correct email address.")
    .required("Please enter correct email address."),
  password: string()
    .min(8, "Password is too short. Min 8 characters.")
    .matches(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"), {
      message: "Provided password is too weak."
    })
    .required("No password provided"),
  passwordConfirmation: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("No password provided")
});
