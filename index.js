var es = require('event-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var ext = gutil.replaceExtension;
var PluginError = gutil.PluginError;

var gulpEngine = function(engine, replaceExtension) {
  replaceExtension = replaceExtension || function (p) {
    return ext(p, '.html')
  };
  return function (options) {
    options = options || {};
    return es.map(function (file, callback) {
      var data = options.data || {};
      if (typeof data == 'function') {
        data = data(file);
      }
      data = Object.assign({}, data);
      if (file.data) {
        data = Object.assign(data, file.data);
      }
      try {
        var tpl = engine(String(file.contents), Object.assign({}, options), file.path);
        var compiled = tpl(data);

        file.path = replaceExtension(file.path);
        file.contents = new Buffer(compiled);

        callback(null, file);
      } catch(err) {
        callback(new PluginError('gulp-engine', err));
        callback();
      }
    });
  }
};

gulpEngine.swig = function (swig) {
  return gulpEngine(function (template, options, p) {
    return new swig.Swig(options).compile(template, {filename: p});
  });
};
module.exports = gulpEngine;
