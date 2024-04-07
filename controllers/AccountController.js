const AccountSchema = require("../models/AccountModel");

// All accounts
const getAllAccounts = async (req, res) => {
  try {
    const account = await AccountSchema.find().populate("user");
    res.status(200).json({
      message: "Accounts fetched",
      flag: 1,
      data: account,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

// Accounts by id
const getAccountById = async (req, res) => {
  const id = req.params.id;
  try {
    const account = await AccountSchema.findById(id).populate("user");
    res.status(200).json({
      message: "Account fetched",
      flag: 1,
      data: account,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

// Create account
const addAccount = async (req, res) => {
  try {
    const account = await AccountSchema.create(req.body);
    res.status(201).json({
      message: "Account added",
      flag: 1,
      data: account,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

// Update account
const updateAccountById = async (req, res) => {
  try{
    const id = req.params.id;
    const newData = req.body;

    const updatedAccount = await AccountSchema.findByIdAndUpdate(id, newData);
    res.status(200).json({
        message:'account updated successfully',
        data:updatedAccount,
        flag:1
    })
}catch(err){
    res.status(404).json({
        message:'error updating account',
        error:err,
        flag:-1
    })
}
};

// Delete account by Id
const deleteAccount = async (req, res) => {
  try{
    const deletedAccount = await AccountSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message:'account deleted successfully',
        data:deletedAccount,
        flag:1
    })
}catch(err){
    res.status(404).json({
        message:'error deleting account',
        error:err,
        flag:-1
    })
}
};

module.exports = {
  getAllAccounts,
  getAccountById,
  addAccount,
  updateAccountById,
  deleteAccount
};