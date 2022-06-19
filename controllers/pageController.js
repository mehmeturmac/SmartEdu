const nodemailer = require("nodemailer");
const Course = require("../models/Course");
const User = require("../models/User");

exports.getIndexPage = async (req, res) => {
  const courses = await Course.find().sort("-CreatedDate").limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudent = await User.countDocuments({ role: "student" });
  const totalTeacher = await User.countDocuments({ role: "teacher" });

  res.status(200).render("index", {
    page_name: "index",
    courses,
    totalCourses,
    totalStudent,
    totalTeacher,
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

exports.sendEmail = async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "kole.lebsack46@ethereal.email",
        pass: "YVBT2sZfCAg7jQhvvh",
      },
    });

    let info = await transporter.sendMail({
      from: '"Smart EDU Contact Form 👻" <kole.lebsack46@ethereal.email>',
      to: "mehmeturmac@gmail.com",
      subject: "Smart EDU Contact Form New Message ✔",
      html: `<h1>Mail Details</h1>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>`,
    });
    req.flash("success", "We received your message successfully!");
    res.status(200).redirect("contact");
  } catch (error) {
    req.flash("error", `Something happened!`);
    res.status(200).redirect("contact");
  }
};
