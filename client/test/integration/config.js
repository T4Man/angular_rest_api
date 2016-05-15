const fs = require('fs');

function findSeleniumJar() {
  var path = __dirname +
    '/../../node_modules/gulp-protractor/node_modules/protractor/selenium/';
  var files = fs.readdirSync(path);
  var jar;

  for (var i = files.length - 1; i >= 0; i--) {
    if (files[i].endsWith('.jar')) {
      jar = path + files[i];
      return jar;
    }
  }
}

module.exports = exports = {
  config: {
    seleniumServerJar: findSeleniumJar()
  }
};
