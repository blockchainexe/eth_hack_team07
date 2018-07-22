const GetLoginUrl = require('../index').GetLoginUrl;
const assert = require('chai').assert;
const httpMocks = require('node-mocks-http');
const events = require('events');
const code = require('../lib/common/code');

describe('/GetLoginUrl', () => {
  describe('OK', () => {
    it('should get user data', (done) => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: {
          userid:"C4KAeEeakT4arvEXJdgy",
        },
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

      GetLoginUrl(req, res);
    });
  });
});

