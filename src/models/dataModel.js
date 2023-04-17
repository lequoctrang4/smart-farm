import pool from "../configs/connectDB";

const getDataById = async (id) => {
  let [rs] = await pool.execute(`select * from data where id = ?`, [id]);
  return rs;
};

const addData = async (id, value) => {
  try {
    await pool.execute(`Insert into data VALUES (?, CURRENT_TIME, ?)`, [
      id,
      value,
    ]);
    return true;
  } catch (error) {
    return error;
  }
};

module.exports = {
  addData,
  getDataById,
};
