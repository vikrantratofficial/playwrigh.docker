const path = require('path');
const dotenv = require('dotenv');

const environment = process.env.ENV || 'uat';

dotenv.config({
  path: path.resolve(__dirname, 'environments', `.env.${environment}`),
  quiet: true,
});

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required env var "${name}" for environment "${environment}". ` +
      `Set it in config/environments/.env.${environment}.`
    );
  }
  return value;
}

const config = {
  environment,
  baseUrl: required('BASE_URL'),
  apiBaseUrl: required('API_BASE_URL'),
  credentials: {
    email: process.env.LOGIN_EMAIL || '',
    password: process.env.LOGIN_PASSWORD || '',
  },
  apiBasicAuth: {
    user: required('API_BASIC_AUTH_USER'),
    password: required('API_BASIC_AUTH_PASSWORD'),
  },
};

module.exports = { config };
