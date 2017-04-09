// Copyright 2016 Yahoo Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

var crypto = require('crypto');
var url = require('url');

module.exports = createStream;

function ConflictingOptionsError(message) {
  this.message = message;
}

ConflictingOptionsError.prototype = Object.create(Error.prototype);

function createStream(options) {

  var options = options || {};

  if (options.includeHeaders && options.excludeHeaders) {
    throw new ConflictingOptionsError('Can\'t have both includeHeaders and excludeHeaders in options')
  }

  var hash = createHash(options.algorithm);

  hash.on('pipe', function (req) {
    updateHash(hash, req, options || {});
  });

  hash.setEncoding(options.encoding || 'hex');

  return hash;
}

createStream.sync = function (req, body, options) {

  var options = options || {};

  var hash = createHash(options.algorithm);

  updateHash(hash, req, options);

  hash.write(body);

  return hash.digest(options.encoding || 'hex');
};

function createHash(algorithm) {
  return crypto.createHash(algorithm || 'md5');
}

function updateHash(hash, req, options) {

  var parts = url.parse(req.url, true);

  var headers = JSON.parse(JSON.stringify(req.headers));

  if (options.excludeHeaders) {
    for (var key in headers) {
      if (options.excludeHeaders.includes(key)) {
        delete headers[key]
      }
    }
  }
  if (options.includeHeaders) {
    for (var key in headers) {
      if (!options.includeHeaders.includes(key)) {
        delete headers[key]
      }
    }
  }

  hash.update(req.httpVersion);
  hash.update(req.method);
  hash.update(parts.pathname);
  hash.update(JSON.stringify(sort(parts.query)));
  hash.update(JSON.stringify(sort(headers)));
  hash.update(JSON.stringify(sort(req.trailers)));
}

function sort(obj) {
  var ret = {};

  Object.keys(obj).sort().forEach(function (key) {
    ret[key] = obj[key];
  });

  return ret;
}
