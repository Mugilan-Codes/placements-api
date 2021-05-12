import 'dotenv/config';

export const api_port = process.env.PORT || 8000;

export const host = process.env.DB_HOST || 'localhost';
export const user = process.env.DB_USER || process.env.USER;
export const password = process.env.DB_PASS || null;
export const database = process.env.DB_NAME || process.env.USER;

export const local_connection = {
  host,
  user,
  password,
  database,
};

export const environment = process.env.NODE_ENV || 'development';

export const jwt_secret = {
  access: process.env.ACCESS_TOKEN_SECRET,
  refresh: process.env.REFRESH_TOKEN_SECRET,
};

export const email_from = process.env.EMAIL_FROM;

export const oauth2 = {
  clientId: process.env.OAUTH_CLIENTID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  email: process.env.MAIL_USERNAME,
};
