const PayeeSchema = require('../models/PayeeModel');

const getAllPayee = async (req, res) => {
  try {
    const payee = await PayeeSchema.find().populate('user');
    res.status(200).json({
      message: "Payee fetched",
      flag: 1,
      data: payee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getPayeeById = async (req, res) => {
   
  try{
      const payee = await PayeeSchema.findById(req.params.id);
      
      res.status(200).json({
          message:"payee found",
          data:payee,
          flag:1
      })
  } catch(err){
      res.status(404).json({
          message:"payee not found",
          error:err,
          flag:-1
      })
  }
}

const addPayee = async (req, res) => {
  try {
    const payee = await PayeeSchema.create(req.body);
    res.status(201).json({
      message: "Payee added",
      flag: 1,
      data: payee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const updatePayee = async (req, res) => {
  const id = req.params.id;
  try {
    const updatePayee = await PayeeSchema.findByIdAndUpdate(id, req.body);
    if (!updatePayee) {
      return res.status(404).json({
        message: "No payee with this ID was found.",
      });
    } else {
      res.status(201).json({
        message: "Payee category!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const deletePayee = async (req, res) => {
  const id = req.params.id;
  try {
    const removedPayee = await PayeeSchema.findByIdAndDelete(id);
    if (!removedPayee) {
      return res
        .status(404)
        .json({ message: "No payee with this ID was found." });
    } else {
      res.status(200).json({ message: "deleted payee" });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

module.exports = {
  getAllPayee,
  getPayeeById,
  addPayee,
  updatePayee,
  deletePayee,
};