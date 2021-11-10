import 'dotenv/config';

export const api_port = process.env.PORT || 5000;

export const DB_CONNECTION = {
  host: process.env.DB_HOST || 'mysql', // IP Address of the docker container
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'dev_db',
};

export const NODE_ENV = process.env.NODE_ENV || 'development';

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

export const MONGO_URI = process.env.MONGO_URI;
