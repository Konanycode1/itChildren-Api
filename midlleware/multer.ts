import multer from 'multer'
import express, {Express, Request, Response} from "express"

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}


const storage = multer.diskStorage({
    destination: (req: Request, file, callback)=>{
        callback(null, 'images');
    },
    filename: (req: Request,file, callback)=>{
        const name = file.originalname.split(' ').join('_').split("-").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null,`${name}${Date.now()}.${extension}`);
    }
});

export default multer({storage})

    
