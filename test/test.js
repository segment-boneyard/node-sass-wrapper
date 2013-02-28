
var assert = require('assert')
  , fs     = require('fs')
  , sass   = require('../');

sass.compile('./test.sass', { compass : true }, function (err, css) {

  var expected = fs.readFileSync('./test.css', 'utf-8').toString();

  assert.ifError(err);
  assert.equal(css, expected);

  console.log('Test passed!');
});