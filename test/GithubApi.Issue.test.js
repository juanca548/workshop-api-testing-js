const agent = require('superagent');
const { expect } = require('chai');
const statusCode = require('http-status-codes');

const urlBase = 'https://api.github.com';

describe('Consume Github Api method POST and PATCH', async () => {
  let loggedUser = {};
  let publicRepo = {};
  let issue = {};
  it('logged user and verify public repo', async () => {
    const response = await agent.get(`${urlBase}/user`).auth('token', process.env.ACCESS_TOKEN).set('User-Agent', 'juanca548');
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.public_repos).to.be.greaterThanOrEqual(1);
    loggedUser = response.body;
  });

  it('Search a Repo and create an Issue', async () => {
    const response = await agent.get(loggedUser.repos_url).auth('token', process.env.ACCESS_TOKEN).set('User-Agent', 'juanca548');
    expect(response.status).to.equal(statusCode.OK);
    const repoFound = response.body.find(
      (element) => element.name === 'workshop-api-testing-js'
    );
    publicRepo = repoFound;
    const res = await agent.post(`https://api.github.com/repos/${loggedUser.login}/${publicRepo.name}/issues`).auth('token', process.env.ACCESS_TOKEN).set('User-Agent', 'juanca548').send({ title: 'test' });
    expect(res.body.title).to.equal('test');
    expect(res.body.body).to.equal(null);
    issue = res.body;
  });

  it('Update Issue', async () => {
    const response = await agent.patch(`https://api.github.com/repos/${loggedUser.login}/${publicRepo.name}/issues/${issue.number}`).auth('token', process.env.ACCESS_TOKEN).set('User-Agent', 'juanca548').send({ body: 'Body Description' });
    expect(response.body.title).to.equal('test');
    expect(response.body.body).to.equal('Body Description');
  });
});
