import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import {pool} from '../config/db.config.js'
import { env } from './env.js';
const generateAccessToken=async (username,sessionId)=>{
    const token={
    sub: username,
    sessionId: sessionId,
}
    return await jwt.sign(token, env.SECRET, {
        expiresIn:'15m'
    })
}
const generateRefreshToken= async (userid,metadata)=>{
    const query=`insert into SESSIONS
    (id,user_id,refresh_token_hash,device_name,user_agent,ip_address,created_at,expires_at,last_used_at)
    values(?,?,?,?,?,?,?,?,?)`;
    const sessionId=crypto.randomUUID();
    const user_id=userid;
    const refreshtoken= await jwt.sign({
    sub: userid,
    sessionId: sessionId,

}, env.SECRET, {
    expiresIn: '30d'
})
    const refresh_token_hash=await crypto.createHash("sha256").update(refreshtoken).digest("hex");
    const device_name=metadata.device_name;
    const user_agent=metadata.user_agent;
    const ip_address=metadata.ip_address;
    const created_at=new Date();
    const expires_at=new Date(Date.now()+30*24*60*60*1000);
    const last_used_at=new Date();
    await pool.execute(query,[sessionId,user_id,refresh_token_hash,device_name,user_agent,ip_address,created_at,expires_at,last_used_at]);
    return [refreshtoken, sessionId];
    
}
//ids should be 32 bytes long to fit in the database and to be unique
//refresh token should be a random string of 64 bytes and then hashed using argon2 and stored in the database
//refresh token can be generated using the crypto.randomuuid() function and then hashed using argon2 and stored in the database along with the session id and user id and other metadata like device name, user agent, ip address, created at, expires at, last used at etc.
export {generateAccessToken,generateRefreshToken}