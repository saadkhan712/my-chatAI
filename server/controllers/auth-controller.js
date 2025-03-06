const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const token = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const axios = require("axios");


const home = async (req, res) => {
    try {
        res.status(200).send("my hoe");
    } catch (error) {
        (error);
    }
};

const registration = async (req, res) => {
    try {
      (req.body);
      const {email, name, phone, gender, password } = req.body;
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return res.status(400).json({ msg: "email already exists" });
      }
  
      const userCreated = await User.create({email, name, phone, gender, password });
      res.status(201).json({
        msg: "Registration Successful",
        token : await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
    } catch (error) {
      res.status(500).json({ message: "Registration not done " });
    }
  };

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: "30d" }
        );
        res.status(200).json({ message: "Login successful", userId: user._id, token });
    } catch (error) {
        console.error("Login Error: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "15m" });
        const resetCode = Math.floor(100000 + Math.random() * 900000);
        user.resetCode = resetCode;
        user.resetCodeExpires = Date.now() + 15 * 60 * 1000;
        await user.save();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Use environment variables
                pass: process.env.EMAIL_PASS, // Use an App Password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Code",
            text: `Your password reset code is: ${resetCode}. It expires in 15 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Reset code sent to email" });

    } catch (error) {
        console.error("Forget Password Error: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const verifyResetCode = async (req, res) => {
    try {
        const { email, resetCode } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.resetCode !== resetCode || user.resetCodeExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired reset code" });
        }

        res.status(200).json({ message: "Reset code is valid. Proceed to reset password." });

    } catch (error) {
        console.error("Verification Error: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const resetPassword = async (req, res) => {
    try {
        const { email, resetCode, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.resetCode !== resetCode || user.resetCodeExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired reset code" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetCode = null; // Clear the reset code
        user.resetCodeExpires = null;
        await user.save();

        res.status(200).json({ message: "Password has been reset successfully" });

    } catch (error) {
        console.error("Password Reset Error: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
// const myInfo = async (req, res) => {
//     try {
//         const token = req.header("Authorization");
//         if (!token) return res.status(401).json({ error: "Unauthorized" });

//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         const user = await User.findById(decoded.userId).select("-password");

//         if (!user) return res.status(404).json({ error: "User not found" });

//         res.json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Server error" });
//     }
// }
// const jwt = require("jsonwebtoken");
// const User = require("../models/User"); // Ensure this path is correct

// const myInfo = async (req, res) => {
//     try {
//         const authHeader = req.header("Authorization");
//         if (!authHeader) {
//             return res.status(401).json({ error: "Unauthorized: No token provided" });
//         }

//         // Ensure token has the "Bearer " prefix
//         const tokenParts = authHeader.split(" ");
//         if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
//             return res.status(401).json({ error: "Unauthorized: Invalid token format" });
//         }

//         const token = tokenParts[1]; // Extract actual token

//         // Verify token
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         if (!decoded.userId) {
//             return res.status(401).json({ error: "Invalid token: No userId found" });
//         }

//         // Fetch user from DB
//         const user = await User.findById(decoded.userId).select("-password");
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         console.error("JWT Verification Error:", error);
//         res.status(500).json({ error: error.message || "Server error" });
//     }
// };
const myInfo = async (req, res) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const tokenParts = authHeader.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(401).json({ error: "Unauthorized: Invalid token format" });
        }

        const token = tokenParts[1]; // ✅ Extract actual token

        const decoded = jwt.verify(token, process.env.SECRET_KEY); // ✅ Verify JWT

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(500).json({ error: "Invalid or expired token" });
    }
};


const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const response = await axios.post(
            "https://api.replicate.com/v1/predictions",
            {
                version: "stability-ai/stable-diffusion",
                input: { prompt },
            },
            {
                headers: {
                    Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        ); 

        res.status(200).json({ imageUrl: response.data.output });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate image" });
    }
};
module.exports = {
    registration,
    home,
    login,
    generateImage,
    resetPassword, 
    forgetPassword,
    verifyResetCode,
    myInfo
 };