import { pool } from "../../config/db.config.js"
import { loginquery } from "../../databases/queries/loginquery.js"
const logindata=async (credential)=>{
    try{
        const rows=await pool.execute(loginquery,[credential,credential,credential]);
        if(rows.length==0){
            return null
        }
        else{
            return {
                email:rows[0][0].email,
                username:rows[0][0].username,
                password_hash:rows[0][0].password_hash,
                user_id:rows[0][0].user_id,
                profile_pic:rows[0][0].profile_pic
            }
        }
    }
    catch (error){
        return null
    }
    
}
export {logindata}

