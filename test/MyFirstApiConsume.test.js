const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

describe('First Api Tests', () => {
  it('Consume GET Service', async () => {
    const response = await agent.get('https://httpbin.org/ip');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('origin');
  });

  it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    const response = await agent.get('https://httpbin.org/get').query(query);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.args).to.eql(query);
  });

  it('Consume HEAD Service', async () => {
    const response = await agent.head('https://httpbin.org/get');
    expect(response.status).to.equal(statusCode.OK);
    expect(response.header).to.have.property('date');
  });

  it('Consume PATCH Service', async () => {
    const response = await agent.patch('https://httpbin.org/patch');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('origin');
  });

  it('Consume PUT Service', async () => {
    const response = await agent.put('https://httpbin.org/put');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('origin');
  });

  it('Consume DELETE Servive', async () => {
    const response = await agent.delete('https://httpbin.org/delete');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('origin');
  });
});
