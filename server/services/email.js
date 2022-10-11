const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  //   2) Define the email options
  const mailOptions = {
    from: "OryxFashionStore <oryx@fashion.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //   3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
