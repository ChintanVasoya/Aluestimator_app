import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../utils/response";
import { find_user_by_id } from "../services/user";
import dotenv from "dotenv";

dotenv.config();

export const auth = async (req: any, res: Response, next: NextFunction) => {
  const authorization_token = req?.headers?.authorization;

  // error if no authorization token provided
  try {
    if (
      !authorization_token ||
      authorization_token === null ||
      authorization_token === undefined
    ) {
      return res
        .status(400)
        .json(
          ErrorResponse(
            400,
            "No authorization token provided",
            req?.originalUrl
          )
        );
    }
    let decoded: any = jwt.verify(authorization_token, process.env.JWT_SECRET);

    // validate if token not correct
    if (!decoded) {
      return res
        .status(400)
        .json(ErrorResponse(400, "Invalid token", req?.originalUrl));
    }

    const find_user = await find_user_by_id(decoded?.id);

    // validate if no user found
    if (!find_user) {
      return res
        .status(400)
        .json(ErrorResponse(400, "Invalid token", req?.originalUrl));
    }

    req.user = find_user;
    next();
  } catch (error) {
    // console.log(error);
    if (error?.name === "JsonWebTokenError") {
      return res
        .status(400)
        .json(ErrorResponse(400, "Invalid token", req?.originalUrl));
    }
    res.status(500).json(ErrorResponse(500, "Server Error", req?.originalUrl));
  }
};
