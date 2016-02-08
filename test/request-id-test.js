'use strict';

var Hapi      = require('hapi');
var RequestID = require('../lib');
var expect    = require('chai').expect;

describe('Hapi Request ID', function() {
  var requestID = '12345678-1234-1234-1234-123456789012';
  var server;
  beforeEach(function() {
    server = new Hapi.Server();
    server.connection();

    server.route({
      method: 'GET',
      path: '/',
      handler: function handler(request, reply) {
        reply(request.id);
      }
    });
  });

  context('when not given a header option', function() {
    beforeEach(function(done) {
      server.register(RequestID, done);
    });

    it('uses "x-request-id" as the request ID header', function(done) {
      testWithHeader(server, 'x-request-id', function onResponse(response) {
        expect(response.payload).to.eql(requestID);
        done();
      });
    });
  });

  context('when given a header option', function() {
    beforeEach(function(done) {
      server.register({
        register: RequestID,
        options: { header: 'request-id' }
      }, done);
    });

    it('uses the given header as the request ID header', function(done) {
      testWithHeader(server, 'request-id', function onResponse(response) {
        expect(response.payload).to.eql(requestID);
        done();
      });
    });
  });

  function testWithHeader(server, headerName, callback) {
    var headers = {};
    headers[headerName] = requestID;

    server.inject({
      method: 'GET',
      url: '/',
      headers: headers
    }, callback);
  }
});
