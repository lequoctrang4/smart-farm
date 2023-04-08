import deviceModel from '../models/deviceModel'
import { SetStatus } from '../api/adafruitApi';
let getControlEquipsByFarm = async (req, res) => {
  let result = await deviceModel.getControlEquipsByFarm(req.params.id);
  return res.status(200).json({
    data: result,
  });
};

let getControlEquipById = async (req, res) => {
  let result = await deviceModel.getControlEquipById(req.params.id);
  return res.status(200).json({
    data: result,
  });
};

let addControlEquip = async (req, res) =>{
    if (req.fileValidationError)
      return res.status(400).json({ message: req.fileValidationError });
    else if (!req.file)
      return res.status(400).json({ message: "No files selected" });
    let { id, name, feed_name, farm_id } = req.body;
    let result = await deviceModel.addControlEquip(id, name, feed_name, farm_id, req.file.filename);
    if (result === true) return res.status(200).json({
            message: "Thêm thiết bị thành công!"
        });
    return res.status(400).json({message:result})
};

let editControlEquip = async (req, res) =>{
    if (req.fileValidationError)
      return res.status(400).json({ message: req.fileValidationError });
    else if (!req.file)
      return res.status(400).json({ message: "No files selected" });
    let old_id = req.params.id;
    let { id, name, feed_name, farm_id } = req.body;
    let result = await deviceModel.editControlEquip(id, name, feed_name, farm_id, req.file.filename, old_id);
    if (result === true)
        return res.status(200).json({
            message: "Sửa thiết bị thành công"
        });
    return res.status(400).json({
        message: result
    });
};

let deleteControlEquip = async (req, res) =>{
    let rs = await deviceModel.deleteControlEquip(req.params.id);
    if(rs === true)
        return res.status(200).json({
            message: "Xóa thiết bị thành công!"
        });
    else return res.status(400).json({
        message: rs
    })
};

let setStatusControlEquip = async (req, res) => {
    let {id, status} = req.params;
    if (!(status === "OFF" || status === "ON")){
        return res.status(400).json({
          message: "Only status: ON or OFF is allowed!",
        });
    }
    // let equip = await deviceModel.getControlEquipById(id);
    await deviceModel.setStatusControlEquip(id, status);
    return res.status(200).json({
        message: "success"
    })
}
let setAutoControlEquip = async (req, res) => {
    let {id, auto} = req.params;
    if (!(auto === "OFF" || auto === "ON")) {
      return res.status(400).json({
        message: "Only auto: ON or OFF is allowed!",
      });
    }
    let rs = await deviceModel.setAutoControlEquip(auto, id);
    if (rs) return res.status(200).json({
        message: "success"
    })
    else return res.status(400).json({
        message: rs
    })
}
let getDataEquipsByFarm = async (req, res) => {
  let result = await deviceModel.getDataEquipsByFarm(req.params.id);
  return res.status(200).json({
    data: result
  });
};
let getDataEquipById = async (req, res) => {
  let result = await deviceModel.getDataEquipById(req.params.id);
  return res.status(200).json({
    data: result,
  });
};

let addDataEquip = async (req, res) =>{
    if (req.fileValidationError)
      return res.status(400).json({ message: req.fileValidationError });
    else if (!req.file)
      return res.status(400).json({ message: "No files selected" });
    let {id, name, feed_name, min, max, time, farm_id} = req.body;
    let image = req.file.filename;
    let result = await deviceModel.addDataEquip(id, name, feed_name, min, max, time, farm_id, image);
    if (result === true) return res.status(200).json({
            message: "success"
    });
    return res.status(400).json({ message: result})
};

let editDataEquip = async (req, res) =>{
    if (req.fileValidationError)
      return res.status(400).json({ message: req.fileValidationError });
    else if (!req.file)
      return res.status(400).json({ message: "No files selected" });
    let old_id = req.params.id;
    let {id, name, feed_name, min, max, time, farm_id} = req.body;
    let image = req.file.filename;
    let result = await deviceModel.editDataEquip(id, name, feed_name, min, max, time, farm_id, image, old_id);
    if (result === true)
    return res.status(200).json({
        message: "success"
    });
    return res.status(400).json({
        message: result
    });
};

let deleteDataEquip = async (req, res) =>{
    let rs = await deviceModel.deleteDataEquip(req.params.id);
    if(rs === true)
        return res.status(200).json({
            message: "success"
        });
    else return res.status(400).json({
        message: rs
    })
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
  getDataEquipById,
  addDataEquip,
  editDataEquip,
  deleteDataEquip,
};


