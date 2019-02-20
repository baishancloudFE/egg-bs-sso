'use strict'
const jwt = require('jsonwebtoken')
module.exports = () => {
	return async function(ctx, next) {
		const ignoreUrlPrefix = ctx.app.config.bsSso.ignoreUrlPrefix
		if (ignoreUrlPrefix && ctx.url.search(ignoreUrlPrefix) === -1) {
			const jwtToken = ctx.get('Authorization').replace('Bearer ', '')
			if (!jwtToken) {
				ctx.status = 401
				ctx.body = {
					code: 1001
				}
			} else {
				try {
					const decoded = jwt.verify(jwtToken, 'secret')
					const exp = decoded.exp
					const now = new Date().getTime() / 1000
					if (now > exp) {
						// toke过期
						ctx.status = 401
						ctx.body = { code: 1001 }
					} else {
						await next()
					}
				} catch (error) {
					ctx.status = 401
					ctx.body = { code: 1001 }
				}
			}
		} else {
			await next()
		}
	}
}
