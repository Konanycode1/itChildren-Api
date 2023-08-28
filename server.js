import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import path from 'path'
import { fileURLToPath } from 'url';

config({
    path: path.join(process.cwd(), '.env'),
  });
  
const app = express();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/images" ,express.static( path.join(__dirname,'images') ))

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



