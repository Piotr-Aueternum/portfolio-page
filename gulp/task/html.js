import gulp from 'gulp';
import bs from 'browser-sync';
import plumber from 'gulp-plumber';
import gulpPug from 'gulp-pug';
  
export default function html() {
  gulp.src('src/templates/*.pug')
    .pipe(plumber())
    .pipe(gulpPug({
      pretty: true
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('dist'))
    .pipe(bs.stream({once: true}));
}
