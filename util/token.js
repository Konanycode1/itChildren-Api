import { sign, verify } from "jsonwebtoken";


/**
 * 
 * @param {String} userToken 
 * @returns 
 */
export const generateJWT = async (userToken)=>{
    let keySecret = process.env.JWT_SECRET
    if(!keySecret) throw new Error("Error secret code")
    let token = await sign(userToken, keySecret,{
        expiresIn: 3600*24*1000
    });
    return token
}

export const verifyToken = async (tokenSend)=>{
    try {
        let keySecret = process.env.JWT_SECRET
        return verify(token, keySecret)
    } catch (e) {
        console.log("error for code", e)
        return false
    }
}