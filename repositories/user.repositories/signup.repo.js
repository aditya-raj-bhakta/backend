import { pool } from "../../config/db.config.js";
import crypto from 'crypto';
import { createotpQuery, signupInitiateQuery } from "../../databases/queries/signupquery.js";
export const createTempUser=async (email)=>{
    const user_id=crypto.randomUUID();
    const verified=false;
    await pool.execute(signupInitiateQuery,[email,user_id,verified]);
    
}
export const createOTP=async (email,purpose)=>{
    const id=crypto.randomUUID();
    const otp=crypto.randomInt(100000,999999).toString();
    const otp_hash=crypto.createHash("sha256").update(otp).digest("hex")
    const atempts=5;
    const created_at=new Date();
    const expires_at=new Date(Date.now()+60*5*1000)
    await pool.execute(createotpQuery,[id,email,otp_hash,purpose,atempts,created_at,expires_at]);
}