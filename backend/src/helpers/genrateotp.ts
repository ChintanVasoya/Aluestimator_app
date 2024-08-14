import crypto from "crypto";

export const generateOTP = (length = 6) => {
    return crypto
        .randomInt(Math.pow(10, length - 1), Math.pow(10, length))
        .toString();
}