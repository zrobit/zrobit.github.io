var gulp = require('gulp'),
    nib = require('nib'),
    stylus = require('gulp-stylus');

var src = [
  'styles/**/*.styl',
  '!styles/modules/**/*',
  '!styles/sections/**/*',
  '!styles/templates/**/*'
  ];

var dest = '../static/styles';


function styles () {
  return gulp.src(src)
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest(dest));
}

gulp.task('styles', styles);
