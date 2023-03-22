import pool from '../configs/connectDB'
import multer from 'multer';

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render('test/index.ejs', {dataUser: rows, text: '123'});
};
let getDetailPage = async(req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute(`select * from users where id = ?`, [userId])
  return res.send(JSON.stringify(user));
};
let createNewUser = async(req, res) => {
  let {id, fname, lname, email, address} = req.body;
  await pool.execute(`insert into users (id, fname, lname, email, address) values (?,?,?,?,?)`, [id, fname, lname, email, address]);
  return res.redirect('/')
};

let getEditPage = async (req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute(`select * from users where id = ?`, [userId]);
  return res.render('test/update.ejs', {dataUser: user[0]});
  // return res.send(JSON.stringify(user));

  // const [rows, fields] = await pool.execute('SELECT * FROM `users`');
  // return res.render('test/index.ejs', {dataUser: rows, text: '123'});
};

let postUpdateUser = async (req, res) => {
  let {id, fname, lname, email, address} = req.body;
  await pool.execute(`update users SET fname = ?, lname = ?, email = ?, address = ? WHERE id = ?`, [fname, lname, email, address, id]);
  return res.redirect('/');
};

let deleteUser = async (req, res) => {
  let id = req.body.userId;
  await pool.execute(`DELETE FROM users WHERE id = ?`, [id]);
  return res.redirect('/');
};
//------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------


let uploadFile = async (req, res) =>{
  return res.render('test/uploadFile.ejs');
};


let handleUploadFile = async (req, res) =>{
  if(req.fileValidationError)
    return res.send(req.fileValidationError);
  else if(!req.file)
    return res.send('Please select an image to upload');
  res.send(`You have uploaded this image: <hr/><img src ="image/${req.file.filename}" width="500"/><hr/><a href="/upload"> Upload another image</a>`);
};
//Up nhieuf file

const uploadMultipleFile = async (req, res, next) =>{
    if(req.fileValidationError)
      return res.send(req.fileValidationError);
    else if(!req.files.length)
      return res.send('Please select an image to upload');
    let rs = "You have uploaded  these images: <hr/>";
    const files = req.files;
    for (let index = 0; index < files.length; index++){
      rs += `<img src ="/image/${files[index].filename}" width="300" style="margin-right: 20px;"/>`
    }
    rs += '<hr/> <a href="/upload">Up load more images</a>';
    res.send(rs);
};


module.exports = {getHomePage, getDetailPage, createNewUser, getEditPage, deleteUser, postUpdateUser, uploadFile, handleUploadFile, uploadMultipleFile}
