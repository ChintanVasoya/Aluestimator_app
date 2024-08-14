import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../../entity/User";
import { getRepository } from "typeorm";
import { ErrorResponse, SuccessResponse } from "../../utils/response";
import { http_status } from "../../utils/constants";
import { find_user_by_id } from "../../services/user";

export const update_user_web_token = async (req: any, res: Response) => {
  const errors = validationResult(req);
  const userRepo = getRepository(User);

  if (!errors.isEmpty()) {
    return res
      .status(http_status.bad_request)
      .json({ statusCode: http_status.bad_request, errors: errors.array() });
  }
  const { web_token } = req.body;

  try {
    let find_user = await User.findOne({
      where: { id: req.user.id, is_active: true, is_deleted: false },
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

    await userRepo
      .createQueryBuilder()
      .update(User)
      .set({
        web_token: web_token ? web_token : find_user?.web_token,
      })
      .where("id = :id", { id: req.user.id })
      .execute();

    let found_user = await find_user_by_id(find_user?.id);
    res
      .status(http_status.ok)
      .json(
        SuccessResponse(
          http_status.ok,
          "Update Successful",
          { updated_user: found_user },
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
