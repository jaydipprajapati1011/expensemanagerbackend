const MailUtil = require("nodemailer");

const mailSend = async (to, subject, text, html) => {
  const mailOptions = {
    from: "jay21781.1@gmail.com",
    to: to,
    subject: subject,
    text: text,
    // html: "<h1>This is testing of nodemailer</h1>",
    html: html
  };

  const transporter = MailUtil.createTransport({
    service: "gmail",
    auth: {
      user: "jay21781.1@gmail.com",
      pass: "wpwikyvuosqtlwrx",
    },
  });

  
    const res = await transporter.sendMail(mailOptions);
    return res;
 
  }

module.exports = {
    mailSend
};

// Example usage:
// mailSend("rpatel0096745@gmail.com", "Test", "Welcome to app...")
//   .then((response) => {
//     console.log("Email sent successfully:", response);
//   })
//   .catch((error) => {
//     console.error("Error sending email:", error);
//   });