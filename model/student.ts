import { Schema, model } from "mongoose";

export type IUser = {
    nom: string,
    prenom: string,
    dateNaissance: string,
    email:string,
    numero:string,
    numeroParent: string,
    logo: string,
    matricule: string,
    password: string,
    point: string,
    role: string,
    rang: number,
    projet: object
}

const ShemaStudent = new Schema({
    nom: { type: String, requered: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: String, required: true },
    email: { type: String, required: true },
    numero: { type: String, default: "000 000 000 0" },
    numeroParent: { type: String, required: true },
    logo: { type: String, required: true },
    matricule: { type: String, required: true },
    password: { type: String, required: true, minLength: 6 },
    point: { type: Number, default: 0 },
    role: { type: String, default: "student" },
    rang: { type: Number, default: 0 },
    projet: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "projet"
            }
        ],
        default: []
    }
})
 
export default model("Student", ShemaStudent)