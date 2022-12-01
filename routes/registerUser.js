const router = require("express").Router();
const registerUser = require("../controllers/registerUserController");

router.post("/", registerUser);

module.exports = router;