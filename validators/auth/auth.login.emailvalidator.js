import Ajv from 'ajv';
import addformat from "ajv-formats"
import ajvErrors from "ajv-errors"




const ajv=new Ajv({
    allErrors:true,
})



ajvErrors(ajv)
addformat(ajv);

const emailSchema={
    type:"object",
    properties:{
        email:{
            type:"string",
            minLength:1,
            format:"email",
            errorMessage:"not a email"
        }
    }
}
const validate=ajv.compile(emailSchema);
const emailValidator=(email)=>{
    const valid=ajv.validate(emailSchema,email);
    return valid;
}
export{emailValidator}