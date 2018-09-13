/**
 * gzip build filed
 */
import path from 'path';
import gulp from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import brotli from 'gulp-brotli';
import config from './config';

gulp.task('brotli', () => {
  gulp
    .src(path.join(__dirname, config.root.dist, '**/*.+(js|html|css)'))
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(
      brotli.compress({
        skipLarger: true,
        mode: 0,
        quality: 11,
        lgblock: 0,
      })
    )
    .pipe(gulp.dest(path.join(__dirname, config.root.dist)));
});
