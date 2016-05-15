var gulp   = require('gulp');
var KarmaServer = require('karma').Server;
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Copy non-uglify version to "dist"
gulp.task('copy', ['test'], function () {
  return gulp.src('src/*.js')
    .pipe(gulp.dest('dist'));
});

// Create an uglify version to "dist" and "example"
gulp.task('uglify', ['test'], function () {
  return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(rename('google-picker.min.js'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('example'));
});

gulp.task('test', function (done) {
  return new KarmaServer({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('watch', function () {
  gulp.watch('src/*.js', ['copy', 'uglify', 'test']);
  gulp.watch('test/**/*.spec.js', ['test']);
});

gulp.task('default', ['watch']);
