 
const express = require("express");
const router = express.Router();
const { createRole, getRoles } = require("../controllers/roleController");

// Routes
router.post("/", createRole);   
router.get("/", getRoles);      

module.exports = router;
