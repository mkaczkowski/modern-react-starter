/**
 * Default Tasks
 */
import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('optimize', cb => {
  runSequence('optimize_images', 'webp', cb);
});

gulp.task('postbuild', cb => {
  runSequence('gzip', 'brotli', 'size', cb);
});
