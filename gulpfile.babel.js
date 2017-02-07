import gulp from 'gulp';
import bs from 'browser-sync';
import consoleTime from './gulp/functions/consoleTime';
import sprite from './gulp/task/sprite';
import image from './gulp/task/image';
import html from './gulp/task/html';
import css from './gulp/task/css';
import js from './gulp/task/js';

global.require = require;
global.dirname = __dirname;

gulp.task('image', () => {
  image();
});

gulp.task('html', () => {
  html();
});

gulp.task('css', () => {
  css();
});

gulp.task('js', () => {
  js();
});

gulp.task('sprite', () => {
  sprite();
});

gulp.task('default', ['watch'], () => {
  console.log(`${consoleTime()}Frontend Developer Boilerplate by https://github.com/Piotr-Aueternum`);
  bs.init({
    server: 'dist',
    open: false,
  });
  gulp.watch('dist/assets/**/*.js').on('change', bs.reload);
});

gulp.task('watch', () => {
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/css/**/*.styl', ['css']);
  gulp.watch('src/img/**', ['image']);
  gulp.watch('src/css/sprites/**', ['sprite']);
  gulp.watch('src/**/*.pug', ['html']);
});
