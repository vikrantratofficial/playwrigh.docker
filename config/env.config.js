const path = require('path');
const dotenv = require('dotenv');
//dotenv .env file se variables load karne ke liye — dono Node.js/npm packages hain
//Ye check karta hai ki system ya command line se ENV naam ka koi environment variable pass kiya gaya hai ya nahi
const environment = process.env.ENV || 'uat';

//Sahi .env file load karna
//environment value ke hisaab se sahi file (.env.uat, .env.qa, etc.) uthata hai aur uske andar likhi values process.env me daal deta hai.
dotenv.config({
  path: path.resolve(__dirname, 'environments', `.env.${environment}`),
  quiet: true,
});
//required() helper function — sabse important part
//ye function check krta hai ki enverment variable wali file exist krti hai kya agr missing hai to error through kre
//Ye ek validation function hai. Kaam: process.env se koi specific variable (jaise BASE_URL) nikalo. Agar wo variable exist nahi karta ya empty hai, to turant ek clear error throw kar do
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

//Config object banate hain
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

//Ye poora config object doosri files me use karne ke liye export ho raha hai. Kisi bhi test file me aap aise import karoge:
module.exports = { config };
