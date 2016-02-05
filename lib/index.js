'use strict';

module.exports.register = function(server, _options, next) {
  var header = (_options && _options.header) || 'x-request-id';
  server.ext('onRequest', function(request, reply) {
    request.id = request.headers[header] || request.id;
    return reply.continue();
  });

  next();
};

module.exports.register.attributes = {
  pkg: require('../package.json'),
};
