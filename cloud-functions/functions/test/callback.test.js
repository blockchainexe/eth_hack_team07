const Callback = require('../index').Callback;
const assert = require('chai').assert;
const httpMocks = require('node-mocks-http');
const events = require('events');
const code = require('../lib/common/code');

const access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpYXQiOjE1MzIyMDI1NjksImV4cCI6MTUzMjI4ODk2OSwiYXVkIjoiMm9vRVY0MVNiMU5pMk1DbzhzTjFwQ0RLYkN2OTE5YzhLNnQiLCJ0eXBlIjoic2hhcmVSZXNwIiwibmFkIjoiMm9nVkpGWUptVjhTV2RuWkVwSlB3cFdxNkN4Y2d0QUpra3giLCJvd24iOnsibmFtZSI6Im5hbmRlaHUifSwicmVxIjoiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKRlV6STFOa3NpZlEuZXlKcGMzTWlPaUl5YjI5RlZqUXhVMkl4VG1reVRVTnZPSE5PTVhCRFJFdGlRM1k1TVRsak9FczJkQ0lzSW1saGRDSTZNVFV6TWpJd01qVTFPQ3dpY21WeGRXVnpkR1ZrSWpwYkltNWhiV1VpTENKd2FHOXVaU0lzSW1sa1pXNTBhWFI1WDI1dklpd2lUWGtnVkdsMGJHVWlYU3dpWTJGc2JHSmhZMnNpT2lKb2RIUndjem92THprMU1ERTNOREE0TG01bmNtOXJMbWx2TDJGd2FTOTJNUzlzYjJkcGJpOWpZV3hzWW1GamF6OTFhV1E5ZEdWemRDSXNJbVY0Y0NJNk1UVXpNakl3TWpnMU9Dd2lkSGx3WlNJNkluTm9ZWEpsVW1WeEluMC4xZHI3ZUJFdi1Ic2lKUkN6MFJqQmVzMFZmSGkzeUxSd2RQcFdGdGpISE4waGdpMWRuMDl5cHBnRWIyMHJ1QVl2MU5NZEFEcVR2NVF5WU5wSGt5N09YZyIsImlzcyI6IjJvZ1ZKRllKbVY4U1dkblpFcEpQd3BXcTZDeGNndEFKa2t4In0.-opwX22aIBzsDE2Fa5SD56OhONGK1JDOQH7F4nG5l0ry95a1bbfF5t0Lg_NJrwkw0dEYgYXugnPUHgv2MXg1Wg';

describe.skip('/Callback', () => {
  describe('OK', () => {
    it('should stire user data', (done) => {
      const req = httpMocks.createRequest({
        method: 'POST',
        query: {
          uid:"C4KAeEeakT4arvEXJdgy",
        },
        body: {
          access_token: access_token,
        }
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

      Callback(req, res);
    });
  });
});

