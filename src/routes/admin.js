import  express  from "express";
import path from 'path';
import adminController from '../controller/adminController'
import multer from 'multer';
import appRoot from "app-root-path";
let router = express.Router();
const initAdminRoute = (app) =>{
    return app.use('/admin', router);
}
export default initAdminRoute;
