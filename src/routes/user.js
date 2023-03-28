import  express  from "express";
import path from 'path';
import userController from '../controller/userController';
import multer from 'multer';
import appRoot from "app-root-path";
import {checkAuthMiddleware, parseJwt} from "../utils/auth";
let router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/user");
    },
    filename: function (req, file, cb) {
        const authFragments = req.headers.authorization.split(' ');
        let {id} = parseJwt(authFragments[1]);
        cb(null, id + path.extname(file.originalname));
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
    router.post('/signin', userController.signin);
    router.post('/login', userController.login);
    router.post('/forgetPassword', userController.forgetPassword);
    router.use(checkAuthMiddleware);
    router.get('/getavatar', userController.getAvatar);
    router.patch('/setavatar', upload.single('image'), userController.setAvatar);
    router.get('/getProfile', userController.getProfile);
    router.patch('/editProfile', userController.editProfile);
    router.patch('/changePassword', userController.changePassword);
    return app.use('/user', router);
}

export default initUserRoute;
