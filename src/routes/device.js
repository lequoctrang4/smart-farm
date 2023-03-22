import  express  from "express";
import path from 'path';
import deviceController from '../controller/deviceController'
import multer from 'multer';
import appRoot from "app-root-path";
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
upload.any();


const initDeviceRoute = (app) =>{
    router.get('/getAllControlEquip', deviceController.getAllControlEquip);
    router.post('/addControlEquip', upload.any(), deviceController.addControlEquip);
    router.put('/editControlEquip/:id', upload.any(), deviceController.editControlEquip);
    router.delete('/deleteControlEquip/:id', deviceController.deleteControlEquip);
    router.put('/setStatusControlEquip/:id/:status', upload.any(), deviceController.setStatusControlEquip);
    router.put('/setAutoControlEquip/:id/:auto', upload.any(), deviceController.setAutoControlEquip);

    router.get('/getAllDataEquip', deviceController.getAllDataEquip);
    router.post('/addDataEquip', upload.any(), deviceController.addDataEquip);
    router.put('/editDataEquip/:id', upload.any(),deviceController.editDataEquip);
    router.delete('/deleteDataEquip/:id', deviceController.deleteDataEquip);
    router.put('/setStatusDataEquip/:id/:status', upload.any(), deviceController.setStatusDataEquip);
    
    return app.use('/device', router);
}

export default initDeviceRoute;
