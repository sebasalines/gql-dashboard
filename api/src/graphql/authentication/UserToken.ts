const jwt = require('jsonwebtoken');

export default {
  sign: function (payload) {
    return new Promise((resolve, reject) => {
      try {
        payload.exp = Math.floor(Date.now() / 1000) + 7776000;
        const token = jwt.sign(payload, 'secret');
        // const token = `what`;
        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  },
  verify: function (token) {
    return new Promise((resolve, reject) => {
      try {
        const decoded = jwt.verify(token, 'secret');
        // const decoded = jwt.verify(token, {result: 'yo mama'});
        resolve(decoded);
      } catch (err) {
        reject(err);
      }
    });
  },
};
