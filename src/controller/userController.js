import userModel from '../models/userModel';
import validation from '../utils/validation';
const fs = require('fs');
const {sendEmail} = require("../utils/mailer");
const { hash, compare } = require('bcryptjs');
import { createJSONToken, parseJwt} from '../utils/auth';
let UserName;
let signIn = async (req, res) => {
    const {phone, password} = req.body;
    let errors = {};
    if(!validation.isValidPhone(phone))
        errors.phone = 'Định dạng số điện thoại không đúng!'
    else{
        UserName = await userModel.getUserByPhone(phone);
        if (Object.keys(UserName).length === 0)
            return res.status(404).json({message: "Số điện thoại không tồn tại!"})
    }
    if(!validation.isValidText(password, 6))
        errors.password = 'Mật khẩu phải chứa ít nhất 6 ký tự!'
    else{
        if (validation.isValidPhone(phone) && !await compare(password, UserName[0].password))
            return res.status(422).json({message: "Nhập sai mật khẩu! Vui lòng nhập lại!"})
    }
    if(Object.keys(errors).length > 0){
        return res.status(400).json(errors);
    }
    const token = createJSONToken(UserName[0].id,);
    return res.status(200).json({ user: UserName[0], token});
};
let signUp = async (req, res) => {
    const {phone, email, password, rePassword, name} = req.body;
    let errors = {};
    let UserName;
    if(!validation.isValidPhone(phone))
        errors.username = 'Số điện thoại không đúng';
    else{
        UserName = await userModel.getUserByPhone(phone);
        if (Object.keys(UserName).length === 1)
            return res.status(404).json({message: "Số điện thoại đã tồn tại!"})
    }
    if (!validation.isValidEmail(email))
        errors.email = 'Nhập sai định dạng email!';
    if (!validation.isValidText(name, 6))
        errors.email = 'Tên quá ngắn, vui lòng nhập đầy đủ!';
    if(!validation.isValidText(password, 6))
        errors.password = 'Mật khẩu phải chứa ít nhất 6 ký tự!'
    else{
        if (password !== rePassword)
        return res.status(400).json({message: "Mật khẩu xác nhận không đúng!"})
    }
    if(Object.keys(errors).length > 0){
        return res.status(400).json(errors);
    }
    const hashedPw = await hash(password, 12);
    let result = await userModel.createUser(phone, hashedPw, email, name);
    if(result !== 'success') return res.status(400).json({message: result});
    return res.status(200).json({message: "Đăng kí thành công"});
};


let getAvatar = async (req, res) => {
    const authFragments = req.headers.authorization.split(' ');
    let {id} = parseJwt(authFragments[1]);
    let person = await userModel.getUserById(id);
    let avatar = person[0].avatar;
    if (!avatar) return res.status(404).json({avatar: avatar});
    let type = avatar.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/);
    type = type[1];
    const contents =  fs.readFileSync('./src/public/image/user/' + avatar, {encoding: 'base64'});
    const buffedInput = contents.toString('base64');
    return res.status(200).json({
        avatar: 'data:image/' + type + ';base64,' + buffedInput
    });
};

let setAvatar = async (req, res) => {
    const authFragments = req.headers.authorization.split(' ');
    let {id} = parseJwt(authFragments[1]);
    if(req.fileValidationError)
      return res.status(400).json({message: req.fileValidationError});
    else if(!req.file)
      return res.status(400).json({message: "No files selected"});
    let file = req.file.filename;
    let result = await userModel.setAvatar(file, id);
    if (result !== "success")
        return res.status(400).json({message: result});
    return res.status(200).json({
        message: result
    });
};
let getProfile = async (req, res) => {
    const authFragments = req.headers.authorization.split(' ');
    let {id} = parseJwt(authFragments[1]);    
    let result = await userModel.getUserById(id);
    if (result.length === 0)
      return res.status(404).json({ message: "Invalid" });
    return res.status(200).json({
        name: result[0].name,
        bdate: result[0].bdate,
        gender: result[0].gender,
        phone: result[0].phone_number,
        email: result[0].email
    });
};
let editProfile = async (req, res) => {
    const authFragments = req.headers.authorization.split(' ');
    let {id} = parseJwt(authFragments[1]);
    let {name, bdate, gender, phone, email} = req.body;
    let errors = {};
    let User;
    if(!validation.isValidPhone(phone))
        errors.User = 'Số điện thoại không đúng!'
    else{
        User = await userModel.getUserByPhone(phone);
        if (Object.keys(User).length === 1 && phone !== User[0].phone_number)
          return res.status(404).json({ message: "Số điện thoại đã tồn tại!" });
    }
    if (!validation.isValidEmail(email))
        errors.email = 'Nhập sai định dạng email!';
    // else{
    //     User = await userModel.getUserByEmail(email);
    //     if (Object.keys(User).length === 1 && email !== User[0].email)
    //         return res.status(404).json({message: "Email đã tồn tại!"})
    // }
    if (!validation.isValidText(name, 6))
        errors.email = 'Tên quá ngắn, vui lòng nhập đầy đủ!';
    if(Object.keys(errors).length > 0){
        return res.status(400).json(errors);
    }
    let person = await userModel.editProfile(name, bdate, gender, phone, email, id);
    if (person !== "success")
        return res.status(400).json({message: person});
    return res.status(200).json({
        message: person
    });
};
let changePassword = async (req, res) => {
    const authFragments = req.headers.authorization.split(' ');
    let {id} = parseJwt(authFragments[1]);
    let User = await userModel.getUserById(id);
    let {oldPassword, newPassword, confirmPassword} = req.body;
    if (!validation.isValidText(newPassword, 6))
        return res.status(400).json({message: "Mật khẩu mới phải có ít nhất 6 kí tự!"});
    if (newPassword !== confirmPassword)
        return res.status(400).json({message: "Mật khẩu xác nhận không đúng!"});
    if (! await compare(oldPassword, User[0].password))
        return res.status(422).json({message: "Nhập sai mật khẩu cũ! Vui lòng nhập lại!"})
    if(oldPassword === newPassword){
        return res.status(400).json({message: "Mật khẩu mới phải khác mật khẩu cũ!"});
    }
    const hashedPw = await hash(newPassword, 12);
    let result = await userModel.changePassword(hashedPw,id);
    if (result !== "success")
        return res.status(400).json({message: result});
    return res.status(200).json({
        message: result
    });
};

let forgetPassword = async (req, res) =>{
    let {email, phone} = req.body;
    let users = await userModel.getUserByPhone(phone);
    if (Object.keys(users).length === 0)
        return res.status(404).json({
            message: 'Không tìm thấy người dùng'
        })
    let user = users[0];
    if (email !== user.email)
        return res.status(404).json({message: "Không tìm thấy người dùng"})
    let pass = Math.floor(Math.random() * 110000000000);
    const hashedPw = await hash(pass.toString() +"abv", 12);
    let rs = userModel.changePassword(hashedPw, user.id);
    sendEmail(email, "Reset password Smart Farm System", "View", "<h1>Pass của bạn là: "+ pass +"</h1>");
    return res.status(200).json({
        message: "success"
    });
};
module.exports = {
    signIn, signUp, getProfile, getAvatar, setAvatar, editProfile, changePassword,
    forgetPassword
}
