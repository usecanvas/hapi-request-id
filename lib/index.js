'use strict';

module.exports.register = function(server, options, next) {
  var header = (options && options.header) || 'x-request-id';
  server.ext('onRequest', function(request, reply) {
    request.id = request.headers[header] || request.id;
    return reply.continue();
  });

  next();
};

module.exports.register.attributes = {
  pkg: require('../package.json'),
};
