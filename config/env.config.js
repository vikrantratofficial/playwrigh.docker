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
    byRole: {
      SUPER_ADMIN: {
        email: process.env.SUPER_ADMIN_EMAIL || '',
        password: process.env.SUPER_ADMIN_PASSWORD || '',
      },
      ADMIN: {
        email: process.env.ADMIN_EMAIL || '',
        password: process.env.ADMIN_PASSWORD || '',
      },
      CUSTOMER: {
        email: process.env.CUSTOMER_EMAIL || '',
        password: process.env.CUSTOMER_PASSWORD || '',
      },
      SUPPLIER: {
        email: process.env.SUPPLIER_EMAIL || '',
        password: process.env.SUPPLIER_PASSWORD || '',
      },
      LOGISTIC: {
        email: process.env.LOGISTIC_EMAIL || '',
        password: process.env.LOGISTIC_PASSWORD || '',
      },
      TRANSPORTER: {
        email: process.env.TRANSPORTER_EMAIL || '',
        password: process.env.TRANSPORTER_PASSWORD || '',
      },
    },
  },
  apiBasicAuth: {
    user: required('API_BASIC_AUTH_USER'),
    password: required('API_BASIC_AUTH_PASSWORD'),
  },
};

module.exports = { config };
