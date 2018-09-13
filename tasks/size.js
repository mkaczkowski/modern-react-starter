/**
 * Size report
 */
import gulp from 'gulp';
import sizereport from 'gulp-sizereport';
import path from 'path';
import runSequence from 'run-sequence';
import config from './config.json';

const params = {
  fail: true,
  gzip: false,
  '*': {
    maxGzippedSize: 250000,
  },
  'index.html': {
    maxSize: 100000,
    maxGzippedSize: 30000,
  },
};

gulp.task('size-normal', () => {
  gulp.src(path.join(__dirname, config.root.dist, '**/*.+(js|css|html|png|woff|svg)')).pipe(sizereport(params));
});

gulp.task('size-gzip', () => {
  gulp.src(path.join(__dirname, config.root.dist, '**/*.gz')).pipe(sizereport(params));
});

gulp.task('size-brotli', () => {
  gulp.src(path.join(__dirname, config.root.dist, '**/*.br')).pipe(sizereport(params));
});

gulp.task('size', cb => {
  runSequence('size-normal', 'size-gzip', 'size-brotli', cb);
});
