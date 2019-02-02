# egg-bs-sso

白山node应用的sso插件。

## Install

```bash
$ npm i egg-bs-sso --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.bsSso = {
	enable: true,
	package: 'egg-bs-sso'
}
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.bsSso = {
	// sso信息配置
	constant: {
		UC_ID: 0,
		UC_SERVICE: '',
		UC_SECRET: '',
		UC_SALT: ''
	},
	// 登录成功后返回用户信息的处理
	userFunction: async (ctx, user) => {
		const { User, Platform } = ctx.model
		const userResult = await User.findOne({ uid: user.uid })
		if (!userResult) {
			const platforms = await Platform.find().select('_id').exec()
			const _user = new User({
				platforms: platforms,
				...user
			})
			return await _user.save()
		} else {
			return userResult
		}
	},
	// token有效小时
	tokenTime: 24,
	// 忽略的url前缀
	ignoreUrlPrefix: /\/api/
}
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)