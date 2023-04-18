import  express  from "express";
import path from 'path';
import deviceController from '../controller/deviceController'
import multer from 'multer';
import appRoot from "app-root-path";
import {checkAuthMiddleware} from "../utils/auth";

let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/device");
    },
    filename: function (req, file, cb) {
        cb(null, req.body.id + path.extname(file.originalname));
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
upload.any();


const initDeviceRoute = (app) =>{
    router.use(checkAuthMiddleware);
    router.get('/getControlEquipsByFarm/:id', deviceController.getControlEquipsByFarm);
    router.get('/getControlEquipById/:id', deviceController.getControlEquipById);
    router.post('/addControlEquip', upload.single('image'), deviceController.addControlEquip);
    router.patch('/editControlEquip/:id', upload.single('image'), deviceController.editControlEquip);
    router.delete('/deleteControlEquip/:id', deviceController.deleteControlEquip);
    router.patch('/setStatusControlEquip/:id/:status', deviceController.setStatusControlEquip);

    router.get("/getDataEquipsByFarm/:id", deviceController.getDataEquipsByFarm);
    router.get("/getDataEquipById/:id", deviceController.getDataEquipById);
    router.post('/addDataEquip', upload.single('image'), deviceController.addDataEquip);
    router.patch('/editDataEquip/:id', upload.single('image'), deviceController.editDataEquip);
    router.delete('/deleteDataEquip/:id', deviceController.deleteDataEquip);
    router.patch('/setAutoDataEquip/:id/:auto', deviceController.setAutoDataEquip);
    
    return app.use('/device', router);
}

export default initDeviceRoute;
