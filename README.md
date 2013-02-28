# node-sass-wrapper

  `node-sass-wrapper` is a wrapper around the command line Sass gem.

## Install
  
    $ npm install node-sass-wrapper

## Example

  Call `compile` with the path to your Sass stylesheet:
  
  ```js
  var sass = require('node-sass-wrapper');

  sass.compile('path/to/style.sass', function (err, css) {
    if (err) throw err;
    fs.writeFileSync('path/to/style.css', css);
  });
  ```

  You can also pass in options:

  ```js
  var sass = require('node-sass-wrapper');

  var options = {
    compass : true,
    style   : 'compact'
  };

  sass.compile('path/to/style.sass', options, function (err, css) {
    if (err) throw err;
    fs.writeFileSync('path/to/style.css', css);
  });
  ```

## API
  
### compile(path, [options], callback)
 
  Compile the Sass file at `path` and `callback(err, css)`. `options` are optional and map directly to their command line equivalents:
  
  ```js
  {
    compass   : false,
    loadPath  : null,
    noCache   : false,
    precision : 3,
    require   : null,
    style     : 'nested'
  }
  ```
  
## License

MIT

_Based on [@ckhampus](https://github.com/ckhampus)'s [node-sass](https://github.com/ckhampus/node-sass)._
