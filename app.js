var express = require('express')
  , http = require('http')
  , app
  ;

app = express()
  .use(express.static('app'))
  .use('/js/lib/', express.static('node_modules/requirejs/'))
  .use('/node_modules', express.static('node_modules'))
  .use('/test', express.static('test/'))
  .use('/test', express.static('app'))
  ;

app.listen(3333, function() {
  console.log('Running on http://localhost:3333');
});
