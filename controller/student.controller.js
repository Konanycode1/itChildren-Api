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
    static async editStudent(req, res){
        let {logo, password, ...body} = req.body;
        let {id} = req.params;
        let auth = req.user;

       try {
            let studentUser = await Student.findById(id);
            if(!studentUser){
                res.status(200).json({
                    status: true,
                    message: "Modification effectué avec succès !!!"
                })
            }
            if(studentUser &&  id == auth._id){
                if(logo && password){
                    studentUser.update({logo:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`, password:bcryptPass(password), ...body})
                }
                else if(logo){
                    studentUser.update({logo:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`, ...body})
                }
                else if(password){
                    studentUser.update({password:bcryptPass(password), ...body})
                }
                else{
                    studentUser.update({ ...body})
                }
            }
            res.status(200).json({
                status: true,
                message: "Modification effectué avec succès !!!"
            })
        
       }
       catch (e) {
            res.status(404).json({
                status: false,
                message: e
            })
       }
        
    }
    static async deleteStudent(req, res){
        let auth = req.user;
        let {id} = req.params;
        try {
            // const studentUser = await Student.findById(id)
            if(id != auth._id){
                res.status(400)
                .json({
                    status: false,
                    message: "Compte introuvable"
                })
            }
            await Student.deleteOne({_id: id});
            res.status(201)
            .json({
                status: true,
                message: "Compte supprimé !!"
            })
            
        } catch (e) {
            if(e instanceof MongooseError) throw new Error("Erreur: ",e.message);
            res.status(500)
            .json({
                status: true,
                message: `Erreur: ${e.message}`
            });
        }
    }
    static async loginStudent(req,res){
        let {email, password} = req.params
        try {
            let studentUser = await Student.findOne({email})
            if(studentUser && ( await comparePass(password,studentUser.password))){
                req.cookies('token', generateJWT(studentUser.toObject()))
                return res.status(200)
                        .json({
                            status:true,
                            message: "Connexion encours"
                        })
            }
            res.status(401).json({ status: false, message: 'identifiant invalide' });
            
        } catch (e) {
            if(e instanceof MongooseError) throw new Error("Erreur:",e.message)
            res.status(500)
            .json({
                status: true,
                message: e.message
            })
        }
    }
}
