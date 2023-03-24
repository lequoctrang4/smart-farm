import userModel from '../models/userModel'
import validation from '../utils/validation'

let login = async (req, res) => {
    const data = req.body;
    let errors = {};
    let UserName;
    if(!validation.isValidText(req.body.username, 6))
        errors.username = 'Tên đăng nhập phải chứa ít nhất 6 ký tự!'
    else{
        UserName = await userModel.getUserName(data.username);
        if (Object.keys(UserName).length === 0)
            return res.status(404).json({message: "Tên đăng nhập không đúng!"})
    }
    if(!validation.isValidText(req.body.password, 6))
        errors.password = 'Mật khẩu phải chứa ít nhất 6 ký tự!'
    else{
        if (UserName[0].password !== data.password)
            return res.status(400).json({message: "Nhập sai mật khẩu! Vui lòng nhập lại!"})
    }
    if(Object.keys(errors).length > 0){
        return res.status(400).json(errors);
    }
    return res.status(200).json({message: "Đăng nhập thành công"});
};

module.exports = {
    login
}
