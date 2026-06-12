export const loginquery=`select U.username,U.email,U.password_hash,U.user_id,U.profile_pic
                            from USERS as
                            U where U.username=? OR U.email=? or U.user_id=?`;
export const validateSessionQuery=`select * from SESSIONS where id=? and revoked_at is NULL and expires_at > NOW()`;