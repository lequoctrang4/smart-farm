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

let addControlEquip = async (id, name, farm_id, filename) =>{
    try {
        await pool.execute(
          `INSERT INTO control_equipment(id, name, image, farm_id) VALUES (?,?,?,?)`,
          [id, name, filename, farm_id]
        );
        return true;
    } catch (error) {
        return 'Thêm thiết bị thất bại';
    }
};

let editControlEquip = async (id, name, farm_id, image, old_id) =>{
    try {
        await pool.execute(
          `UPDATE control_equipment SET id = ?, name =?, farm_id =? ,image = ? where id = ?`,
          [id, name, farm_id, image, old_id]
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
let setAutoDataEquip = async (auto, id) => {
  try {
    await pool.execute(`UPDATE data_equipment SET auto = ? WHERE id = ?`, [
      auto,
      id,
    ]);
    return true;
  } catch (error) {
    return error.sqlMessage;
  }
};
let getDataEquip = async () => {
    let [rs] = await pool.execute(
      `select * from data_equipment`,
    );
    return rs;
};
let getDataEquipsByFarm = async (id) => {
  let [rs] = await pool.execute(`select * from data_equipment where farm_id =?`, [id]);
  return rs;
};
let getDataEquipById = async (id) => {
  let [rs] = await pool.execute(`select * from data_equipment where id = ?`, [id]);
  return rs;
};
let addDataEquip = async (id, name, min, min_action, max, max_action, farm_id, image) =>{
    try {
        if (!min_action) min_action = null;
        if (!max_action) max_action = null;
        await pool.execute(
          `INSERT INTO data_equipment(id, name, min, min_action, max, max_action, image, farm_id) VALUES (?,?,?,?,?,?,?,?)`,
          [id, name, min, min_action, max, max_action, image, farm_id]
        );
        return true;
    } catch (error) {
        return error.sqlMessage;
    }
};

let editDataEquip = async (id, name, min, min_action,  max, max_action, farm_id, image, old_id) =>{
    try {
        if (!min_action) min_action = null;
        if (!max_action) max_action = null;
        await pool.execute(`UPDATE data_equipment SET id = ?, name = ?, min = ?, min_action = ?, max = ?, max_action = ?, image = ?, farm_id =? where id = ?`,
         [id, name, min, min_action, max, max_action, image, farm_id, old_id]);
        return true;
    } catch (error) {
        return error;
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
let setCondition = async (id, min, max) => {
  try {
    await pool.execute(
      `UPDATE data_equipment SET min = ?, max =? where id = ?`,
      [min, max, id]
    );
    return true;
  } catch (error) {
    return false;
  }
};
module.exports = {
  getControlEquipsByFarm,
  getControlEquipById,
  addControlEquip,
  editControlEquip,
  deleteControlEquip,
  setStatusControlEquip,
  setAutoDataEquip,
  getDataEquipsByFarm,
  addDataEquip,
  editDataEquip,
  deleteDataEquip,
  getDataEquipById,
  getDataEquip,
  setCondition,
};