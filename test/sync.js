// Copyright 2021 SmugMug, Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

/* eslint-env mocha */

import { sync } from '../index.js';
import harness from './harness.js';

describe('sync', function () {

  function app(algorithm, encoding) {
    return function (req, res) {
      var body = '';

      req.on('data', function (data) {
        body += String(data);
      });

      req.on('end', function () {
        res.end(sync(req, body, algorithm, encoding));
      });
    };
  }

  harness(app);

});
