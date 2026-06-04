import express from 'express'
import { loginController } from '../controller/auth.contoller/auth.controller.js';
import loginValidator from '../validators/auth/auth.login.validator.js';
const authRouter=express.Router();

authRouter.post("/login",[loginValidator,loginController])
// authRouter.post("/signup/initiate")
// authRouter.post("/signup/verify")
// authRouter.post("/signup/complete")
// authRouter.post("/signup/resend")
export{authRouter}