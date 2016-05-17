const gulp = require('gulp');
const eslint = require('gulp-eslint');

const files = ['**/*.js', '!node_modules/**', '!build/**'];

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

gulp.task('lint', ['lint:test', 'lint:nontest']);
gulp.task('default', ['lint']);
