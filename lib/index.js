'use strict';

module.exports.register = function(server, _options, next) {
  server.ext('onRequest', function(request, reply) {
    request.id = request.headers['x-request-id'] || request.id;
    return reply.continue();
  });

  next();
};

module.exports.register.attributes = {
  pkg: require('../package.json'),
};
