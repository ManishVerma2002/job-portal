const RolePermission = require("../models/RolePermission");
const Role = require("../models/Role");
const Permission = require("../models/Permission");

const assignPermission = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;

    const role = await Role.findById(roleId);
    if (!role)
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });

    const permission = await Permission.findById(permissionId);
    if (!permission)
      return res
        .status(404)
        .json({ success: false, message: "Permission not found" });

    const alreadyExist = await RolePermission.findOne({
      role: roleId,
      permission: permissionId,
    });
    if (alreadyExist)
      return res.status(409).json({
        success: false,
        message: "Permission already assigned to this role",
      });

    const rolePermission = new RolePermission({
      role: roleId,
      permission: permissionId,
    });
    await rolePermission.save();

    return res.status(201).json({
      success: true,
      message: "Permission assigned successfully",
      data: rolePermission,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getRolePermissions = async (req, res) => {
  try {
    const { roleId } = req.params;
    const permissions = await RolePermission.find({ role: roleId }).populate(
      "permission"
    );

    if (!permissions || permissions.length === 0)
      return res.status(404).json({
        success: false,
        message: "No permissions found for this role",
      });

    return res.status(200).json({
      success: true,
      message: "Permissions fetched successfully",
      data: permissions,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const removePermission = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;

    const removed = await RolePermission.findOneAndDelete({
      role: roleId,
      permission: permissionId,
    });
    if (!removed)
      return res.status(404).json({
        success: false,
        message: "Permission was not assigned to this role",
      });

    return res
      .status(200)
      .json({ success: true, message: "Permission removed successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get RolePermission by its ID
const getRolePermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const rolePermission = await RolePermission.findById(id)
      .populate("role")
      .populate("permission");

    if (!rolePermission) {
      return res.status(404).json({
        success: false,
        message: "RolePermission not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: rolePermission,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  assignPermission,
  getRolePermissions,
  removePermission,
  getRolePermissionById,
};
