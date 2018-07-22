const SetUserData = require('../index').SetUserData;
const assert = require('chai').assert;
const httpMocks = require('node-mocks-http');
const events = require('events');
const code = require('../lib/common/code');

describe('/CreateUser', () => {
  describe('OK', () => {
    it('should set user data', (done) => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: {
          userid:"C4KAeEeakT4arvEXJdgy",
          name:"test",
          address:"test",
        }
      });
      const res = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });

      res.on('end', () => {
        assert.strictEqual(res.statusCode, code.http.OK);
        done();
      });

      SetUserData(req, res);
    });
  });
});

