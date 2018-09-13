/**
 * Optimize image assets
 */
import gulp from 'gulp';

import imagemin from 'gulp-imagemin';
import notify from 'gulp-notify';
import path from 'path';
import plumber from 'gulp-plumber';
import config from './config';

gulp.task('optimize_images', () =>
  gulp
    .src(path.join(__dirname, config.img.src, config.img.extensions), { base: './' })
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({ interlaced: true }),
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ],
        {
          verbose: true,
        }
      )
    )
    .pipe(gulp.dest('./'))
);
