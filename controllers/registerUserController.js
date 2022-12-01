const argon2 = require("argon2");
const User = require("../model/User");
const validateRequest = require('../lib/validateForm');


const registerUser = async (req, res) => {
   const validationErrors = [];
   try {
      const errors = validateRequest(req);
      if (errors.length) {
         validationErrors.push(...errors);
         return res.status(400).json({ hasError: true, validationErrors })
      }

      const duplicateEmail = await User.findOne({ email: req.body.email });
      if (duplicateEmail) {
         validationErrors.push({
            errorMessage: `That email already owned by someone`,
            key: 'email'
         });
         return res.status(400).json({ hasError: true, validationErrors });
      }
      const hashPassword = await argon2.hash(req.body.password);
      const newUser = await User.create({ ...req.body, password: hashPassword });
      console.log(newUser);
      return res.status(201).json({ newUser })
   } catch (error) {
      console.error(error)
      return res.status(500).json(error);
   }
}

module.exports = registerUser;