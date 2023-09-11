import express from  "express"
const route = express.Router();
import Student from "../controller/student.controller.js"
import Multer from '../midlleware/multer.js'

route.post("/student/cr",Multer.single("logo"),Student.create)
route.get("/student",Student.getStudent)
route.post("/student/lg/",Student.loginStudent)     

export default route