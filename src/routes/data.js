import  express  from "express";
import path from 'path';
import dataController from '../controller/dataController'
import multer from 'multer';
import appRoot from "app-root-path";
import {checkAuthMiddleware} from "../utils/auth";

let router = express.Router();



const initDeviceRoute = (app) =>{
    router.use(checkAuthMiddleware);
    router.get('/getControlsEquipByFarm', deviceController.getControlsEquipByFarm);
    return app.use('/data', router);
}

export default initDeviceRoute;
