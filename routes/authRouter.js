import express from 'express'
import { loginController,refresh } from '../controller/auth.contoller/auth.login.controller.js';
import loginValidator from '../validators/auth/auth.login.validator.js';
import { logoutController } from '../controller/auth.contoller/auth.logout.contoller.js';
const authRouter=express.Router();

authRouter.post("/login",[loginValidator,loginController])
authRouter.post("/signup/initiate")
// authRouter.post("/signup/verify")
// authRouter.post("/signup/complete")
// authRouter.post("/signup/resend")
authRouter.get("/logout",logoutController)
authRouter.get("/login/refresh",refresh)
export{authRouter}