const router = require("express").Router();
const deleteUser = require("../controllers/deleteUsersController");

module.exports = router.delete("/:id", deleteUser);
