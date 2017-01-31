global.require = require;
global.__dirname = __dirname;
                      require('es6-promise').polyfill();
var gulp            = require('gulp'),
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
      chalk         = require('chalk'),
      webpackStream = require('webpack-stream'),
      webpack       = require('webpack');
var __dirName = 'dist/';
function consoleTime() {
    var date = new Date();
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
    .pipe(gulp.dest(__dirName + 'assets/img'));
});

gulp.task('sprite', function () {

  var spriteData = gulp.src('src/css/sprites/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css'
    }));

  var imgStream = spriteData.img
    .pipe(gulp.dest(__dirName + 'assets/'));

  var cssStream = spriteData.css
    .pipe(rename({
      extname: ".styl"
    }))
    .pipe(gulp.dest('src/css/tools/'));

  return merge(imgStream, cssStream);
});
gulp.task('html', function() {
  return gulp.src('src/templates/*.pug')
    .pipe(plumber())
    .pipe(gulpPug({
      pretty: true
    }))
    // .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(plumber.stop())
    .pipe(gulp.dest(__dirName))
    .pipe(bs.stream({once: true}));
});
gulp.task('jshint', function() {
  return gulp.src('src/js/index.js')
    .pipe(plumber())
    .pipe(webpackStream({
      output: {
        filename: 'bundle.js',
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
          }
        ],
      },
    }, webpack))
    .pipe(plumber.stop())
    .pipe(gulp.dest(__dirName + 'assets'));
});
gulp.task('default', ['watch'], function() {
    console.log(consoleTime() + 'Go!');
    bs.init({
        server: __dirName,
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
    .pipe(gulp.dest(__dirName + 'assets'))
    .pipe(bs.stream({match: "**/*.css"}));
});
gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['jshint']);
  gulp.watch('src/css/**/*.styl', ['stylus']);
  gulp.watch('src/img/**', ['image']);
  gulp.watch('src/css/sprites/**', ['sprite']);
  gulp.watch('src/**/*.pug', ['html']);
});