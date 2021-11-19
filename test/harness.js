// Copyright 2021 SmugMug, Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

/* eslint-env mocha */

import request from 'supertest';

/**
 * Shared expectations for each version of the hash API.
 */

export default function (app) {

  it('hashes an http.IncomingMessage', function () {
    return request(app())
    .get('/')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .expect('09a3df93c944461cee09969f2a4bb848');
  });

  it('produces a different hash for a different path', function () {
    return request(app())
    .get('/quux')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .expect('85713c266b81f0be1d61b281405bafc0');
  });

  it('produces a different hash for a different query string', function () {
    return request(app())
    .get('/?foo=1&bar=2')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .expect('2f8a8a2c8b6f286e65848160ba8c6ab1');
  });

  it('produces the same hash for different ordered query params', function () {
    return request(app())
    .get('/?bar=2&foo=1')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .expect('2f8a8a2c8b6f286e65848160ba8c6ab1');
  });

  it('produces a different hash for a different method', function () {
    return request(app())
    .post('/')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .expect('6db371c210f891e15229c3a9470da6a6');
  });

  it('produces a different hash for different headers', function () {
    return request(app())
    .get('/')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .set('x-foo', 'bar')
    .expect('46e486ddb60f2236f77c8bbe29d6c760');
  });

  it('produces a different hash for a different post body', function () {
    return request(app())
    .post('/')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .send('yay')
    .expect('e84cf2827fbc172a5957e3b29a1f47d5');
  });

  it('can use a different hash algorithm', function () {
    return request(app('sha1'))
    .get('/')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .expect("d8b3b0f8af8babb29291719b3bbbaa45b1aaaa85");
  });

  it('can use a different encoding', function () {
    return request(app('md5', 'base64'))
    .get('/')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .expect('CaPfk8lERhzuCZafKku4SA==');
  });

}
