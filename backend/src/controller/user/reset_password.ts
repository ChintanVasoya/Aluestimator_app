import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorResponse, SuccessResponse } from "../../utils/response";
import { getRepository } from "typeorm";
import User from "../../entity/User";
import { encrypt_password } from "../../helpers/bcrypt_password";
import { http_status } from "../../utils/constants";

export const reset_password = async (req: Request, res: Response) => {
  let errors = validationResult(req);
  let userRepo = getRepository(User);

  if (!errors.isEmpty()) {
    return res.status(http_status.bad_request).json({ errors: errors.array() });
  }

  const { email, forgot_password_code, password, confirm_password } = req.body;

  try {
    const find_user = await userRepo.findOne({
      where: { email, is_active: true, is_deleted: false },
    });

    // validate if no user found
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

    // validate if code does not match
    if (find_user?.forgot_password_code !== forgot_password_code) {
      return res
        .status(http_status.bad_request)
        .json(
          ErrorResponse(
            http_status.bad_request,
            "Invalid forgot password code",
            req?.originalUrl
          )
        );
    }

    // validate if values does not match
    if (password !== confirm_password) {
      return res
        .status(http_status.bad_request)
        .json(
          ErrorResponse(
            http_status.bad_request,
            "Password and confirm password doesn't match",
            req?.originalUrl
          )
        );
    }

    let protected_password = await encrypt_password(password);

    await userRepo
      .createQueryBuilder()
      .update(User)
      .set({
        password: protected_password,
        forgot_password_code: null,
      })
      .where("id = :id", { id: find_user?.id })
      .execute();

    res
      .status(http_status.ok)
      .json(
        SuccessResponse(
          http_status.ok,
          "Password changed successfull",
          null,
          req?.originalUrl
        )
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        ErrorResponse(
          http_status.server_error,
          "Server Error",
          req?.originalUrl
        )
      );
  }
};
