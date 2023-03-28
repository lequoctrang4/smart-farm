import pool from "../configs/connectDB";
let getUserByPhone = async (phone_number) => {
    let [result] = await pool.execute(`select * from user where phone_number = ?`, [phone_number]);
    return result;
};

let getUserById = async (id) => {
    let [result] = await pool.execute(`select * from user where id = ?`, [id]);
    return result;
};
let createUser = async (phone, password, email, name) => {
    try {
        await pool.execute(`insert into user (name, bdate, gender, phone_number, email, password, register_at, isAdmin) 
        VALUES (?,NULL,'Khác',?,?,?,CURRENT_DATE,0)`, [name, phone, email, password ]);
        return "success";
    } catch (error) {
        return error;
    }
}
let setAvatar = async (avatar, id) =>{
    try {
        await pool.execute(`update user SET avatar =? where id = ?`, [avatar, id]);
        return "success";
    } catch (error) {
        return error;
    }
};
let editProfile = async (name, bdate, gender, phone_number, email, id) =>{
    try {
        await pool.execute(`update user set name = ?, bdate =?, gender = ?, phone_number = ?, email =? where id = ?`,
            [name, bdate, gender, phone_number, email, id]);
        return "success";
    } catch (error) {
        return error;
    }
};
let changePassword = async (password, id) => {
    try {
        await pool.execute(`update user set password = ? where id = ?`,[password, id]);
        return "success";
    } catch (error) {
        return error;
    }
};
module.exports ={
    getUserByPhone, createUser, setAvatar, getUserById, editProfile, changePassword
}