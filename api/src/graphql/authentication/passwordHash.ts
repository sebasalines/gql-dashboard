const bcrypt = require('bcrypt');

export default {
  validate: bcrypt.compare,
  hash: (function (password, saltRounds) {
    return this(saltRounds, password);
  }).bind(bcrypt.hash, 8),
};
