const agent = require('superagent');
const { expect } = require('chai');
const statusCode = require('http-status-codes');

describe('Consume Github Api method DELETE', async () => {
  let gist;
  it('create a gist', async () => {
    const response = await agent.post('https://api.github.com/gists').auth('token', process.env.ACCESS_TOKEN).set('User-Agent', 'juanca548')
      .send({
        files: {
          'promise.js': {
            content: 'test'
          }
        },
        public: true
      });
    expect(response.status).to.equal(201);
    gist = response.body;
    expect(gist.public).to.equal(true);
    const expectedFile = gist.files['promise.js'];
    expect(expectedFile.content).to.equal('test');
  });

  it('Check gist', async () => {
    const response = await agent.get(gist.url).auth('token', process.env.ACCESS_TOKEN).set('User-Agent', 'juanca548');
    expect(response.status).to.equal(statusCode.OK);
  });

  it('Delete gist and check elimination', async () => {
    const response = await agent.delete(gist.url).auth('token', process.env.ACCESS_TOKEN).set('User-Agent', 'juanca548');
    expect(response.status).to.equal(204);
    try {
      await agent.get(gist.url).auth('token', process.env.ACCESS_TOKEN).set('User-Agent', 'juanca548');
    } catch (error) {
      expect(error.response.status).to.equal(404);
    }
  });
});
