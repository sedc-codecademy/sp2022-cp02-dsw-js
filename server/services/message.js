const nodemailer = require("nodemailer");

const sendMessage = async (options) => {
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
    from: options.email,
    to: "OryxFashionStore <oryx@fashion.io>",
    subject: `Message from ${options.name} | ${options.phone}`,
    text: options.message,
  };

  //   3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendMessage;
