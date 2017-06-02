import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import plumber from 'gulp-plumber';

export default () =>
  gulp.src('src/js/index.js')
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
          },
        ],
      },
    }, webpack, (err, stats) => {
      console.log(stats.toString({ colors: true }));
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('dist/assets'));
