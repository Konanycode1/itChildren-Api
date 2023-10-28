import bcrypt from "bcrypt";

export const bcryptPass = async (pass: string)=>{
    return await bcrypt.hash(pass, await bcrypt.genSalt(10))
}

export const comparePass = async (newPass: string, oldPass: string)=>{
    try {
        return await bcrypt.compare(newPass, oldPass)
    } catch (e) {
        console.log("error  for code", e)
        return false
    }
    
}