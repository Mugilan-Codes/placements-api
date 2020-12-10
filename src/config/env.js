import 'dotenv/config';

export const api_port = process.env.PORT || 8000;

export const host = process.env.DB_HOST || 'localhost';
export const user = process.env.DB_USER || process.env.USER;
export const password = process.env.DB_PASS || null;
export const database = process.env.DB_NAME || process.env.USER;

export const environment = process.env.NODE_ENV || 'development';

export const jwt_secret = process.env.JWT_SECRET;
