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
    , random   = Math.floor(Math.random() + new Date().getTime())
    , output   = path.join('/tmp', basename + random + '.css');

  // Make sure the stylesheet exists.
  fs.exists(stylesheet, function (exists) {
    if (!exists) callback(new Error("'" + stylesheet + "'  doesn't exist."));

    // Push extra options.
    if (options.compass)   args.push('--compass');
    if (options.style)     args.push('--style', options.style);
    if (options.precision) args.push('--precision', options.precision);
    if (options.loadPath)  args.push('--load-path', options.loadPath);
    if (options.require)   args.push('--require', options.require);

    // Disable the default Sass cache.
    // args.push('--no-cache');

    // Input + output.
    args.push(stylesheet, output);

    // Run `sass` in a child process.
    var sass = spawn('sass', args);

    sass.stdout.setEncoding('utf8');
    sass.stdout.on('data', function (data) {
      console.log(data.toString());
    });

    sass.stderr.setEncoding('utf8');
    sass.stderr.on('data', function (data) {
      callback(new Error(data));
    });

    // Read the generated css file on exit.
    sass.on('exit', function (code) {
      if (code !== 0) return;
      fs.readFile(output, 'utf8', function (err, data) {
        if (err) callback(err, null);
        callback(null, data);
      });
    });
  });
};
