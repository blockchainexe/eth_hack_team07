const CreateUser = require('../index').CreateUser;
const assert = require('chai').assert;
const httpMocks = require('node-mocks-http');
const events = require('events');
const code = require('../lib/common/code');

describe('/CreateUser', () => {
  describe('OK', () => {
    it('should return a firebase id', (done) => {
      const req = httpMocks.createRequest({
        method: 'POST',
      });
      const res = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });

      res.on('end', () => {
        assert.strictEqual(res.statusCode, code.http.OK);
        const data = JSON.parse(res._getData());
        console.log(data)
        done();
      });

      CreateUser(req, res);
    });
  });
});

