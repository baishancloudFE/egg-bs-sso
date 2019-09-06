# egg-bs-sso

白山 node 应用的 sso 插件。

## Install

```bash
$ npm i egg-bs-sso --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.bsSso = {
  enable: true,
  package: "egg-bs-sso"
}
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.bsSso = {
  // sso信息配置
  constant: {
    UC_ID: 0,
    UC_SERVICE: "",
    UC_SECRET: "",
    UC_SALT: ""
  },
  // 登录成功后返回用户信息的处理
  userFunction: async (ctx, user) => {
    const { User, Platform } = ctx.model
    const userResult = await User.findOne({ uid: user.uid })
    if (!userResult) {
      const platforms = await Platform.find()
        .select("_id")
        .exec()
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

## 目录结构

```
.
├── LICENSE
├── README.md   说明文档
├── app    插件入口
│   ├── extend   扩展方法
│   │   └── helper.js
│   ├── middleware  扩展的中间件
│   │   ├── bs-sso.js
│   │   └── resolveJwt.js
│   ├── model  扩展的数据模型
│   │   └── staff.js
│   └── service  扩容的service类
│       └── staff.js
├── app.js  入口文件
├── appveyor.yml
├── config  配置
│   └── config.default.js
├── package.json
├── test  单元测试
│   ├── bs-sso.test.js
│   └── fixtures
│       └── apps
│           └── bs-sso-test
│               ├── app
│               │   ├── controller
│               │   │   └── home.js
│               │   └── router.js
│               ├── config
│               │   └── config.default.js
│               └── package.json
└── yarn.lock
```

## 技术栈

egg + js + mongoose

## 发布方式

yarn publish
