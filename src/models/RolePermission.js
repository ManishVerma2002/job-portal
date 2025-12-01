const mongoose = require("mongoose");

const rolePermissionSchema = new mongoose.Schema(
  {
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
    permission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
    },
  },
  { timestamps: true }
);

const RolePermission = mongoose.model("RolePermission", rolePermissionSchema);

module.exports = RolePermission;
