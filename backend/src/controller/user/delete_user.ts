import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../../entity/User";
import { getRepository } from "typeorm";
import {
  ErrorResponse,
  InputErrorResponse,
  SuccessResponse,
} from "../../utils/response";
import { http_status } from "../../utils/constants";

export const delete_user = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const userRepo = getRepository(User);

  if (!errors.isEmpty()) {
    return res
      .status(http_status.bad_request)
      .json(InputErrorResponse(http_status.bad_request, errors.array()));
  }
  const { id } = req.params;

  try {
    let find_user = await userRepo.findOne({
      where: { id, is_deleted: false },
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

    await userRepo
      .createQueryBuilder()
      .update(User)
      .set({
        is_active: false,
        is_deleted: true,
      })
      .where("id = :id", { id: id })
      .execute();

    res
      .status(http_status.ok)
      .json(
        SuccessResponse(
          http_status.ok,
          "Delete Successful",
          null,
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
