// Copyright 2019 SmugMug, Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

var hash = require(__dirname);
var http = require('http');

http.createServer(function (req, res) {
  req.pipe(hash()).pipe(res);
}).listen(4567, function () {
  console.log('Server is listening on port 4567');
});
