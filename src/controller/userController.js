import userModel from '../models/userModel';
import validation from '../utils/validation';
const { hash, compare } = require('bcryptjs');
import { createJSONToken} from '../utils/auth';
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
        if (!compare(UserName[0].password, password))
            return res.status(422).json({message: "Nhập sai mật khẩu! Vui lòng nhập lại!"})
    }
    if(Object.keys(errors).length > 0){
        return res.status(400).json(errors);
    }
    const token = createJSONToken(phone);
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
let getProfile = async (req, res) => {
    // console.log(req.params)
    let result = await userModel.getUserByPhone(req.params.phone);
    return res.status(200).json({
        name: result[0].name,
        bdate: result[0].bdate,
        gender: result[0].gender,
        phone: result[0].phone_number,
        email: result[0].email
    });
};
module.exports = {
    login, signin, getProfile
}
