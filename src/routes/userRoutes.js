const express = require("express");
const router = express.Router();

const {
 createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

router.post("/create", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
