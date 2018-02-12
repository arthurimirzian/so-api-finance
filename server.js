require('dotenv').config();
var express = require('express')
  , app = express()
  , base64 = require('file-base64')
;
app.set('port', (process.env.PORT || 5000));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/compteFinancier', function(req, res) {
  const basic = req.get('Authorization');
  if(basic==null||basic==''){
    res.status('403')
    return res.render('error',{
      message: 'Forbidden'
    });
  }
  var username = process.env.USERNAME;
  var password = process.env.PASSWORD;
  if(Buffer.from(basic.replace("Basic ", ""), 'base64').toString()!=username+':'+password){
    res.status('403')
    return res.render('error',{
      message: 'Forbidden'
    });
  }
  const epj = req.query.EPJ;
  if(epj==null||epj==''){
    res.status('500')
    return res.render('error',{
      message: 'Paramètre EPJ absent.'
    });
  }
  res.set('Content-Type', 'text/xml');
  return res.render('compteFinancier',{
    epj: epj
  });
});
app.get('/estFacture', function(req, res) {
  const basic = req.get('Authorization');
  if(basic==null||basic==''){
    res.status('403')
    return res.render('error',{
      message: 'Forbidden'
    });
  }
  if(Buffer.from(basic.replace("Basic ", ""), 'base64').toString()!='crm:ModisFrance!'){
    res.status('403')
    return res.render('error',{
      message: 'Forbidden'
    });
  }
  const epj = req.query.EPJ;
  if(epj==null||epj==''){
    res.status('500')
    return res.render('error',{
      message: 'Paramètre EPJ absent.'
    });
  }
  res.set('Content-Type', 'text/xml');
  return res.render('estFacture',{
    is: (parseInt(epj) % 2)
  });
});
app.get('/getFactureBase64', function(req, res) {
  console.log('ok')
  base64.encode('test.pdf', function(err, base64String) {
    if(err) console.error(err);
    return res.render('factureBase64',{
      base64: base64String
    });
  });
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});