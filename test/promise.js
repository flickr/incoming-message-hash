// Copyright 2021 SmugMug, Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

/* eslint-env mocha */

import { promise } from '../index.js';
import harness from './harness.js';

describe('promise', function () {

  function app(algorithm, encoding) {
    return async function (req, res) {
      res.end(await promise(req, algorithm, encoding));
    };
  }

  harness(app);

});
