import bcrypt from "bcrypt";
/**
 * 
 * @param {String} pass 
 */
export const bcryptPass = async (pass)=>{
    return await bcrypt.hash(pass, await bcrypt.genSalt(10))
}
/**
 * 
 * @param {String} newPass 
 * @param {String} oldPass 
 * @returns 
 */
export const comparePass = async (newPass, oldPass)=>{
    try {
        return await bcrypt.compare(newPass, oldPass)
    } catch (e) {
        console.log("error  for code", e)
        return false
    }
    
}