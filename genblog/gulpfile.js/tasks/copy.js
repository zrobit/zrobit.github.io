var gulp = require('gulp');


function scripts () {
  var src = ['scripts/**/*.js'];
  return gulp.src(src)
    .pipe(gulp.dest('../static/scripts'));
}


function images () {
  var src = ['images/**/*', '!images/icons/**/*', '!images/tools/**/*'];
  return gulp.src(src)
    .pipe(gulp.dest('../static/images'));
}


function fonts () {
  var src =  ['fonts/**/*'];
  return gulp.src(src)
    .pipe(gulp.dest('../static/fonts'));
}

gulp.task('copy:scripts', scripts);
gulp.task('copy:images', images);
gulp.task('copy:fonts', fonts);

gulp.task('copy', ['copy:scripts', 'copy:images', 'copy:fonts']);
