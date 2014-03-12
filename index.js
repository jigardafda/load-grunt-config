var gruntConfig = require('./lib/gruntconfig');
var path = require('path');
var fs = require('fs');
var _ = require('lodash-node');

var cwd = process.cwd();
var defaults = {
  configPath: path.join(cwd, 'grunt'),
  init: true,
  data: {}
};

module.exports = function(grunt, options, callback) {

  options = options || {};
  callback = callback || function() {};
  if (options.config) {
    options.data = options.config;
    delete options.config;
  }
  var opts = _.merge({}, defaults, options);

  var packageJsonPath = path.join(cwd, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    var packageData = require(packageJsonPath);
    opts.data.package = packageData;
  }


  gruntConfig(grunt, opts, function(err, config) {

    if (err) {
      return callback(err);
    }

    if (opts.init) {
      grunt.initConfig(config);
    }

    callback(err, config);


  });

};
