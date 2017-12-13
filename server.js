var express     = require('express')
  , app 	    = express()
;
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/compteFinancier', function(req, res) {
  const epj = req.params.EPJ;
  if(epj==null||epj==''){
    return res.render('error');
  }
  res.set('Content-Type', 'text/xml');
  return res.render('compteFinancier',{
    epj: epj
  });
});
app.get('/estFacture', function(req, res) {
  const epj = req.params.EPJ;
  if(epj==null||epj==''){
    return res.render('error');
  }
  res.set('Content-Type', 'text/xml');
  return res.render('estFacture',{
    is: (parseInt(epj) % 2)
  });
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});