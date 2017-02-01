import gulp from 'gulp';
  
export default function image() {
  gulp.src('src/img/**')
    .pipe(gulp.dest('dist/assets/img'));
}
