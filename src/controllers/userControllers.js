const User = require("../models/User");

// create User
const createUser = async (req, res) => {
  try {
    const { name, email, roleId, createdBy } = req.body;

    if (!name || !email || !roleId) {
      return res.status(400).json({
        succes: false,
        msg: "Name, Email & Role are required",
      });
    }

    const user = await User.create({
      name,
      email,
      role: roleId,
      createdBy,
    });

    return sendResponse(res, 201, "User created successfully", user);
  } catch (error) {
    res.status(500).json({  success: false,
      msg: "Internal Server Error", });
  }
};


// get all users 
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role", "name");

    if (!users || users.length === 0) {
      return sendResponse(res, 404, "No users found");
    }

    return res.status(200).json({
        succes:true,
        msg : "Users fetched successfully",
        data: users
    })
  } catch (err) {
res.status(500).json({  success: false,
      msg: "Internal Server Error",});  }
};


// get user by id
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("role", "name");

    if (!user) {
      return res.status(404).json({
        succes: false,
        msg: "User not found",
      });
    }

    return res.status(200).json({
      succes: true,
      msg: "User fetched successfully",
      data: user,
    });

  } catch (error) {
    return res.status(500).json({  success: false,
      msg: "Internal Server Error",});
  }
};


// update user
const updateUser = async (req, res) => {
  try {
    const { name, email, roleId, updatedBy } = req.body;
    const { userId } = req.params;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        succes: false,
        msg: "User not found",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = roleId || user.role;
    user.updatedBy = updatedBy;

    await user.save();

    return res.status(200).json({
      succes: true,
      msg: "User updated successfully",
      data: user,
    });

  } catch (error) {
    return res.status(500).json({ success: false,
      msg: "Internal Server Error", });
  }
};


// delete user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        succes: false,
        msg: "User not found",
      });
    }

    return res.status(200).json({
      succes: true,
      msg: "User deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({ success: false,
      msg: "Internal Server Error",  });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
