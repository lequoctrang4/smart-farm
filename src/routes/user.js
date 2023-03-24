import  express  from "express";
import path from 'path';
import userController from '../controller/userController'
import multer from 'multer';
import appRoot from "app-root-path";
let router = express.Router();

const initUserRoute = (app) =>{
    router.post('/login', userController.login)
    return app.use('/user', router);
}

export default initUserRoute;
