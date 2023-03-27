import pool from "../configs/connectDB";
let getUserByPhone = async (phone_number) => {
    let [result] = await pool.execute(`select * from user where phone_number = ?`, [phone_number]);
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
module.exports ={
    getUserByPhone, createUser
}