import  express  from "express";
import dataController from '../controller/dataController'
import {checkAuthMiddleware} from "../utils/auth";

let router = express.Router();
const initDataRoute = (app) =>{
    router.use(checkAuthMiddleware);
    router.get("/get/:id", dataController.getDataById);

    return app.use('/data', router);
}

export default initDataRoute;
