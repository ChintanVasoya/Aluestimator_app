import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../utils/response";
import { validationResult } from "express-validator";
import { http_status } from "../../utils/constants";
import { find_user_by_id } from "../../services/user";

export const user_by_id = async (req: any, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(http_status.bad_request)
      .json({ statusCode: http_status.bad_request, errors: errors.array() });
  }

  const { id } = req.params;

  try {
    let user_by_id = await find_user_by_id(id);

    if (user_by_id === null) {
      return res
        .status(http_status.bad_request)
        .json(
          ErrorResponse(
            http_status.bad_request,
            "No users found",
            req?.originalUrl
          )
        );
    }

    res.status(http_status.ok).json(
      SuccessResponse(
        http_status.ok,
        "User found successfully",
        {
          data: user_by_id,
        },
        req?.originalUrl
      )
    );
  } catch (error) {
    console.log(JSON.stringify(error));
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
