import express from 'express'
import cors from 'cors'
import { config } from 'dotenv';
import { connectDB } from './config/db.js';

config();

const app = express();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))



const port = process.env.PORT || 3000
connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log("server lancé")
    })
})
.catch((e)=>{
    console.log("erreur",e.message)
})



