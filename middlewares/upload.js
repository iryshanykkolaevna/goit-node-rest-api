import multer from 'multer';
import * as path from "node:path";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("tmp"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

export default upload;