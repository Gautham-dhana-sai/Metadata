const nodemailer = require("nodemailer");

const sendMails = (req, res, next) => {
  let sender = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  let receiver = {
    from: process.env.SENDER_MAIL,
    to: "pavanps5666@gmail.com",
    subject: "Mail vachindha",
    text: "chustunav ante vache untadhi lee",
  };

  //   for (let i = 0; i <= 20; i++) {
  sender.sendMail(receiver, (error, resp) => {
    if (error) {
      return console.log(error);
    }
    console.log("email sent", resp);
  });
  //   }
};

module.exports = sendMails;