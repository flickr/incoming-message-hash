# incoming-message-hash

Generate a one-way hash from an [http.IncomingMessage][]

## install

``` bash
$ npm install incoming-message-hash --save
```

## example

This example demonstrates how the hashing function returns a different hash based on the IncomingMessage's method, path, query string, headers and body.

``` js
var hash = require('incoming-message-hash');
var http = require('http');

http.createServer(function (req, res) {
  req.pipe(hash()).pipe(res);
}).listen(4567, function () {
  console.log('Server is listening on port 4567');
});
```

``` bash
$ curl http://localhost:4567; echo
e91caf6d7b009b5af0fb2e18cff95598
$ curl http://localhost:4567/foo; echo
2f24d536fd0ca7c4eb72a8d64440066f
$ curl http://localhost:4567/foo?a=b; echo
0bb92c398df54668d9020b835c345cb8
$ curl http://localhost:4567/foo?a=c; echo
02bd995c9ebccfc0332619a03ce0a688
$ curl -H "Host: www.flickr.com" http://localhost:4567; echo
ce8f3e6257911a9499923d0deebe56b5
$ curl -X POST http://localhost:4567; echo
41ba64dca3f3070b361b302a17742973
$ curl -X POST -d "yay" http://localhost:4567; echo
64ae029a6a4add75fadb03811a13caa7
```

## usage

``` js
var hash = require('incoming-message-hash');
```

### hash([algorithm='md5'[, encoding='hex']])

Returns a new [crypto.Hash][] stream using the specified algorithm and encoding (defaults to "md5" and "hex"). You can pipe your [http.IncomingMessage][] in and get a hash back.

[http.IncomingMessage]: https://nodejs.org/api/http.html#http_class_http_incomingmessage
[crypto.Hash]: https://nodejs.org/api/crypto.html#crypto_class_hash

### hash.sync(req, body, [algorithm='md5'[, encoding='hex']])

Synchronous version of `hash()` that accepts the http.IncomingMessage and its body and returns the hash. You must buffer up the request body yourself if you wish to use this method.

## license

This software is free to use under the MIT license. See the [LICENSE][] file for license text and copyright information.

[LICENSE]: https://github.com/flickr/incoming-message-hash/blob/master/LICENSE
