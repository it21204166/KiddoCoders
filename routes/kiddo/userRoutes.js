// authRoutes.js
const express = require("express");
const User = require("../../models/KiddoModel/KiddoModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../../routes/kiddo/middleware/authMiddleware");
const jwt_secret = process.env.jwt_secret || "KiddoCoders";

const router = express.Router();

// Register new user
router.post("/register", async (req, res) => {
    try {
        // Check if user already exists
        const user = await User.findOne({ kiddoEmail: req.body.email });
        if (user) {
            return res.send({
                success: false,
                message: "Email already exists",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.kiddoPassword, salt);
        req.body.kiddoPassword = hashedPassword;

        // Create new user
        const newUser = new User(req.body);
        await newUser.save();

        return res.send({
            success: true,
            message: "User created successfully, please login",
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});

// Login a user
router.post("/login", async (req, res) => {
    try {
        const { kiddoEmail, kiddoPassword } = req.body;

        // Check if user exists
        const user = await User.findOne({ kiddoEmail });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User does not exist",
            });
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(
            kiddoPassword,
            user.kiddoPassword
        );

        if (!validPassword) {
            return res.status(401).send({
                success: false,
                message: "Invalid password",
            });
        }

        // create and assign a token
        const token = jwt.sign({ userId: user._id }, jwt_secret, {
            expiresIn: "1d",
        });

        return res.send({
            success: true,
            message: "Login successful",
            data: token,
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
        });
    }
});

// get logged in user details
router.get("/get-logged-in-user", async (req, res) => {
    console.log("Database was connected 123", req.body.userIdFromToken);
    try {
        const user = await User.findById(req.body.userIdFromToken);
        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist",
            });
        }
        return res.send({
            success: true,
            message: "User details fetched successfully",
            data: user,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: "Hello message",
        });
    }
});

// get user by id
router.get("/get-user-by-id/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist 123",
            });
        }
        return res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: "User does not exist 321",
        });
    }
});

// Get all users except specific id user's details - Nethma
router.get("/getRestUsers/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await User.find({ _id: { $ne: id } });

        res.status(200).json({
            message: "Users are dsiplayed!",
            result,
        })
        
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// Update user profile
router.put("/update-user/:id", async (req, res) => {
    try {
        const userId = req.params.id; // Use the user ID from the URL params
        const updatedData = req.body; // Data to update

        // Check if the user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }

        // Update the user's data
        Object.assign(user, updatedData);
        await user.save();

        return res.json({
            success: true,
            message: "User data updated successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Delete user by ID
router.delete("/delete-user/:id", async (req, res) => {
    try {
        const userToDelete = await User.findById(req.params.id);

        if (!userToDelete) {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }

        await User.findByIdAndDelete(req.params.id);

        return res.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.get("/get-all-users", async (req, res) => {
    try {
        const users = await User.find();
        return res.json({
            success: true,
            message: "Users retrieved successfully",
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

/*
router.put('/updatePoint/:id', async(req, res) => {
    try {
        const userId = req.params.id; // Use the user ID from the URL params
        const point = req.body.point; // Data to update
        // Check if the user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User does not exist',
            });
        }

        const points = user.points + point

        // Update the user's data
        User.findByIdAndUpdate(userId, {
            points
        }, { new: true }).then(() => {
            res.send("successfuly updated")
        }).catch((err) => {
            return res.status(500).send('Error orcurred')
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
})
*/

module.exports = router;
