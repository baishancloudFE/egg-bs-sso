'use strict'

const jwt = require('jsonwebtoken')
const accountReg = new RegExp(/\/account\/(user|token)\/(\w+)/)
// view 用户校验
const viewService = async (
	ctx,
	{ tokenTime = 3, userFunction, constant: { UC_SECRET, UC_SALT, UC_SERVICE, UC_ID } }
) => {
	const ticket = ctx.queries.ticket && ctx.queries.ticket[0]
	const { guardSign } = ctx.helper
	const params = {
		appId: UC_ID,
		ticket,
		sign: guardSign({ ticket }, { UC_SECRET, UC_SALT, UC_ID })
	}
	const url = UC_SERVICE + '/staff/account/user'
	const result = await ctx.curl(url, {
		method: 'POST',
		contentType: 'JSON',
		data: params,
		dataType: 'json'
	})
	const { data: { data: user, code } } = result
	if (code === 0) {
		const userResult = await userFunction(ctx, user)
		if (userResult) {
			const { uid, name, cname, type } = userResult
			const jwtToken = jwt.sign({ uid, name, cname, type }, 'secret', { expiresIn: `${tokenTime}h` })
			userResult.jwtToken = jwtToken
			ctx.body = { data: userResult, code: 0, msg: '成功啦！' }
		} else {
			ctx.status = 400
		}
	} else {
		ctx.body = { code: -1 }
	}
}

// login 跳转登录中心
const loginService = async (ctx, { constant: { UC_SERVICE, UC_ID }, callbackUrl }) => {
	const referer = ctx.headers.referer
	const loginUrl = UC_SERVICE + '/staff-center?appId=' + UC_ID + '&callback=' + (callbackUrl ? callbackUrl : referer)
	ctx.redirect(loginUrl)
}

// logout 跳转退出
const logoutService = async (ctx, { constant: { UC_SERVICE, UC_ID } }) => {
	const loginUrl = UC_SERVICE + '/staff/account/logout?appId=' + UC_ID
	ctx.redirect(loginUrl)
}

// validate token校验
const validate = async (ctx, { urlPrefix }, next) => {
	ctx.body = { data: {}, code: 0, msg: '成功啦！' }

	// if (urlPrefix && ctx.url.search(urlPrefix) !== -1) {
	//   const jwtToken = ctx.get('Authorization').replace('Bearer ', '');
	//   if (!jwtToken) {
	//     ctx.status = 401;
	//     ctx.body = {
	//       code: 1001,
	//     };
	//   } else {
	//     try {
	//       const decoded = jwt.verify(jwtToken, 'secret');
	//       const exp = decoded.exp;
	//       const now = new Date().getTime() / 1000;
	//       if (now > exp) {
	//         // toke过期
	//         ctx.status = 401;
	//         ctx.body = { code: 1001 };
	//       } else {
	//         await next();
	//       }
	//     } catch (error) {
	//       ctx.status = 401;
	//       ctx.body = { code: 1001 };
	//     }
	//   }
	// } else {
	//   await next();
	// }
}

const accountRouter = {
	view: viewService,
	login: loginService,
	logout: logoutService,
	validate
}

module.exports = () => {
	return async function(ctx, next) {
		const router = ctx.url
		const isMatch = accountReg.exec(router)
		if (isMatch && accountRouter[isMatch[2]]) {
			const _router = isMatch[2]
			const bsSsoConfig = ctx.app.config.bsSso
			await accountRouter[_router](ctx, bsSsoConfig, next)
		} else {
			await next()
		}
	}
}
