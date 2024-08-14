import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../../entity/User";
import { getRepository } from "typeorm";
import { ErrorResponse, SuccessResponse } from "../../utils/response";
import { http_status } from "../../utils/constants";
import { find_user_by_id } from "../../services/user";

export const update_user = async (req: any, res: Response) => {
  const errors = validationResult(req);
  const userRepo = getRepository(User);

  if (!errors.isEmpty()) {
    return res
      .status(http_status.bad_request)
      .json({ statusCode: http_status.bad_request, errors: errors.array() });
  }
  const {
    name,
    email,
    mobile,
    address_1,
    address_2,
    landline,
    gender,
    date_of_birth,
    degree,
    user_access,
    specialist,
    photo_url,
    general_availability_slots,
    city_id,
    user_type_id,
    id,
    web_token,
    hospital_property_id,
    is_super_admin,
    is_admin,
    reg_number,
    service_start_date
  } = req.body;

  try {
    let find_user = await User.findOne({
      where: { id, is_deleted: false },
    });
    let find_email = await User.findOne({
      where: { email, is_active: true, is_deleted: false },
    });
    let find_phone_number = await User.findOne({
      where: { mobile, is_active: true, is_deleted: false },
    });

    // validate if no user exists
    if (!find_user) {
      return res
        .status(http_status.bad_request)
        .json(
          ErrorResponse(
            http_status.bad_request,
            "No user found",
            req?.originalUrl
          )
        );
    }

    // validate email if new email is already taken by some other user
    if (find_email !== null && find_email?.id !== id) {
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

    // validate phone number if new email is already taken by some other user
    if (find_phone_number !== null && find_phone_number?.id !== id) {
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
    await userRepo
      .createQueryBuilder()
      .update(User)
      .set({
        name: name ? name : find_user?.name,
        email: email ? email : find_user?.email,
        gender: gender ? gender : find_user?.gender,
        date_of_birth: date_of_birth ? date_of_birth : find_user?.date_of_birth,
        modified_by: req?.user ? req?.user?.id : find_user?.modified_by,
        web_token: web_token ? web_token : find_user?.web_token,
        is_admin: is_admin,
      })
      .where("id = :id", { id: id })
      .execute();

    let updated_user = await find_user_by_id(find_user?.id);

    res
      .status(http_status.ok)
      .json(
        SuccessResponse(
          http_status.ok,
          "Update Successful",
          { updated_user },
          req?.originalUrl
        )
      );
  } catch (error) {
    console.log(error);
    res
      .status(http_status.server_error)
      .json(
        ErrorResponse(
          http_status.server_error,
          "Server Error",
          req?.originalUrl
        )
      );
  }
};
