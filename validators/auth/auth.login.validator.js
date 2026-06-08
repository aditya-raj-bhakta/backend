
import Ajv from 'ajv';
import addformat from "ajv-formats"
import ajvErrors from "ajv-errors"
import { emailValidator} from './auth.login.emailvalidator.js';



const ajv=new Ajv({
    allErrors:true,
})



ajvErrors(ajv)
addformat(ajv);

const schema={
    type:"object",
    properties:{
        email:{
            type:"string",
            minLength:1,
            format:"email",
        },
        username:{
            type:"string",
            minLength:3,
             errorMessage:{
                minLength:"Username must be at least 3 characters long"
            }
        },
        password:{
            type:"string",
            minLength:8,
            errorMessage:{
                minLength:"Password must be at least 8 characters long"
            }
        },
       
    
    },
    anyOf:[
            {required:["email","password"]},
            {required:["username","password"]}
        ]
}




const validate=ajv.compile(schema);







const loginValidator=(req,res,next)=>{
    try{
    const {credential,password} = req.body;
    let email=emailValidator(credential);
    if(email){
        email=credential;
        const obj={email,password}
        const valid=validate(obj);
        if(!valid){
           const error = [];
           validate.errors.forEach((e)=>{error.push(e)})
            error.forEach(e=>{console.log(e.errorMessage)});
            return res.status(400).send(error);
        }
        else{
            
            return next();
        }
        
    }
    else{

        const username=credential;
        const obj={username,password}
        const valid=validate(obj);
        if(!valid){
           const error = [];
           validate.errors.forEach((e)=>{error.push(e)})
           console.log(error);
            error.forEach(e=>{console.log(e.errorMessage)});
            return res.status(400).send(error);
        }
        else{
            return next();
        }
    }
        }
        catch(error){
         return res.status(401).send({message:"unathorized"});
    }
}
export default loginValidator;