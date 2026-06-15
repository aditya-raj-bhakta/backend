import crypto from "crypto"
export async function createhash(value){
    const hash=await crypto.createHash("sha256").update(value).digest('hex')
    return hash;

}