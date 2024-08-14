import { Router } from "express";
import { verify_email } from "../controller/user/verify_email";
import { register_user } from "../controller/user/register_user";
import {
    all_users_validation,
    delete_user_validation,
    login_user_by_email_validation,
    register_user_validation,
    reset_password_validation,
    update_user_validation,
    update_user_web_token_validation,
    user_by_id_validation,
    verify_email_validation,
} from "../validators/user";
import { login_user_by_email } from "../controller/user/login_user_by_email";
import { all_users } from "../controller/user/all_users";
import { auth } from "../middleware/auth";
import { user_by_id } from "../controller/user/user_by_id";
import { reset_password } from "../controller/user/reset_password";
import { update_user } from "../controller/user/update_user";
import { delete_user } from "../controller/user/delete_user";
import { update_user_web_token } from "../controller/user/update_user_web_token";


const router = Router();

router.post("/register-user", register_user_validation, register_user);
router.post(
    "/login-user-by-email",
    login_user_by_email_validation,
    login_user_by_email
);
router.put("/update-user", auth, update_user_validation, update_user);
router.put(
    "/update-user-web-token",
    auth,
    update_user_web_token_validation,
    update_user_web_token
);
router.put("/reset-password", reset_password_validation, reset_password);
router.delete("/delete-user/:id", auth, delete_user_validation, delete_user);
router.put("/verify-email", verify_email_validation, verify_email);

router.get("/all-users", auth, all_users_validation, all_users);
router.get("/user-by-id/:id", auth, user_by_id_validation, user_by_id);

export default router;
