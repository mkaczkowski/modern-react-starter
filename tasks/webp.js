/**
 * Build webp assets
 */
import path from 'path';
import gulp from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import webp from 'gulp-webp';
import config from './config';

gulp.task('webp', () =>
  gulp
    .src(path.join(__dirname, config.img.src, config.img.extensions), { base: './' })
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(
      webp({
        quality: 75,
      })
    )
    .pipe(gulp.dest('./'))
);
