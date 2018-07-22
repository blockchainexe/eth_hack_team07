const SendDQN = require('../index').SendDQN;
const assert = require('chai').assert;
const httpMocks = require('node-mocks-http');
const events = require('events');
const code = require('../lib/common/code');

describe('/SendDQN', () => {
  describe('OK', () => {
    it('should sendDQN', (done) => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: {
          to: "0xc633c8d9e80a5e10bb939812b548b821554c49a6",
          value: "10",
        },
      });
      const res = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });

      res.on('end', () => {
        assert.strictEqual(res.statusCode, code.http.OK);
        const data = JSON.parse(res._getData());
        console.log(data)
        //assert.typeOf(data.nonce, 'number');
        //assert.isAbove(data.nonce, 10);
        done();
      });

      SendDQN(req, res);
    });
  });
});

