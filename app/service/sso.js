'use strict';

const Service = require('egg').Service;
// 同步sso员工列表
class SsoService extends Service {
  async queryStaff() {
    const { guardSign } = this.ctx.helper;
    const constant = this.ctx.app.config.bsSso.constant;
    const { UC_SERVICE, UC_ID } = constant;
    const sign = guardSign({}, constant);
    const result = await this.ctx.curl(`${UC_SERVICE}/api/users/`, {
      method: 'GET',
      dataAsQueryString: true,
      data: {
        appId: UC_ID,
        sign,
      },
      dataType: 'json',
    });
    return result;
  }
}

module.exports = SsoService;
