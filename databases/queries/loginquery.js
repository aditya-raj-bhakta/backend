export const loginquery=`select U.username,U.email,U.password_hash,U.user_id 
                            from USERS as
                            U where U.username=? OR U.email=?`;