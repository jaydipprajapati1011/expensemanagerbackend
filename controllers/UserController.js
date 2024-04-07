const UserSchema = require('../models/UserModel');
const encrypt = require("../utils/Encrypt");
// const jwt = require('jsonwebtoken');
// const mailU = require("../utils/MailUtil");
const tokenUtil = require("../utils/TokenUtil");
// const encryptUtil = require("../utils/Encrypt");

exports.createUser = async (req, res) => {
    try {
        const hashedPassword = encrypt.encryptPassword(req.body.password);
        const userObj = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
        };

        // Create user
        const savedUser = await UserSchema.create(userObj);

        res.status(201).json({
            message: "User added",
            flag: 1,
            data: savedUser,
          });
        } catch (error) {
          res.status(500).json({
            message: "Server Error",
            flag: -1,
            data: error,
          });
        }
      };
      

exports.getUser = async (req, res) => {

    try {
        const userData = await UserSchema.find().populate("role");

        res.status(200).json({
            message: "getUser...",
            data: userData,
            flag: 1
        })
    } catch (err) {
        res.status(404).json({
            message: "error getting user",
            error: err,
            flag: -1
        })
    }
}

exports.getUserById = async (req, res) => {

    try {
        const user = await UserSchema.findById(req.params.id).populate("role");

        if(user==null){
            res.status(404).json({
                message:"User not found",
                flag:-1
            })
        }else{
            res.status(200).json({
                message:"User found",
                flag:1,
                data:user
            })

        }


    }catch(err){
        res.status(500).json({
            message:"Error in getting User by id",
            data:err,
            flag:-1
        })

    }


}


exports.updateUserById = async (req, res) => {

    const id = req.params.id;
    const newData = req.body;


    try {
      
        const updatedUser = await UserSchema.findByIdAndUpdate(id, newData);

        res.status(201).json({
            message: "user updated successfully",
            data: updatedUser,
            flag: 1
        })
    } catch (err) {
        res.status(404).json({
            message: "error updating user",
            error: err,
            flag: -1
        })
    }
}

exports.deleteUserById = async (req, res) => {

    try {
        const deletedUser = await UserSchema.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "user deleted successfully",
            data: deletedUser,
            flag: 1
        })
    } catch (err) {
        res.status(404).json({
            message: "error deleting user",
            error: err,
            flag: -1
        })
    }
}
exports.userLogin = async (req, res) => {
    try {
        console.log("Request Body:", req.body); 
        const email = req.body.email;
        const password = req.body.password;

        console.log("Email:", email); // Log the email received from the request

        const userFromEmail = await UserSchema.findOne({ email: email });
        console.log("User from email:", userFromEmail); // Log user retrieved from email
        
        if (userFromEmail) {
            const flag = encrypt.comparePassword(password, userFromEmail.password);
            console.log("Password comparison result:", flag); // Log password comparison result
            
            if (flag) {
                return res.status(200).json({
                    message: "User login successfully",
                    flag: 1,
                    data: userFromEmail,
                });
            } else {
                return res.status(401).json({
                    message: "Incorrect password",
                    flag: -1,
                });
            }
        } else {
            return res.status(404).json({
                message: "User not found",
                flag: -1,
            });
        }
    } catch (error) {
        console.error("Error in login user:", error); // Log any errors that occur
        return res.status(500).json({
            message: "Error in login user",
            data: error,
            flag: -1,
        });
    }
};