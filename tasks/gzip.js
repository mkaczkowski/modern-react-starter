/**
 * gzip build filed
 */
import path from 'path';
import gulp from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import gzip from 'gulp-gzip';
import config from './config';

gulp.task('gzip', () => {
  gulp
    .src(path.join(__dirname, config.root.dist, '**/*.+(js|html|css)'))
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(gzip())
    .pipe(gulp.dest(path.join(__dirname, config.root.dist)));
});
