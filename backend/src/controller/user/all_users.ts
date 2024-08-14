import { Request, Response } from "express";
import {
  ErrorResponse,
  InputErrorResponse,
  SuccessResponse,
} from "../../utils/response";
import { validationResult } from "express-validator";
import { http_status } from "../../utils/constants";
import { find_all_users } from "../../services/user";

export const all_users = async (req: any, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(http_status.bad_request)
      .json(InputErrorResponse(http_status.bad_request, errors.array()));
  }

  const { per_page, page_number, start_date, end_date, sort_order } = req.query;

  let current_user = req?.user;

  try {
    let find_users = await find_all_users({
      per_page,
      page_number,
      start_date,
      end_date,
      sort_order,
      current_user,
    });

    if (find_users?.data?.length === 0) {
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
        "Users found successfully",
        {
          ...find_users,
        },
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
