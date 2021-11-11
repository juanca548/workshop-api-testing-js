const agent = require('superagent');
const { expect } = require('chai');
const statusCode = require('http-status-codes');

describe('Consume Github Api method HEAD', () => {
  const url = 'https://github.com/aperdomob/redirect-test';
  const redirectUrl = 'https://github.com/aperdomob/new-redirect-test';
  it('Redirect with HEAD', async () => {
    try {
      await agent.head(url).set('User-Agent', 'juanca548');
    } catch (error) {
      expect(error.status).to.equal(statusCode.MOVED_PERMANENTLY);
      expect(error.response.headers.location).to.equal(redirectUrl);
    }
  });

  it('check redirect url', async () => {
    try {
      await agent.get(url).set('User-Agent', 'juanca548');
    } catch (error) {
      expect(error.status).to.equal(statusCode.MOVED_PERMANENTLY);
      expect(error.url).to.equal(redirectUrl);
    }
  });
});
