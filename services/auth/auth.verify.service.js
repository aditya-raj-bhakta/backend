import { verifyotpQuery } from "../../databases/queries/signupquery.js";
import { getotp } from "../../repositories/otp.repositories/otp.verify.js";
import crypto from 'crypto';
export const verifyotp=async (email,otp)=>{
    otp=otp.toString();
    const otp_hash=await crypto.createHash("sha256").update(otp).digest("hex");
    const otp_hash_db=await getotp(email,otp_hash);
    if(otp_hash===otp_hash_db){
        return true
    }
    else{
        return false
    }
}
