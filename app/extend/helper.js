
'use strict';
const sha1 = require('sha1');
const md5 = require('md5');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
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
  decodeJwt: ctx => {
    const jwtToken = ctx.get('Authorization').replace('Bearer ', '');
    if (jwtToken) {
      try {
        return jwt.verify(jwtToken, 'secret');
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return false;
    }
  },
};
