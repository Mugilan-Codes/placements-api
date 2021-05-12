// REF: nodemailer ejs templates - https://stackoverflow.com/a/41337102/12381908
// REF: gmail smtp setup - https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a
// REF: extra reference for gmail setup - https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/

import { createTransport } from 'nodemailer';
import { google } from 'googleapis';
import ejs from 'ejs';
import path from 'path';

import { email_from, oauth2 } from './env';

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    oauth2.clientId,
    oauth2.clientSecret,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({ refresh_token: oauth2.refreshToken });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject('Failed to create access token :(');
      }
      resolve(token);
    });
  });

  const transporter = createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: oauth2.email,
      accessToken,
      clientId: oauth2.clientId,
      clientSecret: oauth2.clientSecret,
      refreshToken: oauth2.refreshToken,
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
  });

  return transporter;
};

const sendEmail = async ({ from = email_from, to, subject, html }) => {
  const mailOptions = {
    from,
    to,
    subject,
    html,
  };
  let emailTransporter = await createTransporter();
  const sentMailRes = await emailTransporter.sendMail(mailOptions);
  console.log({ sentMailRes });
};

export const verification = async (email, token, origin) => {
  const data = await ejs.renderFile(
    path.join(__dirname, '..', 'views', 'templates', 'email', 'verify.ejs'),
    {
      origin,
      token,
    }
  );

  await sendEmail({
    to: email,
    subject: 'Sign-up Verification API - Verify Email',
    html: data,
  });
};

export const alreadyRegistered = async (email, origin) => {
  const data = await ejs.renderFile(
    path.join(__dirname, '..', 'views', 'templates', 'email', 'exist.ejs'),
    {
      email,
      origin,
    }
  );

  await sendEmail({
    to: email,
    subject: 'Sign-up Verification API - Email Already Registered',
    html: data,
  });
};

export const passwordReset = async (email, token, origin) => {
  const data = await ejs.renderFile(
    path.join(__dirname, '..', 'views', 'templates', 'email', 'reset.ejs'),
    {
      origin,
      token,
    }
  );

  await sendEmail({
    to: email,
    subject: 'Sign-up Verification API - Reset Password',
    html: data,
  });
};
