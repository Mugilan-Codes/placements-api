// REF: https://stackoverflow.com/a/41337102/12381908

import { createTransport } from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

import { email_from, gmail_oauth2_options, gmail_options } from './env';

const transport = createTransport(gmail_options);

const sendEmail = async ({ from = email_from, to, subject, html }) => {
  const mailOptions = {
    from,
    to,
    subject,
    html,
  };
  const sentMailRes = await transport.sendMail(mailOptions);
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
