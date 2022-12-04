const argon2 = require("argon2");
const PORT = process.env.PORT;
const fs = require("fs");
const User = require("../model/User");
const validateRequest = require("../lib/validateForm");
const createDir = require("../lib/dir");

const registerUser = async (req, res) => {
  const validationErrors = [];
  try {
    const errors = validateRequest(req);
    if (errors.length) {
      validationErrors.push(...errors);
      return res.status(400).json({ hasError: true, validationErrors });
    }

    const duplicateEmail = await User.findOne({ email: req.body.email });
    if (duplicateEmail) {
      validationErrors.push({
        errorMessage: `That email already owned by someone`,
        key: "email",
      });
      return res.status(400).json({ hasError: true, validationErrors });
    }

    const base64 = req.body.picture.replace("data:image/jpeg;base64,", ""); //*convert base64 encoding to image and place it in specifig folder in this case in storage/userProfiles folder

    //* create the directory of users profile pictures in storage folder
    const profilePictureDir = `userProfiles/${req.body.firstname}_${req.body.lastname}`;
    await createDir(`storage/${profilePictureDir}`);

    //* file path
    const output_filePath = `storage/${profilePictureDir}/${req.body.firstname}.jpg`;
    await fs.promises.writeFile(output_filePath, base64, "base64");

    const hashPassword = await argon2.hash(req.body.password);
    const serverPath = `http://localhost:${PORT}/${profilePictureDir}/${req.body.firstname}.jpg`;
    const newUser = await User.create({
      ...req.body,
      picture: serverPath,
      password: hashPassword,
    });
    //console.log(newUser);
    return res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

module.exports = registerUser;
