import  express  from "express";
import path from 'path';
import deviceController from '../controller/deviceController'
import multer from 'multer';
import appRoot from "app-root-path";
import {checkAuthMiddleware} from "../utils/auth";

let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/device");//"/src/public/image/");
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
upload.any();


const initDeviceRoute = (app) =>{
    router.use(checkAuthMiddleware);
    router.get('/getControlsEquipByFarm/:id', deviceController.getControlsEquipByFarm);
    router.post('/addControlEquip', upload.single('image'), deviceController.addControlEquip);
    router.patch('/editControlEquip/:id', upload.single('image'), deviceController.editControlEquip);
    router.delete('/deleteControlEquip/:id', deviceController.deleteControlEquip);
    router.patch('/setStatusControlEquip/:id/:status', upload.any(), deviceController.setStatusControlEquip);
    router.patch('/setAutoControlEquip/:id/:auto', upload.any(), deviceController.setAutoControlEquip);

    router.get("/getDatasEquipByFarm/:id", deviceController.getDatasEquipByFarm);
    router.post('/addDataEquip', upload.single('image'), deviceController.addDataEquip);
    router.patch('/editDataEquip/:id', upload.single('image'), deviceController.editDataEquip);
    router.delete('/deleteDataEquip/:id', deviceController.deleteDataEquip);
    router.patch('/setStatusDataEquip/:id/:status', upload.any(), deviceController.setStatusDataEquip);
    
    return app.use('/device', router);
}

export default initDeviceRoute;
