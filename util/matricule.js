/**
 * 
 * @param {String} userName 
 * @returns 
 */

export const matric =(userName)=>{
    let newDate = new Date.now()
    return `${userName.substring(0,3)}_ITC_${newDate.getFullYear()}`
}