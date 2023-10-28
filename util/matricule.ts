export const matric =(userName:string)=>{
    let newDate =  new Date()
    const number = Math.floor((Math.random()*1000-1)*1)
    return `${userName.substring(0,3).toUpperCase()}${number}_ITC_${newDate.getFullYear()}`
}