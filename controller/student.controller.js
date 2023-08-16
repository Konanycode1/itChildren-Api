import Student from "../model/student";
import { generateJWT, verifyToken } from "../util/token";
import { bcryptPass, comparePass } from "../util/crypt";
import  MongooseError  from "mongoose";
import { matric } from "../util/matricule";

export class Student {

    static async  create(req, res){
        const {nom,logo, password, ...body} = req.body;
        try {
            const userStudent = await Student.create({
                nom: nom,
                logo:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                matricule: matric(nom),
                password: bcryptPass(password),
                ...body
            })
            res.status(200).json({
                    status: true,
                    message: "Inscription effectuée"
                })  
        } catch (e) {
            return res.json({ status: false, message: e.message });
        }
    }
    
    static async getStudent(req, res){
        let {id} = req.params
        try {
           let user =  await Student.findById(id)
           if(user){
                res.status(200).json({
                    status: true,
                    message:{ ...user.toObject(), password: undefined}
                })
           }
        } catch (e) {
            if(e instanceof MongooseError) throw new Error("Erreur: ", e.message)
        }
    }
    static editStudent(req, res){
        let {logo, password} = req.body
        
    }

}
