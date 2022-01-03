const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = 3000;

const nodemailer = require("nodemailer");
const google = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.Auth.OAuth2Client(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async function () {
  const accessToken = await oAuth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: "americahouset@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: "America House Jerusalem <americahouset@gmail.com>",
    to: "rmnaser90@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
    html: "<h1>That was easy!!!!</h1>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

sendMail();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
