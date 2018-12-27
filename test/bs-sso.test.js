'use strict';

const mock = require('egg-mock');

describe('test/bs-sso.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/bs-sso-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, bsSso')
      .expect(200);
  });
});
