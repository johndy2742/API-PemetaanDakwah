// Model
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("../validator/validator")
// Controller
const controller = {
  create: async (req, res) => {
    const search_user = await User.findOne({ email: req.body.email });
    if (search_user) {
        return res.status(400).json({ msg: "User sudah Ada" });
    }
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });

    console.log(await user.save())

    res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = validator.generateJwt({ id: user.id });

      return res
        .header("auth-token", token)
        .status(200)
        .json({ message: "Login successful", user: user, access_token: token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  getAll: async (req, res) => {
    const users = await User.find();

    res.status(200).json({
      message: "Users fetched successfully",
      users: users,
    });
  },
  getById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }
  
      res.status(200).json({
        message: "User fetched successfully",
        user: user,
      });
    } catch (error) {
      res.status(500).json({
        message: "user not found",
      });
    }
  },
  
  update: async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    user.email = req.body.email;
    user.password = req.body.password;
    user.name = req.body.name;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: user,
    });
  },
  delete: async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  },
};

// Module
module.exports = controller;