// Copyright 2016 Yahoo Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

var crypto = require('crypto');
var url = require('url');

module.exports = createStream;

function createStream(algorithm, encoding, ignore) {
  var hash = createHash(algorithm);

  hash.on('pipe', function (req) {
    updateHash(hash, req, ignore);
  });

  hash.setEncoding(encoding || 'hex');

  return hash;
}

createStream.sync = function (req, body, algorithm, encoding, ignore) {
  var hash = createHash(algorithm);

  updateHash(hash, req, ignore);

  hash.write(body);

  return hash.digest(encoding || 'hex');
};

function createHash(algorithm) {
  return crypto.createHash(algorithm || 'md5');
}

function updateHash(hash, req, ignore) {
  var parts = url.parse(req.url, true);

  if (ignore) {
    for (let param in ignore) {
      delete parts.query[ignore[param]];
    }
  }

  hash.update(req.httpVersion);
  hash.update(req.method);
  hash.update(parts.pathname);
  hash.update(JSON.stringify(sort(parts.query)));
  hash.update(JSON.stringify(sort(req.headers)));
  hash.update(JSON.stringify(sort(req.trailers)));
}

function sort(obj) {
  var ret = {};

  Object.keys(obj).sort().forEach(function (key) {
    ret[key] = obj[key];
  });

  return ret;
}
