const GetUserData = require('../index').GetUserData;
const assert = require('chai').assert;
const httpMocks = require('node-mocks-http');
const events = require('events');
const code = require('../lib/common/code');

describe('/GetUserData', () => {
  describe('OK', () => {
    it('should get user data', (done) => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: {
          userid:"C4KAeEeakT4arvEXJdgy",
        }
      });
      const res = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });

      res.on('end', () => {
        assert.strictEqual(res.statusCode, code.http.OK);
        done();
      });

      GetUserData(req, res);
    });
  });
});

