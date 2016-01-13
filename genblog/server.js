var express = require('express'),
  jade = require('jade'),
  stylus = require('stylus'),
  nib = require('nib'),
  fs = require('fs'),
  marked = require('marked'),
  // handler = require('./handler'),
  app = express(),
  host = ['0.0.0.0', 8001];

// handler.set_env('dev');

app.set('view engine', 'jade');

app.use('/static/styles', stylus.middleware({
  debug: true,
  src: __dirname + '/styles',
  dest: __dirname + '/../static/styles',
  serve: true,
  forse: false,
  compile: function ( str, path ) {
    return stylus(str).set('filename', path).use(nib());
  }
}));

app.use( '/static/styles', express.static( __dirname + '/../static/styles' ));
app.use( '/static/scripts', express.static( __dirname + '/scripts' ));
app.use( '/static/images', express.static( __dirname + '/images' ));
app.use( '/static/fonts', express.static( __dirname + '/fonts' ));

app.get( '/', function(req, res) {
  res.render( __dirname + '/layouts/index.jade', {pretty: true});
});

app.get(/^\/blog\/([a-z0-9\/\-]+)$/, function(req, res) {
  file = fs.readFileSync('../_posts/'+req.params[0]+'.md', "utf8");
  res.render( __dirname + '/layouts/post.jade', {post: marked(file)});
});

if ( process.argv[2] ) {
  host = process.argv[2].split('host=').join('').split(':');
}

app.listen( host[1] , host[0] );

console.log('node server ' + host[0] + ':' + host[1] );
