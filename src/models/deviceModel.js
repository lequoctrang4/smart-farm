import pool from '../configs/connectDB'

let getControlEquipsByFarm = async (id) => {
  let [rs] = await pool.execute(
    `select * from control_equipment where farm_id = ?`,
    [id]
  );
  return rs;
};
let getControlEquipById = async (id) => {
  let [rs] = await pool.execute(`select * from control_equipment where id = ?`, [id]);
  return rs;
};

let addControlEquip = async (id, name, feed_name, farm_id, filename) =>{
    try {
        await pool.execute(
          `INSERT INTO control_equipment(id, name, feed_name, image, farm_id) VALUES (?,?,?,?,?)`,
          [id, name, feed_name, filename, farm_id]
        );
        return true;
    } catch (error) {
        return 'Thêm thiết bị thất bại';
    }
};

let editControlEquip = async (id, name, feed_name, farm_id, image, old_id) =>{
    try {
        await pool.execute(
          `UPDATE control_equipment SET id = ?, name =?, feed_name = ?, farm_id =? ,image = ? where id = ?`,
          [id, name, feed_name, farm_id, image, old_id]
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
let setStatusControlEquip = async (id, status) =>{
    try {
        await pool.execute(`UPDATE control_equipment SET status = ? WHERE id = ?`, [status, id]);
        return true;
    } catch (error) {
        return error.sqlMessage;
    }
};
let setAutoControlEquip = async (auto, id) =>{
    try {
        await pool.execute(`UPDATE control_equipment SET auto = ? WHERE id = ?`, [auto, id]);
        return true;
    } catch (error) {
        return error.sqlMessage;
    }
};

let getDataEquipsByFarm = async (id) => {
  let [rs] = await pool.execute(`select * from data_equipment where farm_id =?`, [id]);
  return rs;
};
let getDataEquipById = async (id) => {
  let [rs] = await pool.execute(`select * from data_equipment where id = ?`, [id]);
  return rs;
};
let addDataEquip = async (id, name, feed_name, min, max, time, farm_id, image) =>{
    try {
        await pool.execute(
          `INSERT INTO data_equipment(id, name, feed_name, min, max, time, image, farm_id) VALUES (?,?,?,?,?,?,?,?)`,
          [id, name, feed_name, min, max, time, image, farm_id]
        );
        return true;
    } catch (error) {
        return error.sqlMessage;
    }
};

let editDataEquip = async (id, name, feed_name, min, max, time, farm_id, image, old_id) =>{
    try {
        await pool.execute(`UPDATE data_equipment SET id = ?, name =?, feed_name = ?, min =?, max = ?, time =?, image = ?, farm_id =? where id = ?`,
         [id, name, feed_name, min, max, time, image, farm_id, old_id]);
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

module.exports = {
  getControlEquipsByFarm,
  getControlEquipById,
  addControlEquip,
  editControlEquip,
  deleteControlEquip,
  setStatusControlEquip,
  setAutoControlEquip,
  getDataEquipsByFarm,
  addDataEquip,
  editDataEquip,
  deleteDataEquip,
  getDataEquipById,
};