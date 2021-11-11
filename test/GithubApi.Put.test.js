const agent = require('superagent');
const { expect } = require('chai');
const statusCode = require('http-status-codes');

const urlBase = 'https://api.github.com';
const githubUserName = 'aperdomob';

describe('Consume Github Api method PUT', async () => {
  const followingUrl = 'https://api.github.com/user/following';
  it('follow aperdomob user', async () => {
    const response = await agent.put(`${urlBase}/user/following/${githubUserName}`).auth('token', process.env.ACCESS_TOKEN).set('User-Agent', 'juanca548');
    expect(response.status).to.equal(204);
    expect(response.body).to.eql({});
  });

  it('search and check following aperdomob', async () => {
    const response = await agent.get(followingUrl).auth('token', process.env.ACCESS_TOKEN).set('User-Agent', 'juanca548');
    expect(response.status).to.equal(statusCode.OK);
    const User = response.body.find(
      (element) => element.login === 'aperdomob'
    );
    expect(User.login).to.equal('aperdomob');
  });

  it('Check idempotent of put method', async () => {
    const response = await agent.put(`${urlBase}/user/following/${githubUserName}`).auth('token', process.env.ACCESS_TOKEN).set('User-Agent', 'juanca548');
    expect(response.status).to.equal(204);
    expect(response.body).to.eql({});
  });
});
