import pool from "../configs/connectDB";
let getUserName = async (userName) => {
    let [result] = await pool.execute(`select * from user where username = ?`, [userName]);
    return result;
};
module.exports ={
    getUserName
}