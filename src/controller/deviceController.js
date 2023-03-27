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
            message: "success"
        });
    return res.status(400).json({result})
};

let editControlEquip = async (req, res) =>{
    let id = req.params.id;
    let body = req.body;
    let result = await deviceModel.editControlEquip([id, body]);
    if (result === true)
    return res.status(200).json({
        message: "success"
    });
    return res.status(400).json({
        message: result
    });
};

let deleteControlEquip = async (req, res) =>{
    let rs = await deviceModel.deleteControlEquip(req.params.id);
    if(rs === true)
        return res.status(200).json({
            message: "success"
        });
    else return res.status(400).json({
        message: rs
    })
};

let setStatusControlEquip = async (req, res) => {
    let id = req.params.id;
    let status = req.params.status;
    let rs = await deviceModel.setStatusControlEquip([status, id]);
    if (rs) return res.status(200).json({
        message: "success"
    })
    else return res.status(400).json({
        message: rs
    })
}
let setAutoControlEquip = async (req, res) => {
    let id = req.params.id;
    let auto = req.params.auto;
    let rs = await deviceModel.setAutoControlEquip([auto, id]);
    if (rs) return res.status(200).json({
        message: "success"
    })
    else return res.status(400).json({
        message: rs
    })
}
let getAllDataEquip = async (req, res) =>{
    let result = await deviceModel.getAllDataEquip();
    return res.status(200).json({
        data: result
    });
};

let addDataEquip = async (req, res) =>{
    let result = await deviceModel.addDataEquip(req.body);
    if (result === true) return res.status(200).json({
            message: "success"
        });
    return res.status(400).json({ message: result})
};

let editDataEquip = async (req, res) =>{
    let id = req.params.id;
    let body = req.body;
    let result = await deviceModel.editDataEquip([id, body]);
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
let setStatusDataEquip = async (req, res) => {
    let id = req.params.id;
    let status = req.params.status;
    let rs = await deviceModel.setStatusDataEquip([status, id]);
    if (rs) return res.status(200).json({
        message: "success"
    })
    else return res.status(400).json({
        message: rs
    })
}
module.exports = {
    getAllControlEquip, addControlEquip, editControlEquip, deleteControlEquip, setStatusControlEquip, setAutoControlEquip,
    getAllDataEquip, addDataEquip, editDataEquip, deleteDataEquip, setStatusDataEquip
}


