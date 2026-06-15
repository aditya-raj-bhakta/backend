import { createHash, verify } from "crypto";
import { createOTP, createTempUser} from "../../repositories/user.repositories/signup.repo.js";
import { sendOtp } from "../../services/auth/auth.mail.service.js";
import {verifyotp} from "../../services/auth/auth.verify.service.js"
import { createhash } from "../../utils/hashing.utils.js";
const signupInitiateController=async (req,res)=>{
    const email=req.body.email;
        await createTempUser(email)
        await createOTP(email,"SIGNUP")
        const otp=await createOTP(email,"SIGNUP")
        sendOtp(email,otp)
        res.send({
            success:true,
            message:"otp created"
        })
 
}
const signupVerifyController=async (req,res)=>{
    const otp=req.body.otp;
    const email=req.body.email;
    const isValid=await verifyotp(email,otp);
    if(isValid){
            res.send({
                success:true,
                message:"otp verified"
            })
        }
    else{
            res.send({
                success:false,
                message:"invalid otp"
            })
        }

}
const signupUsernameController=async(req,res)=>{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    const password_hash= await createhash(password);
    const isValid=await verifyusername(username);
    if(isValid){
        await createUsername(username,password_hash,email)
        res.send({
            success:true,
        })
    }
    else{
        res.send({
            success:false
        })
    }
}
export{signupInitiateController,signupVerifyController,signupUsernameController}