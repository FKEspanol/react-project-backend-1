const router = require("express").Router();
const getAllUsers = require("../controllers/getAllUsersController");

router.get("/", getAllUsers);

module.exports = router;