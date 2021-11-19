// Copyright 2021 SmugMug, Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

import { createHash } from 'crypto';
import { parse } from 'url';


/**
 * The default digest algorithm to use
 * @see https://nodejs.org/dist/latest-v16.x/docs/api/crypto.html#cryptocreatehashalgorithm-options
 */

const DEFAULT_ALGORITHM = 'md5';

/**
 * The default digest encoding to return
 * @type {BufferEncoding}
 */

const DEFAULT_ENCODING = 'hex';

/**
 * Returns a new `crypto.Hash` stream using the specified algorithm and encoding
 * (defaults to "md5" and "hex"). You can pipe your `http.IncomingMessage` in
 * and get a hash back.
 *
 * @param {string} algorithm
 * @param {BufferEncoding} encoding
 * @returns {import('crypto').Hash}
 * @example
 *
 * import hash from 'incoming-message-hash'
 * import { createServer } from 'http'
 *
 * createServer((req, res) => {
 *   req.pipe(hash()).pipe(res)
 * })
 */

export default function createStream(algorithm = DEFAULT_ALGORITHM, encoding = DEFAULT_ENCODING) {
  const hash = createHash(algorithm);

  hash.on('pipe', function (req) {
    updateHash(hash, req);
  });

  hash.setEncoding(encoding);

  return hash;
}

// backwards-compatibility
createStream.sync = sync;
createStream.promise = promise;

/**
 * Synchronous version of `hash()` that accepts an http.IncomingMessage and its
 * body and returns the hash. You must buffer up the request body yourself
 * if you wish to use this method.

 * @param {import('http').IncomingMessage} req
 * @param {string|Buffer} body
 * @param {string} algorithm
 * @param {BufferEncoding} encoding
 * @async
 * @returns {string}
 * @example
 *
 * import { promise } from 'incoming-message-hash'
 * import { createServer } from 'http'
 *
 * createServer(async function (req, res) {
 *   let body = ''
 *
 *   req.on('data', chunk => body += String(chunk))
 *
 *   req.on('end', () => {
 *     res.end(sync(req, body))
 *   })
 * })
 */

export function sync(req, body, algorithm = DEFAULT_ALGORITHM, encoding = DEFAULT_ENCODING) {
  const hash = createHash(algorithm);

  updateHash(hash, req);

  hash.write(body);

  return hash.digest(encoding);
}

/**
 * Asynchronous version of `hash()` that accepts an `http.IncomingMessage` and
 * buffers the request body up for you.
 *
 * @param {import('http').IncomingMessage} req
 * @param {string} algorithm
 * @param {BufferEncoding} encoding
 * @async
 * @returns {Promise<string>}
 * @example
 *
 * import { promise } from 'incoming-message-hash'
 * import { createServer } from 'http'
 *
 * createServer(async (req, res) => {
 *   res.end(await promise(req))
 * })
 */

export function promise(req, algorithm = DEFAULT_ALGORITHM, encoding = DEFAULT_ENCODING) {
  const hash = createHash(algorithm);

  updateHash(hash, req);

  return new Promise(function (resolve, reject) {
    req.on('error', function (err) {
      reject(err);
    });

    req.on('data', function (data) {
      hash.write(data);
    });

    req.on('end', function () {
      resolve(hash.digest(encoding));
    });
  });
}

function updateHash(hash, req) {
  const parts = parse(req.url, true);

  hash.update(req.httpVersion);
  hash.update(req.method);
  hash.update(parts.pathname);
  hash.update(JSON.stringify(sort(parts.query)));
  hash.update(JSON.stringify(sort(req.headers)));
  hash.update(JSON.stringify(sort(req.trailers)));
}

function sort(obj) {
  var ret = {};

  Object.keys(obj).sort().forEach(function (key) {
    ret[key] = obj[key];
  });

  return ret;
}
