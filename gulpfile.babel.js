import gulp from 'gulp';
import bs from 'browser-sync';
import rename from 'gulp-rename';
import spritesmith from 'gulp.spritesmith';
import merge from 'merge-stream';
import stylus from 'gulp-stylus';
import autoprefixer from 'gulp-autoprefixer';
import gulpCleanCSS from 'gulp-clean-css';
import gulpPug from 'gulp-pug';
import plumber from 'gulp-plumber';
import gulpHtmlmin from 'gulp-htmlmin';
import chalk from 'chalk';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import consoleTime from './task/consoleTime';

global.require = require;
global.__dirname = __dirname;

const __dirName = 'dist/';

gulp.task('image', () => {
  gulp.src('src/img/**')
    .pipe(gulp.dest(__dirName + 'assets/img'));
});

gulp.task('sprite', () => {

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
gulp.task('html', () => {
  return gulp.src('src/templates/*.pug')
    .pipe(plumber())
    .pipe(gulpPug({
      pretty: true
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(__dirName))
    .pipe(bs.stream({once: true}));
});
gulp.task('webpack', () => {
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
    }, webpack, (err, stats) => {
      console.log(stats.toString({ colors: true }));
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(__dirName + 'assets'));
});
gulp.task('default', ['watch'], () => {
    console.log(consoleTime() + 'Go!');
    bs.init({
        server: __dirName,
        open: false
    });
    gulp.watch("src/css/**/*.styl", ['stylus']);
    gulp.watch("src/js/**/*", ['webpack']);
    gulp.watch("dist/assets/**/*.js").on('change', bs.reload);
});
gulp.task('stylus', () => {
  return gulp.src('src/css/style.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(plumber.stop())
    .pipe(autoprefixer({ browsers: ['> 1%', 'IE 7'], cascade: false }))
    .pipe(gulpCleanCSS({debug: true}, details => {
      console.log(consoleTime() + details.name + ' original size ' + chalk.cyan(((details.stats.originalSize)/1024).toPrecision(4))+chalk.bold("KB"));
      console.log(consoleTime() + details.name + ' minified size ' + chalk.cyan(((details.stats.minifiedSize)/1024).toPrecision(4))+chalk.bold("KB"));
      console.log(consoleTime() + "Saved "+ chalk.yellow.bold((100 / details.stats.originalSize * (details.stats.originalSize - details.stats.minifiedSize)).toPrecision(4) +"%")+", "+chalk.cyan(((details.stats.originalSize - details.stats.minifiedSize)/1024).toPrecision(4))+chalk.bold("KB"));
    }))
    .pipe(gulp.dest(__dirName + 'assets'))
    .pipe(bs.stream({match: "**/*.css"}));
});
gulp.task('watch', () => {
  gulp.watch('src/js/**/*.js', ['webpack']);
  gulp.watch('src/css/**/*.styl', ['stylus']);
  gulp.watch('src/img/**', ['image']);
  gulp.watch('src/css/sprites/**', ['sprite']);
  gulp.watch('src/**/*.pug', ['html']);
});