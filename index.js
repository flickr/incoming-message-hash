// Copyright 2016 Yahoo Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

var crypto = require('crypto');
var url = require('url');

module.exports = createHash;

function createHash(algorithm, encoding) {
  var hash = crypto.createHash(algorithm || 'md5');

  hash.setEncoding(encoding || 'hex');

  hash.on('pipe', function (req) {
    var parts = url.parse(req.url, true);

    hash.update(req.httpVersion);
    hash.update(req.method);
    hash.update(parts.pathname);
    hash.update(JSON.stringify(sort(parts.query)));
    hash.update(JSON.stringify(sort(req.headers)));
    hash.update(JSON.stringify(sort(req.trailers)));
  });

  return hash;
}

function sort(obj) {
  var ret = {};

  Object.keys(obj).sort().forEach(function (key) {
    ret[key] = obj[key];
  });

  return ret;
}
