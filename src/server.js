import express from 'express';
import configViewEngine from './configs/viewEngine';
import initDeviceRoute from './routes/device';
import initUserRoute from './routes/user';
import initDataRoute from "./routes/data";

import { addDataIndatabase } from "./api/adafruitApi";
//có thể chuyển dữ liệu ở port khác
import cors from 'cors';
require('dotenv').config()


const app = express()
const port = process.env.PORT || 3001; //Nếu phía trước bị undifined thì gánư

addDataIndatabase();

app.use(cors());



//Middleware
app.use((req, res, next) =>{
  //chạy tiếp middleware tiếp theo
  next();
})

//Viết vào file log
// app.use(morgan('combined'));


//Bắt buộc phải có cái này để có thể lấy dữ liệu của người dùng: chuyển dữ liệu sang dạng JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//set up view engine
configViewEngine(app);

//init web route
initDeviceRoute(app);
initUserRoute(app);
initDataRoute(app);


//image
//handle 404 not found
app.use((req, res) => {
  // return res.render('test/404.ejs');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})