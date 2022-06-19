const bcrypt = require("bcrypt");
const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", `${errors.array()[0].msg}`);
    }
    res.status(400).redirect("/register");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        // User Session
        if (same) {
          req.session.userID = user._id;
          res.status(200).redirect("/users/dashboard");
        } else {
          req.flash("error", `Your password is not correct!`);
          res.status(400).redirect("/login");
        }
      });
    } else {
      req.flash("error", `User is not exist!`);
      res.status(400).redirect("/login");
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

exports.logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "courses"
  );
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });
  const users = await User.find();
  res.status(200).render("dashboard", {
    user,
    users,
    categories,
    courses,
    page_name: "dashboard",
  });
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    await Course.deleteMany({ user: req.params.id });
    req.flash("error", `${user.name} has been removed successfully!`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
