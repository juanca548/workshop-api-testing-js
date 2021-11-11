const agent = require('superagent');
const { expect } = require('chai');
const statusCode = require('http-status-codes');

describe('Consume Github Api method QUERY with GET', () => {
  it('Default user request', async () => {
    const response = await agent.get('https://api.github.com/users').set('User-Agent', 'juanca548');
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.length).to.equal(30);
  });

  it('User request with 10 users', async () => {
    const response = await agent.get('https://api.github.com/users').set('User-Agent', 'juanca548').query({ per_page: 10 });
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.length).to.equal(10);
  });

  it('User request with 50 users', async () => {
    const response = await agent.get('https://api.github.com/users').set('User-Agent', 'juanca548').query({ per_page: 50 });
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.length).to.equal(50);
  });
});
