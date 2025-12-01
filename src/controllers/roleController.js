const Role = require('../models/Role');

// Create Role
const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        msg: "Role name is required",
      });
    }

    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({
        success: false,
        msg: "Role already exists",
      });
    }

    const role = await Role.create({ name, description });

    return res.status(201).json({
      success: true,
      msg: "Role created successfully",
      data: role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

// Get all roles
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();

    if (!roles || roles.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No roles found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Roles fetched successfully",
      data: roles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

module.exports = { createRole, getRoles };
