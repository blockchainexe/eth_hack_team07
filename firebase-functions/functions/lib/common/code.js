"use strict"

module.exports.http = Object.freeze({
  OK: 200,
  BadRequest: 400,
  Unauthorized: 401,
  NotFound: 404,
  Internal: 500,
})

module.exports.grpc = Object.freeze({
  OK: 0,
  Canceled: 1,
  Unknown: 2,
  InvalidArgument: 3,
  DeadlineExceeded: 4,
  NotFound: 5,
  AlreadyExists: 6,
  PermissionDenied: 7,
  ResourceExhausted: 8,
  FailedPrecondition: 9,
  Aborted: 10,
  OutOfRange: 11,
  Unimplemented: 12,
  Internal: 13,
  Unavailable: 14,
  DataLoss: 15,
  Unauthenticated: 16,
})

module.exports.jsonrpc = Object.freeze({
  ParseError: -32700,
  InvalidRequest: -32600,
  MethodNotFound: -32601,
  InvalidParams: -32602,
  Internal: -32603,
})

module.exports.j2h = (code) => {
  if (module.exports.jsonrpc.Internal === code) {
    return module.exports.http.Internal
  }

  return module.exports.http.BadRequest
}

module.exports.j2g = (code) => {
  if (module.exports.jsonrpc.Internal === code) {
    return module.exports.grpc.Internal
  }

  return module.exports.grpc.InvalidArgument
}
