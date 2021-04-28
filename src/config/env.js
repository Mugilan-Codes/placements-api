import 'dotenv/config';

export const api_port = process.env.PORT || 8000;

export const host = process.env.DB_HOST || 'localhost';
export const user = process.env.DB_USER || process.env.USER;
export const password = process.env.DB_PASS || null;
export const database = process.env.DB_NAME || process.env.USER;

export const environment = process.env.NODE_ENV || 'development';

export const jwt_secret = {
  access: process.env.ACCESS_TOKEN_SECRET,
  refresh: process.env.REFRESH_TOKEN_SECRET,
};

export const email_from = process.env.EMAIL_FROM;

export const smtp_options = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASSWORD,
  },
};

export const gmail_options = {
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
};

export const gmail_oauth2_options = {
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
};
