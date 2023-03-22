
let getAllControlEquip = async (req, res) =>{
    
    return res.status(200).json({
        data: "success"
    });
};

let addControlEquip = async (req, res) =>{
    return res.status(200).json({
        data: "success"
    });
};

let editControlEquip = async (req, res) =>{
    return res.status(200).json({
        data: "success"
    });
};

let deleteControlEquip = async (req, res) =>{
    return res.status(200).json({
        data: "success",
        d: req.params.id
    });
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


