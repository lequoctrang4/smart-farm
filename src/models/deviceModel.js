import pool from '../configs/connectDB'

let getAllControlEquip = async () =>{
    let [rs] = await pool.execute(`select * from control_equipment`);
    return rs;
};

let addControlEquip = async (page) =>{
    try {
        let {id, name, position,type, farm_id} = page;
        await pool.execute(`INSERT INTO control_equipment(id, name, postition, type, farm_id) VALUES (?,?,?,?,?)`,
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


let getAllDataEquip = async () =>{
    
};

let addDataEquip = async () =>{
    
};

let editDataEquip = async () =>{
    
};

let deleteDataEquip = async () =>{

};

module.exports = {
    getAllControlEquip, addControlEquip, editControlEquip, deleteControlEquip,
    getAllDataEquip, addDataEquip, editDataEquip, deleteDataEquip
}