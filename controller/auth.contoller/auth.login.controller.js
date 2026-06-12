import argon from 'argon2';
import {logindata} from '../../repositories/user.repositories/login.repo.js'
import {generateAccessToken,generateRefreshToken} from '../../utils/token.utils.js';
import jwt from "jsonwebtoken"
import {validateSession} from './../../repositories/user.repositories/login.validateSession.js'
import { env } from '../../utils/env.js';
const loginController= async (req,res)=>{
    const {credential,password}=req.body;
    const obj= await logindata(credential);
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
            const accessToken=await generateAccessToken(username,sessionId);
            res.status(200).cookie("refreshToken",refreshToken,{
                httpOnly:true,
                secure:false,
                sameSite:"lax",
            }).json({
                success:true,
                message:"Login successful",
                accessToken:accessToken,
                user:{
                    id:obj.user_id,
                    username:obj.username,
                    avatar:obj.profile_pic,
                }
            })

        }
    }
}
const refresh=async (req,res)=>{
    const refreshToken=req.cookies.refreshToken;
    if(!refreshToken){
        res.status(401).send({
            success:false,
            message:"User not logged in"
        })
    }
    else{
        const obj=jwt.verify(refreshToken,env.SECRET)
        console.log(obj,"object")
        if(!obj){
            res.status(401).send({
                success:false,
                message:"Invalid refresh token"
            })
        }
        else{
            const user_id=obj.sub;
            const sessionId=obj.sessionId;
            const valid= await validateSession(sessionId);
            
            if(valid){
                const userdata=await logindata(user_id);
                const accessToken=await generateAccessToken(userdata.username,sessionId);
                res.status(200).json({
                success:true,
                message:"Login successful",
                accessToken:accessToken,
                user:{
                    id:userdata.user_id,
                    username:userdata.username,
                    avatar:userdata.profile_pic,
                }
                })
            }
            else{
                res.status(401).send({
                    success:false,
                    message:"Session expired, please login again"
                })
            }
}
}}
export{loginController,refresh}