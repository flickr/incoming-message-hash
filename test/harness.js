// Copyright 2019 SmugMug, Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

/* eslint-env mocha */

var request = require('supertest');
var fixture = require('./fixture');

/**
 * Shared expectations for each version of the hash API.
 */

module.exports = function (app) {

  it('hashes an http.IncomingMessage', function (done) {
    request(app())
    .get('/')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .expect(fixture[this.test.title], done);
  });

  it('produces a different hash for a different path', function (done) {
    request(app())
    .get('/quux')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .expect(fixture[this.test.title], done);
  });

  it('produces a different hash for a different query string', function (done) {
    request(app())
    .get('/?foo=1&bar=2')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .expect(fixture[this.test.title], done);
  });

  it('produces the same hash for different ordered query params', function (done) {
    request(app())
    .get('/?bar=2&foo=1')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .expect(fixture[this.test.title], done);
  });

  it('produces a different hash for a different method', function (done) {
    request(app())
    .post('/')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .expect(fixture[this.test.title], done);
  });

  it('produces a different hash for different headers', function (done) {
    request(app())
    .get('/')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .set('x-foo', 'bar')
    .expect(fixture[this.test.title], done);
  });

  it('produces a different hash for a different post body', function (done) {
    request(app())
    .post('/')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .send('yay')
    .expect(fixture[this.test.title], done);
  });

  it('can use a different hash algorithm', function (done) {
    request(app('sha1'))
    .get('/')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .expect(fixture[this.test.title], done);
  });

  it('can use a different encoding', function (done) {
    request(app('md5', 'base64'))
    .get('/')
    .set('host', 'localhost:4567')
    .set('user-agent', 'node-superagent/1.3.0')
    .expect(fixture[this.test.title], done);
  });

};
