import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../../entity/User";
import {
  ErrorResponse,
  InputErrorResponse,
  SuccessResponse,
} from "../../utils/response";
import { match_password } from "../../helpers/bcrypt_password";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { http_status } from "../../utils/constants";
import { find_user_by_id } from "../../services/user";

// import nodemailer from "nodemailer";
import { generateOTP } from "../../helpers/genrateotp";

dotenv.config();

// Function to send an email
// async function sendEmail(email: any, code: any) {
//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_ID, // your email
//       pass: process.env.EMAIL_PASSWORD, // your email password
//     },
//   });

//   let mailOptions = {
//     from: process.env.EMAIL_ID,
//     to: email,
//     subject: "Your OTP Code",
//     text: `Your OTP code is ${code}`,
//   };

//   return transporter.sendMail(mailOptions);
// }


export const login_user_by_email = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(http_status.bad_request)
      .json(InputErrorResponse(http_status.bad_request, errors.array()));
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({
      where: { email, is_deleted: false },
    });

    // validate duplicate email
    if (!user) {
      return res
        .status(http_status.bad_request)
        .json(
          ErrorResponse(
            http_status.bad_request,
            "Invalid Credentials",
            req?.originalUrl
          )
        );
    }

    let isMatch = await match_password(user.password, password);

    // error if no password match
    if (!isMatch) {
      return res
        .status(http_status.bad_request)
        .json(
          ErrorResponse(
            http_status.bad_request,
            "Invalid Credentials",
            req?.originalUrl
          )
        );
    }




    let found_user = await find_user_by_id(user?.id);

    // Check if found_user is not null
    if (!found_user) {
      return res
        .status(http_status.bad_request)
        .json(
          ErrorResponse(
            http_status.bad_request,
            "User not found",
            req?.originalUrl
          )
        );
    }

    // generate jwt token using user details after successful login
    jwt.sign(
      { id: found_user.id },
      process.env.JWT_SECRET,
      (err: any, token: string) => {
        if (err)
          return res
            .status(http_status.bad_request)
            .json(
              ErrorResponse(
                http_status.bad_request,
                err,
                req?.originalUrl
              )
            );

        res
          .status(http_status.ok)
          .json(
            SuccessResponse(
              http_status.ok,
              "Login Successful",
              { token, id: user?.id, user: found_user },
              req?.originalUrl
            )
          );
      }
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

