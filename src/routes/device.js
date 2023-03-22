import  express  from "express";
import path from 'path';
import deviceController from '../controller/deviceController'
import multer from 'multer';
import appRoot from "app-root-path";
let router = express.Router();




const initDeviceRoute = (app) =>{
    router.get('/getAllControlEquip', deviceController.getAllControlEquip);
    router.post('/addControlEquip', deviceController.addControlEquip);
    router.put('/editControlEquip/:id', deviceController.editControlEquip);
    router.delete('/deleteControlEquip/:id', deviceController.deleteControlEquip);

    router.get('/getAllDataEquip', deviceController.getAllDataEquip);
    router.post('/addDataEquip', deviceController.addDataEquip);
    router.put('/editDataEquip/:id', deviceController.editDataEquip);
    router.delete('/deleteDataEquip/:id', deviceController.deleteDataEquip);
    
    return app.use('/device', router);
}

export default initDeviceRoute;
