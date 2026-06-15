import { pool } from "../../config/db.config.js";
import { verifyotpQuery } from "../../databases/queries/signupquery.js";
export const getotp=async(email,otp_hash)=>{
    const row=await pool.execute(verifyotpQuery,[otp_hash,email])
    return row[0][0]? row[0][0].otp_hash:null;
}