const User = require("../model/User");

const getAllUsers = async (req, res) => {
   try {
      const users = await User.find({});
      return res.status(200).json({ users })
   } catch (error) {
      console.log(error);
      res.status(500).json(error)
   }
}

module.exports = getAllUsers;