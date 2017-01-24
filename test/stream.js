// Copyright 2016 Yahoo Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

/* eslint-env mocha */

var subject = require('..');
var harness = require('./harness');

describe('stream', function () {

  function app(algorithm, encoding, ignore) {
    return function (req, res) {
      req.pipe(subject(algorithm, encoding, ignore)).pipe(res);
    };
  }

  harness(app);

});
