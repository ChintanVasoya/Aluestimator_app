import { logger } from "../logs/logging";

export const SuccessResponse = (
  statusCode: number,
  message: string,
  body: any,
  originalUrl: string
) => {
  let current_date = new Date();
  logger.log(
    "info",
    `url: ${originalUrl} , statusCode: ${statusCode} , message: ${message}, time: ${current_date.toLocaleString()}`
  );
  return {
    statusCode,
    message,
    body,
  };
};

export const ErrorResponse = (
  statusCode: number,
  message: string,
  originalUrl: string
) => {
  let current_date = new Date();
  logger.log(
    "error",
    `url: ${originalUrl} , statusCode: ${statusCode} , message: ${message}, time: ${current_date.toLocaleString()}`
  );
  return {
    statusCode,
    errors: [{ msg: message }],
  };
};

export const InputErrorResponse = (statusCode: number, errors: any) => {
  return {
    statusCode,
    errors,
  };
};
