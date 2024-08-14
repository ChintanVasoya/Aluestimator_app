import { Response } from "express";
import { validationResult } from "express-validator";
import User from "../../entity/User";
import { getRepository } from "typeorm";
import { http_status } from "../../utils/constants";
import {
  ErrorResponse,
  InputErrorResponse,
  SuccessResponse,
} from "../../utils/response";
import { encrypt_password } from "../../helpers/bcrypt_password";

export const register_user = async (req: any, res: Response) => {
  const errors = validationResult(req);
  const userRepo = getRepository(User);

  if (!errors.isEmpty()) {
    return res
      .status(http_status.bad_request)
      .json(InputErrorResponse(http_status.bad_request, errors.array()));
  }

  const {
    name,
    email,
    password,
    gender,
    date_of_birth,
    mobile,
    landline,
    address_1,
    address_2,
    degree,
    specialist,
    photo_url,
    user_access,
    general_availability_slots,
    city_id,
    user_type_id,
    hospital_property_id,
    is_admin,
    is_super_admin,
    reg_number,
    service_start_date
  } = req.body;

  try {
    let find_email = await userRepo.findOne({
      where: { email, is_active: true, is_deleted: false },
    });
    let find_phone_number = await userRepo.findOne({
      where: { mobile, is_active: true, is_deleted: false },
    });

    // validate duplicate email
    if (find_email) {
      return res
        .status(http_status.bad_request)
        .json(
          ErrorResponse(
            http_status.bad_request,
            "Email already exists",
            req?.originalUrl
          )
        );
    }

    // validate duplicate phone number
    if (find_phone_number) {
      return res
        .status(http_status.bad_request)
        .json(
          ErrorResponse(
            http_status.bad_request,
            "Phone number already taken",
            req?.originalUrl
          )
        );
    }

    const protected_password = await encrypt_password(password);
    await userRepo.save({
      name,
      email,
      mobile,
      address_1,
      address_2,
      landline,
      gender,
      date_of_birth,
      degree,
      specialist,
      photo_url,
      user_access,
      general_availability_slots,
      hospital_property: hospital_property_id,
      city: city_id,
      user_type: user_type_id,
      password: protected_password,
      created_by: req?.user !== null || undefined ? req?.user?.id : null,
      modified_by: req?.user !== null || undefined ? req?.user?.id : null,
      is_admin,
      is_super_admin,
      reg_number,
      service_start_date,
    });

    return res
      .status(http_status.ok)
      .json(
        SuccessResponse(
          http_status.ok,
          "Registeration Successful, Please verify email to login",
          { body: req.body },
          req?.originalUrl
        )
      );
  } catch (error) {
    console.log(error);
    return res
      .status(http_status.server_error)
      .json(
        ErrorResponse(
          http_status.server_error,
          "Server Error, Try Again",
          req?.originalUrl
        )
      );
  }
};
