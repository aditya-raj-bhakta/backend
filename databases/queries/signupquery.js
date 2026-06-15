export const signupInitiateQuery=`insert into TEMP_USERS (email,user_id,verified) values (?,?,?)`
export const createotpQuery=`insert into OTP (id,email,otp_hash,purpose,attempts,created_at,expires_at) values (?,?,?,?,?,?,?)`
export const verifyotpQuery=`select otp_hash 
from OTP 
where otp_hash = ? 
  and email = ? 
  and verified_at is null`
export const createUsernameQuery=`UPDATE TEMP_USER set username=?,password_hash=? where email=?`