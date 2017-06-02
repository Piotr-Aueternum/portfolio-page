import gulp from 'gulp';

export default () =>
  gulp.src('src/img/**')
    .pipe(gulp.dest('dist/assets/img'));

