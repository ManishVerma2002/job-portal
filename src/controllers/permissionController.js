const Permission = require("../models/Permission");

// CREATE PERMISSION
const createPermission = async (req, res) => {
  try {
    const { name, description } = req.body;

    const exists = await Permission.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Permission already exists" });
    }

    const permission = await Permission.create({ name, description });

    res.status(201).json({
      success: true,
      message: "Permission created successfully",
      data: permission,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// GET ALL PERMISSIONS
const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Permissions fetched successfully",
      Permission: permissions.length,
      data: permissions,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// GET PERMISSION BY ID
const getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.status(200).json({
      success: true,
      message: "Permission fetched successfully",
      data: permission,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// UPDATE PERMISSION
const updatePermission = async (req, res) => {
  try {
    const { name, description } = req.body;

    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.status(200).json({
      success: true,
      message: "Permission updated successfully",
      data: permission,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// DELETE PERMISSION

const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.status(200).json({
      success: true,
      message: "Permission deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission
};
