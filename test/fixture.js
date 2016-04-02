// Copyright 2016 Yahoo Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

/**
 * nodejs changes the behavior of the http module slightly in various
 * releases; this module accounts for those changes in our test results.
 */

exports['hashes an http.IncomingMessage'] =
  '09a3df93c944461cee09969f2a4bb848';

exports['produces a different hash for a different path'] =
  '85713c266b81f0be1d61b281405bafc0';

exports['produces a different hash for a different query string'] =
exports['produces the same hash for different ordered query params'] =
  '2f8a8a2c8b6f286e65848160ba8c6ab1';

exports['produces a different hash for a different method'] =
  '31c4e9ea422c968d96092259bdca158e';

exports['produces a different hash for different headers'] =
  '46e486ddb60f2236f77c8bbe29d6c760';

exports['produces a different hash for a different post body'] =
  'e84cf2827fbc172a5957e3b29a1f47d5';

exports['can use a different hash algorithm'] =
  'd8b3b0f8af8babb29291719b3bbbaa45b1aaaa85'

exports['can use a different encoding'] =
  'CaPfk8lERhzuCZafKku4SA==';
