import mysql from "mysql2";
let pool = mysql.createPool({
    host: "localhost",
    user: "reddit",
    password: "Aditya@123",
    database: "reddit"
});
pool=pool.promise();
export {pool}
