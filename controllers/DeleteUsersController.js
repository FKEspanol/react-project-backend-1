const User = require("../model/User");

module.exports = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ result: "ok" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
};
