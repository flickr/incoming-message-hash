// Copyright 2016 Yahoo Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

var subject = require('..');
var harness = require('./harness');

describe('stream', function() {

  function app(algorithm, encoding) {
    return function (req, res) {
      req.pipe(subject(algorithm, encoding)).pipe(res);
    };
  }

  harness(app);

});
