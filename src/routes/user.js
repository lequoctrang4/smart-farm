import  express  from "express";
import path from 'path';
import userController from '../controller/userController';
import multer from 'multer';
import appRoot from "app-root-path";
import {checkAuthMiddleware} from "../utils/auth";
let router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/../Frontend/src/img");//"/src/public/image/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initUserRoute = (app) =>{
    router.post('/login', upload.any(), userController.login);
    router.post('/signin', upload.any(), userController.signin);
    router.use(checkAuthMiddleware);
    router.get('/getProfile/:phone', userController.getProfile);
    return app.use('/user', router);
}

export default initUserRoute;
