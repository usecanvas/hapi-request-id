# Hapi Request ID

This module is a plugin for Hapi.js that sets the `id` property of each Hapi.js
request object on a server to the value of that request's
[`X-Request-ID` header][heroku-http-request-id]. This makes it easier to
corrolate requests across multiple Hapi applications and things like the
Heroku routing stack.

## Usage

```javascript
const Hapi      = require('hapi');
const RequestID = require('hapi-request-id');
const server    = new Hapi.Server();

server.register([
  RequestID
], function(err) {
  /* etc. */
});
```

[heroku-http-request-id]: https://devcenter.heroku.com/articles/http-request-id
