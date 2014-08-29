var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Copy non-uglify version to "dist"
gulp.task('copy', function() {
  return gulp.src('src/*.js').pipe(gulp.dest('dist'));
});

// Create an uglify version to "dist" and "example"
gulp.task('uglify', function() {
  return gulp.src('src/*.js').pipe(uglify())
                             .pipe(rename('google-picker.min.js'))
                             .pipe(gulp.dest('dist'))
                             .pipe(gulp.dest('example'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['copy', 'uglify'])
});

gulp.task('default', function() {
  gulp.start('watch');
});
