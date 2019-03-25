'use strict'
const createStaffModel = require('./app/model/staff')
class AppBootHook {
	constructor(app) {
		app.config.coreMiddleware.push('bsSso')
		app.config.coreMiddleware.push('resolveJwt')
		this.app = app
	}
	async willReady() {
		// 例如：加载model
		console.log('bs-sso')
		const Staff = createStaffModel(this.app)
		const ctx = this.app.createAnonymousContext()
		const { staff } = ctx.service
		// 挂载到model
		ctx.model.Staff = Staff
		const staffs = await Staff.countDocuments()
		if (staffs === 0) {
			// 同步到数据库
			await staff.syncSsoStaff()
		} else {
		}
	}
}
module.exports = AppBootHook
