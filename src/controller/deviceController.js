import deviceModel from '../models/deviceModel'
let getAllControlEquip = async (req, res) =>{
    let result = await deviceModel.getAllControlEquip();
    return res.status(200).json({
        data: result
    });
};

let addControlEquip = async (req, res) =>{
    let result = await deviceModel.addControlEquip(req.body);
    if (result === true) return res.status(200).json({
            data: "success"
        });
    return res.status(400).json({result})
};

let editControlEquip = async (req, res) =>{
    let id = req.params.id;
    let body = req.body;
    let result = await deviceModel.editControlEquip([id, body]);
    return res.status(200).json({
        data: "success"
    });
};

let deleteControlEquip = async (req, res) =>{
    let rs = await deviceModel.deleteControlEquip(req.params.id);
    if(rs === true)
        return res.status(200).json({
            data: "success"
        });
    else return res.status(400).json({
        data: rs
    })
};

let getAllDataEquip = async (req, res) =>{
    return res.status(200).json({
        data: "success"
    });
};

let addDataEquip = async (req, res) =>{
    return res.status(200).json({
        data: "success"
    });
};

let editDataEquip = async (req, res) =>{
    return res.status(200).json({
        data: "success"
    });
};

let deleteDataEquip = async (req, res) =>{
    return res.status(200).json({
        data: "success"
    });
};

module.exports = {
    getAllControlEquip, addControlEquip, editControlEquip, deleteControlEquip,
    getAllDataEquip, addDataEquip, editDataEquip, deleteDataEquip
}


