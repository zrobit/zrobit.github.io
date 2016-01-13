global.__base = __dirname + '/../';

var gulp = require('gulp'),
    tasks = require('./tasks');

gulp.task('default', ['html:posts']);
