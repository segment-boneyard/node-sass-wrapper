var sass   = require('../lib/sass.js');

sass.compile('./style.scss', function (css) {
    console.log(css);
});

sass.compile('./style.scss', {'outputStyle':'expanded'}, function (css) {
    console.log(css);    
});
