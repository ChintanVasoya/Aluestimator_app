import winston from "winston";

export const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: `${__dirname}/error.log`,
      level: "error",
    }),
    new winston.transports.File({
      filename: `${__dirname}/all_logs.log`,
      level: "info",
    }),
  ],
});
