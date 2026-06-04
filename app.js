import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/authRouter.js';
const app=express()
const PORT=env.PORT;
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/posts", postrouter);
app.use("/api/auth",authRouter)
app.listen(PORT,()=>{
    console.log(PORT)
})
