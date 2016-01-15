var gulp = require('gulp'),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate');


function icons () {
  var fontName= 'iconfont';
  return gulp.src(['images/icons/*.svg'])
    .pipe(iconfont({
      fontName: fontName,
      formats: ['ttf', 'eot', 'woff', 'svg'],
      fontHeight: 256,
      normalize: true
      // descent: 128 // 512*6.25%
    }))

    .on('glyphs', function(glyphs) {
      var options = {
        glyphs : glyphs.map(function(glyph){
          return {name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0).toString(16) };
        }),
        fontName: fontName,
        fontPath: '../fonts/icons/',
      };
      gulp.src('styles/templates/icons.styl')
        .pipe(consolidate('lodash', options))
        .pipe(gulp.dest('styles/modules/'));
    })
    .pipe(gulp.dest('fonts/icons/'));
}

gulp.task('icons', icons);
