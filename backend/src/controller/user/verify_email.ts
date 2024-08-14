import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../../entity/User";
import { getRepository } from "typeorm";
import { ErrorResponse, SuccessResponse } from "../../utils/response";
import { http_status } from "../../utils/constants";

export const verify_email = async (req: Request, res: Response) => {
  let errors = validationResult(req);
  let userRepo = getRepository(User);

  if (!errors.isEmpty()) {
    return res.status(http_status.bad_request).json({ errors: errors.array() });
  }

  const { email, verify_email_code } = req.body;

  try {
    const find_user = await userRepo.findOne({
      where: { email, is_deleted: false },
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
    if (find_user?.verify_email_code !== verify_email_code) {
      return res
        .status(http_status.bad_request)
        .json(
          ErrorResponse(
            http_status.bad_request,
            "Invalid Verification Code",
            req?.originalUrl
          )
        );
    }

    await userRepo
      .createQueryBuilder()
      .update(User)
      .set({
        is_active: true,
        verify_email_code: null,
      })
      .where("id = :id", { id: find_user?.id })
      .execute();

    return res
      .status(http_status.ok)
      .json(
        SuccessResponse(
          http_status.ok,
          "Email Verification Successful",
          null,
          req.originalUrl
        )
      );
  } catch (error) {
    console.log(error);
    return res
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
