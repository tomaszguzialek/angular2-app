const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');

gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('tsc', ['clean'], function () {
  return gulp
    .src('app/**/*.ts')
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('dist/app'));
});

gulp.task('dist', ['tsc']);
gulp.task('default', ['dist']);
