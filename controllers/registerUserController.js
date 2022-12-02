const argon2 = require("argon2");
const path = require('path');
const PORT = process.env.PORT
const fs = require("fs");
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

      //*convert base64 encoding to image and place it in specifig folder in this case in userProfiles folder
      const base64 = req.body.picture.replace("data:image/jpeg;base64,", "");
      const picturePath = path.join(__dirname, `../userProfiles/${req.body.firstname}.jpg`);
      fs.writeFile(picturePath, base64, "base64", err => console.log(err));


      const hashPassword = await argon2.hash(req.body.password);
      const serverPath = `http://localhost:${PORT}/${req.body.firstname}.jpg`
      const newUser = await User.create({ ...req.body, picture: serverPath, password: hashPassword });
      console.log(newUser);
      return res.status(201).json({ newUser })
   } catch (error) {
      console.error(error)
      return res.status(500).json(error);
   }
}

module.exports = registerUser;