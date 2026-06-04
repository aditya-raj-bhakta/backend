import argon from 'argon2';
import {logindata} from '../../repositories/user.repositories/login.repo.js'
import {generateAccessToken,generateRefreshToken} from '../../utils/token.utils.js';
const loginController= async (req,res)=>{
    const {credential,password}=req.body;
    const obj= await logindata(credential,password);
    if(!obj){
        return res.status(401).send({message:"Invalid Username or Email"});
    }
    else{
         if(!(await argon.verify(obj.password_hash,password))){
                return res.status(401).send("Invalid email or password");
            }
        else{
            const username=obj.username;
            const email=obj.email;
            const metadata={
                device_name:req.headers["user-agent"],
                user_agent:req.headers["user-agent"],
                ip_address:req.ip,

            }
            const [refreshToken,sessionId]= await generateRefreshToken(obj.user_id,metadata);   
            const accessToken=await generateAccessToken(username,email,sessionId);
            res.status(200).cookie("refreshToken",refreshToken,{
                httpOnly:true,
                secure:true,
                sameSite:"none",
            }).json({
                success:true,
                message:"Login successful",
                accessToken:accessToken,
            })

        }
    }
}
export{loginController}