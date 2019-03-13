'use strict'
const Service = require('egg').Service
// 同步sso员工列表
class StaffService extends Service {
	async queryStaff() {
		const { guardSign } = this.ctx.helper
		const constant = this.ctx.app.config.bsSso.constant
		const { UC_SERVICE, UC_ID } = constant
		const sign = guardSign({}, constant)
		const result = await this.ctx.curl(`${UC_SERVICE}/api/users/`, {
			method: 'GET',
			dataAsQueryString: true,
			data: {
				appId: UC_ID,
				sign
			},
			dataType: 'json'
		})
		return result
	}

	async query(args) {
		const { Staff } = this.ctx.model
		const staff = await Staff.find(args).exec()
		return staff
	}

	async syncSsoStaff() {
		const { staff } = this.ctx.service
		const { Staff } = this.ctx.model
		const { status, data: { data } } = await staff.queryStaff()
		data.map(item => {
			item._id = item.id
			delete item.id
			return item
		})
		if (status === 200) {
			await Staff.deleteMany()
			await Staff.insertMany(data)
			return true
		} else {
			return false
		}
	}
}

module.exports = StaffService
