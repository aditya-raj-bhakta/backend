import "dotenv/config";

export const env = {
    PORT: process.env.PORT,
    SECRET: process.env.SECRET,  
    RESEND_API_KEY:process.env.RESEND_API_KEY
};