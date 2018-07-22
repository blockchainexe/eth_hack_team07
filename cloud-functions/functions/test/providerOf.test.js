const ProviderOf = require('../index').ProviderOf;
const assert = require('chai').assert;
const httpMocks = require('node-mocks-http');
const events = require('events');
const code = require('../lib/common/code');

describe('/ProviderOf', () => {
  describe('OK', () => {
    it('should return a nonce', (done) => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: {
          address: "0xc633c8d9e80a5e10bb939812b548b821554c49a6",
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

      ProviderOf(req, res);
    });
  });
});

