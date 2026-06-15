import { Resend } from 'resend';
import { env } from '../../utils/env.js';
export const sendOtp=async (email,otp)=>{
    const resend = new Resend(env.RESEND_API_KEY);
    await resend.emails.send({
         from: 'Acme <onboarding@resend.dev>',
         to: [email],
         subject: 'otp for reddit signup',
         html: `<p>your otp is ${otp}</p>`,
        });
}