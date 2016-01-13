var gulp = require('gulp'),
    livereload = require('gulp-livereload');

var src = ['styles/**/*.styl', 'layouts/**/*.jade', '../_posts/**/**.md'];

function watch () {
  livereload.listen();
  gulp.watch(src, function(){
    livereload.reload();
  });
};

gulp.task('watch', watch);
