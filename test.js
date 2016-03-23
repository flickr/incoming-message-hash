// Copyright 2016 Yahoo Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

var subject = require(__dirname);
var request = require('supertest');

describe('hash', function() {
  function app(algorithm, encoding) {
    return function (req, res) {
      req.pipe(subject(algorithm, encoding)).pipe(res);
    };
  }

  it('hashes an http.IncomingMessage', function(done) {
    request(app())
    .get('/')
    .set('host', 'localhost:4567')
    .expect('09a3df93c944461cee09969f2a4bb848', done);
  });
  it('produces a different hash for a different path', function(done) {
    request(app())
    .get('/quux')
    .set('host', 'localhost:4567')
    .expect('85713c266b81f0be1d61b281405bafc0', done);
  });
  it('produces a different hash for a different query string', function (done) {
    request(app())
    .get('/?foo=1')
    .set('host', 'localhost:4567')
    .expect('f688a385e4fad0700c0db23f6d2c7434', done);
  });
  it('produces a different hash for a different method', function(done) {
    request(app())
    .post('/')
    .set('host', 'localhost:4567')
    .expect('31c4e9ea422c968d96092259bdca158e', done);
  });
  it('produces a different hash for different headers', function(done) {
    request(app())
    .get('/')
    .set('host', 'localhost:4567')
    .set('x-foo', 'bar')
    .expect('46e486ddb60f2236f77c8bbe29d6c760', done);
  });
  it('produces a different hash for a different post body', function (done) {
    request(app())
    .post('/')
    .set('host', 'localhost:4567')
    .send('yay')
    .expect('e84cf2827fbc172a5957e3b29a1f47d5', done);
  });
  it('produces the same hash for different ordered query params', function (done) {
    request(app())
    .get('/?foo=1&bar=2')
    .set('host', 'localhost:4567')
    .expect('2f8a8a2c8b6f286e65848160ba8c6ab1', function () {
      request(app())
      .get('/?bar=2&foo=1')
      .set('host', 'localhost:4567')
      .expect('2f8a8a2c8b6f286e65848160ba8c6ab1', done);
    });
  });
  it('can use a different hash algorithm', function(done) {
    request(app('sha1'))
    .get('/')
    .set('host', 'localhost:4567')
    .expect('d8b3b0f8af8babb29291719b3bbbaa45b1aaaa85', done);
  });
  it('can use a different encoding', function(done) {
    request(app('md5', 'base64'))
    .get('/')
    .set('host', 'localhost:4567')
    .expect('CaPfk8lERhzuCZafKku4SA==', done);
  });
});
