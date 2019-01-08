
'use strict';
const sha1 = require('sha1');
const md5 = require('md5');
const querystring = require('querystring');
module.exports = {
  guardSign: (params = {}, { UC_SECRET, UC_SALT, UC_ID }) => {
    const _params = {
      appId: UC_ID,
    };
    Object.assign(_params, params);
    const sha = sha1(querystring.stringify(_params));
    const sign = md5(sha + UC_SECRET + UC_SALT);
    return sign.substr(5, 24);
  },
};
