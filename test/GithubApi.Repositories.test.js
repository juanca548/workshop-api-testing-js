const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');
const crypto = require('crypto');

const urlBase = 'https://api.github.com';
const githubUserName = 'aperdomob';
const repository = 'jasmine-awesome-report';

const createMD5Hash = (input) => crypto.createHash('md5').update(input).digest('hex');

describe('Consume Github Api method GET', () => {
  let selectedRepo;
  it('Check user information from Github', async () => {
    const response = await agent.get(`${urlBase}/users/${githubUserName}`).set('User-Agent', 'juanca548');
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.name).equal('Alejandro Perdomo');
    expect(response.body.company).equal('Perficient Latam');
    expect(response.body.location).equal('Colombia');
  });

  it('Search jasmine-awesome-report', async () => {
    const response = await agent.get(`${urlBase}/users/${githubUserName}/repos`).set('User-Agent', 'juanca548');
    expect(response.status).to.equal(statusCode.OK);
    const repo = response.body.find(
      (element) => element.name === repository
    );
    expect(repo.name).equal(repository);
    expect(repo.private).to.equal(false);
    selectedRepo = repo;
  });

  it('Download Repo', async () => {
    const repositoryUrl = `${selectedRepo.url}/zipball/master`;
    const response = await agent.get(repositoryUrl).set('User-Agent', 'juanca548');
    expect(response.status).to.equal(statusCode.OK);
    expect(createMD5Hash(response.body)).to.equal(
      'df39e5cda0f48ae13a5c5fe432d2aefa'
    );
  });

  it('Check and Download README', async () => {
    const readmeUrl = `${selectedRepo.url}/contents/README.md`;
    const response = await agent.get(readmeUrl).set('User-Agent', 'juanca548');
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.sha).to.equal('1eb7c4c6f8746fcb3d8767eca780d4f6c393c484');
    expect(response.body.path).to.equal('README.md');
    expect(response.body.name).to.equal('README.md');
    const readme = await agent.get(response.body.download_url).set('User-Agent', 'juanca548');
    expect(readme.status).to.equal(statusCode.OK);
    expect(createMD5Hash(readme.text)).to.equal(
      '97ee7616a991aa6535f24053957596b1'
    );
  });
});
