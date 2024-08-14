import { body, query, param } from "express-validator";

export const register_user_validation = [
  body("name", "Name is required").not().isEmpty(),
  body("email", "Email is required")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Email must be valid"),
  body("gender", "Gender is required").not().isEmpty(),
  body("date_of_birth", "Date of birth is required").not().isEmpty(),
  body("mobile", "Mobile number is required").not().isEmpty(),
  body("password", "Password is required")
    .not()
    .isEmpty()
    .matches(/\d/)
    .withMessage("Atleast one number is required")
    .matches(/[A-Z]+/)
    .withMessage("Atleast one capital letter is required")
    .matches(/[\W_]+/)
    .withMessage("Atleast one special character is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 to 20 characters"),
];

export const verify_email_validation = [
  body("email", "Email is required")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Email must be valid"),
  body("verify_email_code", "Email verification code is required")
    .not()
    .isEmpty(),
];

export const forgot_password_email_validation = [
  body("email", "Email is required")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Email must be valid"),
];

export const login_mobile_otp_validation = [
  body("mobile_number", "Phone number is required").not().isEmpty(),
];

export const forgot_password_code_check_validation = [
  body("email", "Email is required")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Email must be valid"),
  body("forgot_password_code", "Verification code is required")
    .not()
    .isEmpty()
    .isLength({ max: 6 }),
];

export const login_user_with_phone_number_validation = [
  body("mobile_number", "Phone number is required").not().isEmpty(),
  body("mobile_login_otp", "Verification Code is required").not().isEmpty(),
];

export const login_user_by_email_validation = [
  body("email", "Email is required")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Email must be valid"),
  body("password", "Password is required").not().isEmpty(),
];

export const all_users_validation = [
  query("per_page", "Per page is required")
    .optional()
    .isNumeric()
    .withMessage("Only numbers are allowed"),
  query("page_number", "Page number is required")
    .optional()
    .isNumeric()
    .withMessage("Only numbers are allowed"),
];

export const user_by_id_validation = [
  param("id", "Id is required")
    .not()
    .isEmpty()
    .isUUID()
    .withMessage("Id is not valid"),
];

export const reset_password_validation = [
  body("email", "Email is required").not().isEmpty(),
  body("forgot_password_code", "Forgot password code is required")
    .not()
    .isEmpty(),
  body("password", "Password is required")
    .not()
    .isEmpty()
    .matches(/\d/)
    .withMessage("Atleast one number is required")
    .matches(/[A-Z]+/)
    .withMessage("Atleast one capital letter is required")
    .matches(/[\W_]+/)
    .withMessage("Atleast one special character is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 to 20 characters"),
  body("confirm_password", "Confirm Password is required").not().isEmpty(),
];

export const update_user_validation = [
  body("id", " is required")
    .not()
    .isEmpty()
    .isUUID()
    .withMessage("Id is not valid"),
];

export const update_user_web_token_validation = [
  body("web_token", "Web token is required").not().isEmpty(),
];

export const delete_user_validation = [
  param("id", "Id is required")
    .not()
    .isEmpty()
    .isUUID()
    .withMessage("Id is not valid"),
];
