import pool from "../configs/connectDB";

let getAllCustomer = async (req, res) =>{
    let [user] = await pool.execute(`select * from user `);
    return res.status(200).json(
        user
    );
}
let getCustomer = async (req, res) =>{

} 
let findCustomer = async (req, res) =>{

} 

let addCustomer = async (req, res) =>{

} 
let removeCustomer = async (req, res) =>{

} 

let editCustomer = async (req, res) =>{

} 
module.exports= {
    getAllCustomer,
    getCustomer,
    findCustomer,
    addCustomer,
    removeCustomer,
    editCustomer
}