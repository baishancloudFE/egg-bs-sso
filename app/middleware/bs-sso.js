'use strict';

const jwt = require('jsonwebtoken');
const accountReg = new RegExp(/\/account\/user\/(\w+)/);
const viewService = async (
  ctx,
  { tokenTime = 3, userFunction, constant: { UC_SECRET, UC_SALT, UC_SERVICE, UC_ID } }
) => {
  const ticket = ctx.queries.ticket && ctx.queries.ticket[0];
  const { guardSign } = ctx.helper;
  const params = {
    appId: UC_ID,
    ticket,
    sign: guardSign({ ticket }, { UC_SECRET, UC_SALT, UC_ID }),
  };

  const url = UC_SERVICE + '/staff/account/user';
  const result = await ctx.curl(url, {
    method: 'POST',
    contentType: 'JSON',
    data: params,
    dataType: 'json',
  });
  const { data: { data: user, code } } = result;
  if (code === 0) {
    const userResult = await userFunction(ctx, user);
    if (userResult) {
      const { uid, name, cname } = user;
      const jwtToken = jwt.sign({ uid, name, cname }, 'secret', { expiresIn: `${tokenTime}h` });
      userResult.jwtToken = jwtToken;
      ctx.body = userResult;
    } else {
      ctx.status = 400;
    }
  } else {
    ctx.status = 400;
  }
};

const loginService = async (ctx, { constant: { UC_SERVICE, UC_ID }, callbackUrl }) => {
  const loginUrl = UC_SERVICE + '/staff-center?appId=' + UC_ID + '&callback=' + callbackUrl;
  ctx.redirect(loginUrl);
};

const logoutService = async (ctx, { constant: { UC_SERVICE, UC_ID } }) => {
  const loginUrl = UC_SERVICE + '/staff/account/logout?appId=' + UC_ID;
  ctx.redirect(loginUrl);
};

const accountRouter = {
  view: viewService,
  login: loginService,
  logout: logoutService,
};

module.exports = () => {
  return async function(ctx, next) {
    const router = ctx.url;
    const isMatch = accountReg.exec(router);
    if (isMatch && accountRouter[isMatch[1]]) {
      const _router = isMatch[1];
      const bsSsoConfig = ctx.app.config.bsSso;
      await accountRouter[_router](ctx, bsSsoConfig);
    } else {
      await next();
    }
  };
};
