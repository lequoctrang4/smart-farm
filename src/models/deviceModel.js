import pool from '../configs/connectDB'

let getControlsEquipByFarm = async (id) => {
  let [rs] = await pool.execute(`select * from control_equipment where farm_id = ?`, [id]);
  return rs;
};
let getControlsEquipById = async (id) => {
  let [rs] = await pool.execute(
    `select * from control_equipment where id = ?`,
    [id]
  );
  return rs;
};

let addControlEquip = async (page, filename) =>{
    try {
        let {id, name, feed_name, farm_id} = page;
        await pool.execute(
          `INSERT INTO control_equipment(id, name, feed_name, image, farm_id) VALUES (?,?,?,?,?)`,
          [id, name, feed_name, filename, farm_id]
        );
        return true;
    } catch (error) {
        return 'Thêm thiết bị thất bại';
    }
};

let editControlEquip = async (page) =>{
    try {
        let {id, name, feed_name, farm_id} = page[1];
        await pool.execute(
          `UPDATE control_equipment SET id = ?, name =?, feed_name = ?, farm_id =? where id = ?`,
          [id, name, feed_name, farm_id, page[0]]
        );
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

let getDatasEquipByFarm = async () => {
  let [rs] = await pool.execute(`select * from data_equipment`);
  return rs;
};

let addDataEquip = async (page, filename) =>{
    try {
        let { id, name, feed_name, min, max, time, farm_id } = page;
        await pool.execute(
          `INSERT INTO data_equipment(id, name, feed_name, min, max, time, farm_id) VALUES (?,?,?,?,?,?,?)`,
          [id, name, feed_name, min, max, time, farm_id]
        );
        return true;
    } catch (error) {
        return error.sqlMessage;
    }
};

let editDataEquip = async (page) =>{
    try {
        let {id, name, feed_name, min, max, time, farm_id} = page[1];
        await pool.execute(`UPDATE data_equipment SET id = ?, name =?, feed_name = ?, min =?, max = ?, time =?, farm_id =? where id = ?`,
         [id, name, feed_name, min, max, time, farm_id, page[0]])
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
  getControlsEquipByFarm,
  addControlEquip,
  editControlEquip,
  deleteControlEquip,
  setStatusControlEquip,
  setAutoControlEquip,
  getDatasEquipByFarm,
  addDataEquip,
  editDataEquip,
  deleteDataEquip,
  setStatusDataEquip,
  getControlsEquipById
};