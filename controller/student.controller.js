
import student from "../model/student.js";
import { generateJWT, verifyToken } from "../util/token.js";
import { bcryptPass, comparePass } from "../util/crypt.js";
import  MongooseError  from "mongoose";
import { matric } from "../util/matricule.js";

class Student {

    static async  create(req, res){
        const {nom,email,logo, password, ...body} = req.body;
        try {
            
            let verif = await student.find({email: email})
            if(verif){
                res.status(404).json({
                    status: false,
                    message: "Compte existe déjà !!"
                })
                return 
            }
            const myMatric = matric(nom)
            let matricAll =  await student.find({matricule:myMatric})
            const matricule = !matricAll? myMatric:matric(nom)
            const userStudent = await student.create({
                nom: nom,
                logo:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                matricule:matricule ,
                email:email,
                password: await bcryptPass(password),
                ...body
            })
            res.status(200).json({
                    status: true,
                    message: "Inscription effectuée"
                })  
        } catch (e) {
            // if(e instanceof MongooseError) throw Error(`Error: ${e.message}`)
            return res.status(500).json({ status: false, message: e.message });
        }
    }
    
    static async getStudent(req, res){
        let {id} = req.params
        try {
           let user =  await student.findById(id)
           if(user){
                res.status(200).json({
                    status: true,
                    message:{ ...user.toObject(), password: undefined}
                })
           }
        } catch (e) {
            if(e instanceof MongooseError) throw new Error("Erreur: ", "Error mongoose")
            res.status(500).json({
                status: false,
                message: e.message
        })
        }
    }
    static async editStudent(req, res){
        let {logo, password, ...body} = req.body;
        let {id} = req.params;
        let auth = req.user;

       try {
            let studentUser = await student.findById(id);
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
                message: e.message
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
            await student.deleteOne({_id: id});
            res.status(201)
            .json({
                status: true,
                message: "Compte supprimé !!"
            })
            
        } catch (e) {
            if(e instanceof MongooseError) throw new Error("Erreur: ",e.message)
            res.status(500)
            .json({
                status: true,
                message: `Erreur: ${e.message}`
            });
        }
    }
    static async loginStudent(req,res){
        console.log(req.body)
        const {email, password} = req.body;
        console.log(email)
        try {
            let studentUser = await student.findOne({email})
            if(studentUser && ( await comparePass(password,studentUser.password))){
                res.cookie('token', generateJWT(studentUser.toObject()))
                return res.status(200)
                        .json({
                            status:true,
                            
                            message: "Connexion encours"
                        })
            }
            else{
                res.status(401).json({ status: false, message: 'identifiant invalide' });
            }
            
            
        } catch (e) {
            // if(e instanceof MongooseError) throw new Error("Erreur:",e.message)
            res.status(500)
            .json({
                status: false,
                message: e.message
            })
        }
    }
}
export default Student