import { createOTP, createTempUser } from "../../repositories/user.repositories/signup.repo.js";

const signupInitiateController=async (req,res)=>{
    const email=req.body.email;
        await createTempUser(email)
        await createOTP(email,"SIGNUP")
        res.send({
            success:true,
            message:"otp created"
        })
 
}
export{signupInitiateController}