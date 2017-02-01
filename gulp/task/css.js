import gulp from 'gulp';
import bs from 'browser-sync';
import chalk from 'chalk';
import consoleTime from './../functions/consoleTime.js';
import plumber from 'gulp-plumber';

import stylus from 'gulp-stylus';
import autoprefixer from 'gulp-autoprefixer';
import gulpCleanCSS from 'gulp-clean-css';

export default function css() {
  gulp.src('src/css/style.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefixer({ browsers: ['> 1%', 'IE 7'], cascade: false }))
    .pipe(plumber.stop())
    .pipe(gulpCleanCSS({debug: true}, details => {
      console.log(consoleTime() + details.name + ' original size ' + chalk.cyan(((details.stats.originalSize)/1024).toPrecision(4))+chalk.bold("KB"));
      console.log(consoleTime() + details.name + ' minified size ' + chalk.cyan(((details.stats.minifiedSize)/1024).toPrecision(4))+chalk.bold("KB"));
      console.log(consoleTime() + "Saved "+ chalk.yellow.bold((100 / details.stats.originalSize * (details.stats.originalSize - details.stats.minifiedSize)).toPrecision(4) +"%")+", "+chalk.cyan(((details.stats.originalSize - details.stats.minifiedSize)/1024).toPrecision(4))+chalk.bold("KB"));
    }))
    .pipe(gulp.dest('dist/assets'))
    .pipe(bs.stream({match: "**/*.css"}));
}
