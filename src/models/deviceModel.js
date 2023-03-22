import pool from '../configs/connectDB'

let getAllControlEquip = async () =>{
    let [rs] = await pool.execute(`select * from control_equipment`);
    return rs;
};

let addControlEquip = async (page) =>{
    try {
        let {id, name, position,type, farm_id} = page;
        await pool.execute(`INSERT INTO control_equipment(id, name, position, type, farm_id) VALUES (?,?,?,?,?)`,
        [id, name, position, type, farm_id]);
        return true;
    } catch (error) {
        return error.sqlMessage;
    }
};

let editControlEquip = async (page) =>{
    try {
        let {id, name, position, type, farm_id} = page[1];
        await pool.execute(`UPDATE control_equipment SET id = ?, name =?, position = ?, type =?, farm_id =? where id = ?` , [id, name, position, type, farm_id, page[0]])
        return true;
    } catch (error) {
        return error.sqlMessage;
    }
};

let deleteControlEquip = async (page) =>{
    try {
        await pool.execute(`DELETE FROM control_equipment WHERE id = ?`, [page]);
        return true;
    } catch (error) {
        return error.sqlMessage;
    }
};
let setStatusControlEquip = async (page) =>{
    try {
        await pool.execute(`UPDATE control_equipment SET status = ? WHERE id = ?`, [page[0], page[1]]);
        return true;
    } catch (error) {
        return error.sqlMessage;
    }
};
let setAutoControlEquip = async (page) =>{
    try {
        await pool.execute(`UPDATE control_equipment SET auto = ? WHERE id = ?`, [page[0], page[1]]);
        return true;
    } catch (error) {
        return error.sqlMessage;
    }
};

let getAllDataEquip = async () =>{
    let [rs] = await pool.execute(`select * from data_equipment`);
    return rs;
};

let addDataEquip = async (page) =>{
    try {
        let {id, name, position, min, max, time, type, farm_id} = page;
        await pool.execute(`INSERT INTO data_equipment(id, name, position, min, max, time, type, farm_id) VALUES (?,?,?,?,?,?,?,?)`,
        [id, name, position, min, max, time, type, farm_id]);
        return true;
    } catch (error) {
        return error.sqlMessage;
    }
};

let editDataEquip = async (page) =>{
    try {
        let {id, name, position, min, max, time, type, farm_id} = page[1];
        await pool.execute(`UPDATE data_equipment SET id = ?, name =?, position = ?, min =?, max = ?, time = ?, type =?, farm_id =? where id = ?`,
         [id, name, position, min, max, time, type, farm_id, page[0]])
        return true;
    } catch (error) {
        return error.sqlMessage;
    }
};

let deleteDataEquip = async (page) =>{
    try {
        await pool.execute(`DELETE FROM data_equipment WHERE id = ?`, [page]);
        return true;
    } catch (error) {
        return error.sqlMessage;
    }
};
let setStatusDataEquip = async (page) =>{
    try {
        await pool.execute(`UPDATE data_equipment SET status = ? WHERE id = ?`, [page[0], page[1]]);
        return true;
    } catch (error) {
        return error.sqlMessage;
    }
};
module.exports = {
    getAllControlEquip, addControlEquip, editControlEquip, deleteControlEquip, setStatusControlEquip, setAutoControlEquip,
    getAllDataEquip, addDataEquip, editDataEquip, deleteDataEquip, setStatusDataEquip
}