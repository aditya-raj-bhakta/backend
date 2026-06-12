import { pool } from "../../config/db.config.js"
import { validateSessionQuery } from "../../databases/queries/loginquery.js"

const validateSession=async(sessionId)=>{
    const row=await pool.execute(validateSessionQuery,[sessionId]);
    if(row[0].length>0){
        return true
    }
    else {
        return false;
    }
}
export {validateSession}