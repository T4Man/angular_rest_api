'use strict';

const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

const files = ['**/*.js', '!node_modules/**'];

gulp.task('webpack:dev', () => {
  gulp.src(['app/js/entry.js', 'app/js/script.js'])
    .pipe(webpack( {
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', () => {
  gulp.src(['app/**/*.html', 'app/**/*.css'])
    .pipe(gulp.dest('./build'));
});

gulp.task('lint:test', () => {
  return gulp.src('./test/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:nontest', () => {
  return gulp.src(files)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('lint', ['lint:test', 'lint:nontest']);
gulp.task('default', ['build:dev']);
