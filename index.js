const express = require('express');
const app = express();
const request = require('request');
const url = 'http://discoveryvip.com/shared/json.php?f=coin';

app.use(express.static(__dirname+'/public'));

app.get('/load',function(req,res){
  request(url,function(error,response,body){
    console.log(JSON.parse(body));
    let holder = [];
    let data = JSON.parse(body);
    for(var i=0;i<data.data.length;i++){
      holder.push(data.data[i].name);
    }
    res.json(holder);
  })
});

app.get('/price/:cur',function(req,res){
  console.log(req.params);
  let curValue = (req.params.cur) ? req.params.cur : 'USD';
  request(url+'?convert='+curValue,function(error,rep,body){
    res.json(body);
  })
});

app.get('/crypto/:cur',function(req,res){
  console.log(req.params);
  let curValue = (req.params.cur) ? req.params.cur : 'USD';
  request(url+curValue+'/',function(error,rep,body){
    res.json(body);
  })
});

app.listen(3000);

String.prototype.capitalize = function(){
  return this.charAt(0).toUpperCase() + this.slice(1);
}