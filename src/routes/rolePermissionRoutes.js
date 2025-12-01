
const express = require("express");
const router = express.Router();
const {
  assignPermission,
  getRolePermissions,
  removePermission,
  getRolePermissionById
} = require("../controllers/rolePermissionController");

// Assign a permission to a role
router.post("/assign", assignPermission);

// Get all permissions of a role
router.get("/:roleId", getRolePermissions);

// Remove a permission from a role
router.delete("/remove", removePermission);

// Get RolePermission by its ID
router.get("/id/:id", getRolePermissionById);

module.exports = router;
