const bcrypt = require("bcrypt");

// Function to encrypt a password
const encryptPassword = (password) => {
  // Generate a salt synchronously
  const salt = bcrypt.genSaltSync(10);
  // Hash the password with the salt
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

// Function to compare a password with its hashed version
const comparePassword = (password, hash) => {
  // Compare the password with its hashed version
  const isMatch = bcrypt.compareSync(password, hash);
  return isMatch;
};

module.exports = { encryptPassword, comparePassword };