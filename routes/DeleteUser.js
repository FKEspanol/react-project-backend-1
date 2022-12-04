const router = require("express").Router();
const deleteUser = require("../controllers/DeleteUsersController");

module.exports = router.delete("/:id", deleteUser);
