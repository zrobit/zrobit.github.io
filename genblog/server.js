var express = require('express'),
  jade = require('jade'),
  stylus = require('stylus'),
  nib = require('nib'),
  handler = require('./handler'),
  app = express(),
  host = ['0.0.0.0', 8001];

handler.set_env('dev');

app.set('view engine', 'jade');

app.use('/static/styles', stylus.middleware({
  debug: true,
  src: __dirname + '/styles',
  dest: __dirname + '/build/static/styles',
  serve: true,
  forse: false,
  compile: function ( str, path ) {
    return stylus(str).set('filename', path).use(nib());
  }
}));

app.use( '/static/styles', express.static( __dirname + '/build/static/styles' ));
app.use( '/static/scripts', express.static( __dirname + '/scripts' ));
app.use( '/static/images', express.static( __dirname + '/images' ));
app.use( '/static/fonts', express.static( __dirname + '/fonts' ));

app.get( '/', function(req, res) {
  res.render( __dirname + '/templates/home.jade', handler);
});

app.get(/^\/([a-z0-9\/\-]+)$/, function(req, res) {
  res.render( __dirname + '/templates/' + req.params[0] + '.jade', handler );
});

if ( process.argv[2] ) {
  host = process.argv[2].split('host=').join('').split(':');
}

app.listen( host[1] , host[0] );

console.log('node server ' + host[0] + ':' + host[1] );
