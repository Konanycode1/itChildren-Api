import jwt from "jsonwebtoken";


/**
 * 
 * @param {String} userToken 
 * @returns 
 */
export const generateJWT = async (userToken: string)=>{
    let keySecret = process.env.JWT_SECRET
    if(!keySecret) throw new Error("Error secret code")
    let token = await jwt.sign(userToken, keySecret,{
        expiresIn: 3600*24*1000
    });
    return token
}

export const verifyToken = async (tokenSend:string)=>{
    try {
        let keySecret = process.env.JWT_SECRET
        return jwt.verify(tokenSend, keySecret)
    } catch (e) {
        console.log("error for code", e)
        return false
    }
}