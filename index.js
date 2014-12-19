/**
 * Module dependencies.
 */
var path = require('path');
var merge = require('utils-merge');
var parseurl = require('parseurl');
var mime = require('mime');
var gm = require('gm');

/**
 * @param {String} root
 * @param {Object} options
 * @return {Function}
 * @api public
 */

exports = module.exports = function serveStatic(root, options) {
  if (!root) {
    throw new TypeError('root path required')
  }

  if (typeof root !== 'string') {
    throw new TypeError('root path must be a string')
  }

  // copy options object
  options = merge({}, options)

  // resolve root to absolute
  root = path.resolve(root)

  // setup options for send
  options.root = root;
  options.extensions = options.extensions
    ? options.extensions
    : ['jpg', 'png'];


  return function expressImage(req, res, next) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next()
    }

    var pathname = path.join(options.root, parseurl(req).pathname);
    var extension = path.extname(pathname).substr(1);
    var params = req.query;

    if (options.extensions.indexOf(extension) === -1) {
      return next();
    }

    res.set('content-type', mime.lookup(extension))

    var width = params.w;
    var height = params.h;
    var flag = '' + (params.f ? '!' : '');

    if (!(width || height)) {
      res.sendFile(pathname);
    }

    gm(pathname)
      .resize(width, height, flag)
      .stream()
      .pipe(res);

  }
}
