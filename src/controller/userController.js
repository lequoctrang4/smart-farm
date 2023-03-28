import userModel from '../models/userModel';
import validation from '../utils/validation';
const fs = require('fs');
const {sendEmail} = require("../utils/mailer");
const { hash, compare } = require('bcryptjs');
import { createJSONToken, parseJwt} from '../utils/auth';
let UserName;
let login = async (req, res) => {
    const {phone, password} = req.body;
    let errors = {};
    if(!validation.isValidText(phone, 10))
        errors.phone = 'Định dạng số điện thoại không đúng!'
    else{
        UserName = await userModel.getUserByPhone(phone);
        if (Object.keys(UserName).length === 0)
            return res.status(404).json({message: "Số điện thoại không tồn tại!"})
    }
    if(!validation.isValidText(password, 6))
        errors.password = 'Mật khẩu phải chứa ít nhất 6 ký tự!'
    else{
        if (!await compare(password, UserName[0].password))
            return res.status(422).json({message: "Nhập sai mật khẩu! Vui lòng nhập lại!"})
    }
    if(Object.keys(errors).length > 0){
        return res.status(400).json(errors);
    }
    const token = createJSONToken(UserName[0].id,);
    return res.status(200).json({token});
};
let signin = async (req, res) => {
    const {phone, email, password, rePassword, name} = req.body;
    let errors = {};
    let UserName;
    if(!validation.isValidText(phone, 6))
        errors.username = 'Số điện thoại chỉ có đúng 10 kí tự'
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
        return res.status(422).json({message: "Nhập sai mật khẩu! Vui lòng nhập lại!"})
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
    const hashedPw = await hash(pass.toString(), 12);
    // console.log(pass);
    let rs = userModel.changePassword(hashedPw, user.id);
    sendEmail(email, "Reset password Smart Farm System", "View", "<h1>Pass của bạn là: 12345678</h1>");
    return res.status(200).json({
        message: "success"
    });
};
module.exports = {
    login, signin, getProfile, getAvatar, setAvatar, editProfile, changePassword,
    forgetPassword
}
