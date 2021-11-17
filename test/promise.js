// Copyright 2021 SmugMug, Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

/* eslint-env mocha */

var subject = require('..');
var harness = require('./harness');

describe('promise', function () {

  function app(algorithm, encoding) {
    return async function (req, res) {
      res.end(await subject.promise(req, algorithm, encoding));
    };
  }

  harness(app);

});
