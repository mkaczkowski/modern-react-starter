/**
 * Error, warning, info logger
 */
import gutil from 'gulp-util';

function Log(taskName, message) {
  this.error = function error() {
    throw new gutil.PluginError({
      plugin: taskName,
      message: gutil.colors.red(message),
    });
  };
  this.info = function info() {
    gutil.log(taskName, gutil.colors.magenta(message));
  };
}

export default Log;
