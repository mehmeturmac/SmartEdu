const nodemailer = require("nodemailer");

exports.getIndexPage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
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
  res.status(200).redirect("contact");
};
