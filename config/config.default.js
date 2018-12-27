'use strict';

/**
 * egg-bs-sso default config
 * @member Config#bsSso
 * @property {String} SOME_KEY - some description
 */
exports.bsSso = {
  constant: {
    UC_ID: 0,
    UC_SERVICE: '',
    UC_SECRET: '',
    UC_SALT: '',
  },
  callbackUrl: 'http://localhost:8080',
  userFunction: 'service.user.create',
  tokenTime: 24,
  urlPrefix: /\/api/,
};
