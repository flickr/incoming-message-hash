// Copyright 2021 SmugMug, Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

/* eslint-env mocha */

import subject from '../index.js';
import harness from './harness.js';

describe('stream', function () {

  function app(algorithm, encoding) {
    return function (req, res) {
      req.pipe(subject(algorithm, encoding)).pipe(res);
    };
  }

  harness(app);

});
