const { faker } = require('@faker-js/faker');

function randomInvalidCredentials() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
  };
}

function randomWrongCaptcha() {
  return faker.string.alpha({ length: 6, casing: 'lower' });
}

module.exports = { randomInvalidCredentials, randomWrongCaptcha };
