import { inProduction } from "./env.js";
import { connect } from "mongoose";

export const connectDB = async ()=>{
    const MONGO_URI = process.env.MONGO_URI
    if(!MONGO_URI) throw new Error("Your mongo uri not exist")
    await connect(MONGO_URI, {
        dbName: inProduction?'IT-childrens_test': 'IT-childrens'
    })
}