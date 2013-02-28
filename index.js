var fs    = require('fs')
  , path  = require('path')
  , spawn = require('child_process').spawn;



exports.compile = function (stylesheet, options, callback) {

  // Allow for not passing options.
  if ('function' === typeof options) {
    callback = options;
    options = null;
  }

  options || (options = {});

  var args     = []
    , basename = path.basename(stylesheet, path.extname(stylesheet))
    , output   = [];

  // Make sure the stylesheet exists.
  fs.exists(stylesheet, function (exists) {
    if (!exists) callback(new Error("'" + stylesheet + "'  doesn't exist."));

    // Push extra options.
    if (options.compass)   args.push('--compass');
    if (options.noCache)   args.push('--no-cache');
    if (options.style)     args.push('--style', options.style);
    if (options.precision) args.push('--precision', options.precision);
    if (options.loadPath)  args.push('--load-path', options.loadPath);
    if (options.require)   args.push('--require', options.require);

    // Input.
    args.push(stylesheet);

    // Run `sass` in a child process.
    var sass = spawn('sass', args);

    sass.stdout.setEncoding('utf8');
    sass.stdout.on('data', function (data) {
      output.push(new Buffer(data));
    });

    sass.stderr.setEncoding('utf8');
    sass.stderr.on('data', function (data) {
      callback(new Error(data));
    });

    // Read the generated css file on exit.
    sass.on('exit', function (code) {
      if (code !== 0) return callback(new Error('Error exiting: ' + code));
      return callback(null, Buffer.concat(output).toString());
    });
  });
};
