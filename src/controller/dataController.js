
import dataModel from '../models/dataModel'
const getDataById = async (req, res) => {
    let result = await dataModel.getDataById(req.params.id);
    return res.status(200).json(result);
};
module.exports = {
  getDataById,
};
