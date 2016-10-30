                      require('es6-promise').polyfill();
const gulp          = require('gulp'),
      include       = require('gulp-include'),
      bs            = require('browser-sync').create(),
      rename        = require('gulp-rename'),
      plumber       = require('gulp-plumber'),
      spritesmith   = require('gulp.spritesmith'),
      merge         = require('merge-stream'),
      stylint       = require('gulp-stylint'),
      stylus        = require('gulp-stylus'),
      autoprefixer  = require('gulp-autoprefixer'),
      cleanCSS      = require('gulp-clean-css');
      uglify        = require('gulp-uglify'),
      gulpPug       = require('gulp-pug'),
      htmlmin       = require('gulp-htmlmin'),
      chalk         = require('chalk');

function consoleTime() {
    const date = new Date();
    var h = date.getHours();
    h = (h < 10 ? "0" : "") + h;
    var m  = date.getMinutes();
    m = (m < 10 ? "0" : "") + m;
    var s  = date.getSeconds();
    s = (s < 10 ? "0" : "") + s;
    return "[" + chalk.gray(h + ":" + m + ":" + s) + "] ";
}
gulp.task('image', function () {
  gulp.src('src/img/**')
    .pipe(gulp.dest('../dist/assets/img'));
});
gulp.task('sprite', function () {
  const spriteData = gulp.src('src/assets/css/sprites/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  const imgStream = spriteData.img
    .pipe(gulp.dest('src/assets/css/'));
  const cssStream = spriteData.css
    .pipe(rename({
      extname: ".styl"
    }))
    .pipe(gulp.dest('src/assets/css/tools/'));
  return merge(imgStream, cssStream);
});
gulp.task('html', function() {
  return gulp.src('src/templates/*.pug')
    .pipe(plumber())
    .pipe(gulpPug({
      // pretty: true
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('../dist'))
    .pipe(bs.stream({once: true}))
});
gulp.task('jshint', function() {
  return gulp.src('src/js/bundle.js')
    .pipe(plumber())
    .pipe(include())
    // .pipe(uglify())
    .pipe(plumber.stop())
    .pipe(gulp.dest('../dist/assets'));
});
gulp.task('go', ['watch'], function() {
    console.log('Go!');
    bs.init({
        server: "../dist",
        open: false
    });
    gulp.watch("src/css/**/*.styl", ['stylus']);
    gulp.watch("src/js/**/*", ['jshint']).on('change', bs.reload);
});
gulp.task('stylus', function() {
  return gulp.src('src/css/style.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(plumber.stop())
    .pipe(autoprefixer({ browsers: ['> 1%', 'IE 7'], cascade: false }))
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(consoleTime() + details.name + ' original size ' + chalk.cyan(((details.stats.originalSize)/1024).toPrecision(4))+chalk.bold("KB"));
      console.log(consoleTime() + details.name + ' minified size ' + chalk.cyan(((details.stats.minifiedSize)/1024).toPrecision(4))+chalk.bold("KB"));
      console.log(consoleTime() + "Saved "+ chalk.yellow.bold((100 / details.stats.originalSize * (details.stats.originalSize - details.stats.minifiedSize)).toPrecision(4) +"%")+", "+chalk.cyan(((details.stats.originalSize - details.stats.minifiedSize)/1024).toPrecision(4))+chalk.bold("KB"));
    }))
    .pipe(gulp.dest('../dist/assets'))
    .pipe(bs.stream({match: "**/*.css"}));
});
gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['jshint']);
  gulp.watch('src/css/**/*.styl', ['stylus']);
  gulp.watch('src/img/**', ['image']);
  gulp.watch('src/sprites/**', ['sprite']);
  gulp.watch('src/**/*.pug', ['html']);
});