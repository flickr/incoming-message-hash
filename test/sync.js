// Copyright 2016 Yahoo Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

/* eslint-env mocha */

var subject = require('..');
var harness = require('./harness');

describe('sync', function () {

  function app(algorithm, encoding, ignore) {
    return function (req, res) {
      var body = '';

      req.on('data', function (data) {
        body += String(data);
      });

      req.on('end', function () {
        res.end(subject.sync(req, body, algorithm, encoding, ignore));
      });
    };
  }

  harness(app);

});
