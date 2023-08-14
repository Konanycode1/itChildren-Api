import { Schema, model } from "mongoose";

const ShemaStudent = Schema({
    nom: {type: String, requered: true},
    prenom: {type: String, required: true},
    age: {type: String, required: true},
    matricule:  {type: String, required: true},
    point: {type: Number}
})

export default model("Student", ShemaStudent)