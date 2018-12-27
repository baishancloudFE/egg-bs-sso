# egg-bs-sso

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-bs-sso.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-bs-sso
[travis-image]: https://img.shields.io/travis/eggjs/egg-bs-sso.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-bs-sso
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-bs-sso.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-bs-sso?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-bs-sso.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-bs-sso
[snyk-image]: https://snyk.io/test/npm/egg-bs-sso/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-bs-sso
[download-image]: https://img.shields.io/npm/dm/egg-bs-sso.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-bs-sso

<!--
Description here.
-->

## Install

```bash
$ npm i egg-bs-sso --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.bsSso = {
  constant: {
    UC_ID: 0,
    UC_SERVICE: '',
    UC_SECRET: '',
    UC_SALT: '',
  },
  callbackUrl: 'http://localhost:8080',
  userFunction: 'service.user.create',
  tokenTime: 24,
  urlPrefix: /\/api/,
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.bsSso = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
