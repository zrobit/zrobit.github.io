var gulp = require('gulp'),
    jade = require('jade'),
    gulp_jade = require('gulp-jade'),
    marked = require('marked'),
    fs = require('fs'),
    rename = require("gulp-rename"),
    through = require('through2');


var src = ['../_posts/**/*.md'];

var post_template = fs.readFileSync('layouts/post.jade', "utf8");


function htmlPosts () {
  function render () {
    function compile (file, enc, cb) {
      var compiled;
      var handler = {};
      var jade_options = {
        // Jade opciones van aqui :)
        pretty: true,
        filename: file.path
      };

      var marked_options = {
      };

      compiled = marked(String(file.contents), marked_options);
      handler.post = compiled;
      compiled = jade.compile(post_template, jade_options)({post: compiled});

      file.path = file.path.substr(0, file.path.lastIndexOf(".")) + ".html";
      file.contents = new Buffer(compiled);
      cb(null, file);
    }
    return through.obj(compile);
  }
  return gulp.src(src)
    .pipe(render())
    .pipe(gulp.dest('../blog/'));
}

function htmlIndex(){
  var handler = {};
  return gulp.src(['layouts/home.jade'])
    .pipe(gulp_jade({locals: handler, pretty:true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('../'));
}
gulp.task('html:posts', htmlPosts);
gulp.task('html:index', htmlIndex);
