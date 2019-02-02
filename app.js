'use strict'

module.exports = app => {
	app.config.coreMiddleware.push('bsSso')
	app.config.coreMiddleware.push('resolveJwt')
}
