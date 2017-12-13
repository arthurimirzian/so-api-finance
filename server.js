var express     = require('express')
  , app 	    = express()
;
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/compteFinancier', function(req, res) {
  res.set('Content-Type', 'text/xml');
  return res.render('compteFinancier',{
    epj: req.params
  });
});
app.get('/estFacture', function(req, res) {
  res.set('Content-Type', 'text/xml');
  var a = Date.now();
  var is = isOdd(a);
  return res.render('estFacture',{
    is: is
  });
});
function isOdd(num) { return num % 2;}
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});