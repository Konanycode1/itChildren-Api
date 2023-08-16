import { Schema, model } from "mongoose";

const ShemaStudent = Schema({
    nom: {type: String, requered: true},
    prenom: {type: String, required: true},
    dateNaissance: {type: Date, required: true},
    email: {type: String, required: true},
    numero: {type:String, default: "000 000 000 0"},
    numeroParent: {type:String, required: true},
    logo: {type: String, required: true},
    matricule:  {type: String, required: true},
    point: {type: Number, default: 0},
    role : { type:String, default: "student"},
    rang: {type: Number, default: 0},
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