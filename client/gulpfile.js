const gulp = require('gulp');
const protractor = require('gulp-protractor').protractor;
const webdriverUpdate = require('gulp-protractor').webdriver_update;
const cp = require('child_process');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/bands_test';

var lintFiles = ['**/*.js', '!node_modules/**', '!build/**', '!**/*spec.js',
'!**/bundle.**', '!*.conf.js'];
var statFiles = ['app/**/*.html', 'app/**/*.css'];
var children = [];

function killcp() {
  children.forEach((child) => {
    child.kill('SIGTERM');
  });
}

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
    .pipe(webpack( {
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('webpack:test', () => {
  gulp.src('test/unit/test_entry.js')
    .pipe(webpack( {
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./test'));
});

gulp.task('static:dev', () => {
  gulp.src(statFiles)
    .pipe(gulp.dest('./build'));
});

gulp.task('webdriverUpdate', webdriverUpdate);

gulp.task('mongoDB:test', (done) => {
  children.push(cp.spawn('mongod'));
  setTimeout(done, 1000);
});

gulp.task('dropDb:test', ['mongoDB:test'], (done) => {
  mongoose.connect(mongoUri, () => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(done);
    });
  });
});

gulp.task('startservers:test', ['dropDb:test'], (done) => {
  children.push(cp.fork('server.js'));
  children.push(cp.fork('../server/server.js', [], { env: { MONGODB_URI: mongoUri } } ));
  setTimeout(done, 1000);
});

gulp.task('protractor:test', ['build:dev', 'webdriverUpdate', 'startservers:test'], () => {
  gulp.src('test/integration/**/*spec.js')
    .pipe(protractor({
      configFile: 'test/integration/config.js'
    }))
    .on('end', () => {
      killcp();
    })
    .on('error', () => {
      killcp();
    });
});

gulp.task('lint:dev', () => {
  return gulp.src(lintFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('test', ['protractor:test']);
gulp.task('build:dev', ['webpack:dev', 'static:dev', 'webpack:test']);
gulp.task('lint', ['lint:dev']);
gulp.task('default', ['build:dev', 'lint', 'test']);
