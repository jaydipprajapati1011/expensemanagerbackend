const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
const UserSchema = require("../models/UserModel");
const encrypt = require("../utils/Encrypt");
const mailUtil = require("../utils/MailUtil");
const OtpSchema = require("../models/OtpModel");

cloudinary.config({
  cloud_name: "dkwrhfiuw",
  api_key: "458297586322389",
  api_secret: "5Nr3M6QoyEOk9E5rPBoxKLWKoh0",
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Append current timestamp to ensure file uniqueness
  },
});
// File filter to restrict uploads to images only
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  };
  
  // Initialize Multer with storage and file filter configuration
  const upload = multer({ storage: storage, fileFilter: fileFilter });

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
exports.resetPassword = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const otp = req.body.otp;
    const time = req.body.time;
  
    console.log("email....", email);
    console.log("password....", password);
    console.log("otp....", otp);
    console.log("time....", time);
  
    const getUser = await OtpSchema.findOne({ email: email });
  
    console.log("getUser....", getUser);
  
    if (getUser) {
      if (getUser.otp === otp) {
        //gettime ffrom otp object....
        //compsre for 30 seconds...
        const timeDifference = time - getUser.time;
        console.log("timeDifference....", timeDifference);
        const is30SecondsGap = timeDifference >= 30000;
        console.log("is30SecondsGap....", is30SecondsGap);
        if (is30SecondsGap) {
          console.log("OTP is expired!!!");
          await OtpSchema.findOneAndDelete({ email: email });
          res.status(401).json({
            message: "otp is expired!!",
            flag: -1,
          });
        } else {
          const hashedPassword = encrypt.encryptPassword(password);
  
          try {
            const updateUser = await UserSchema.findOneAndUpdate(
              { email: email },
              { $set: { password: hashedPassword } }
            );
            console.log("Password updated successfully");
            //password rest...
            //delete otp record....
            await OtpSchema.findOneAndDelete({ email: email });
  
            res.status(200).json({
              message: "Password updated successfully",
              flag: 1,
            });
          } catch (err) {
            console.error(err);
            res.status(500).json({
              message: "Error in updating password",
              flag: -1,
            });
          }
        }
      } else {
        //delete otp record....
        await OtpSchema.findOneAndDelete({ email: email });
        console.log("Invalid OTP!!!");
        res.status(403).json({
          message: "Invalid otp..",
          flag: -1,
        });
      }
    } else {
      //delete otp record....
      console.log("Error in retrieving OTP from database!!!");
      res.status(500).json({
        message: "Error...",
        flag: -1,
      });
    }
  };
  
  exports.isUserExist = async (req, res) => {
    const email = req.body.email;
  
    try {
      const userbyemail = await UserSchema.findOne({ email: email });
      if (userbyemail) {
        //employee found
        //otp generation -->mail
        //time
        //otp save in db
        const otp = Math.floor(1000 + Math.random() * 9000);
        const mailRes = await mailUtil.mailSend(
          userbyemail.email,
          "OTP for reset password",
          "OTP for password generation",
          `Your OTP is ${otp}`
        );
        const otpObj = {
          otp: otp,
          email: userbyemail.email,
          status: true,
        };
        await OtpSchema.create(otpObj);
        console.log("otp....", otp);
        res.status(200).json({
          message: "User found",
          flag: 1,
          data: userbyemail,
        });
      } else {
        res.status(404).json({
          message: "User not found",
          flag: -1,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error in getting user by email",
      });
    }
  };