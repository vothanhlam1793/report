var express = require('express');
var router = express.Router();
var kiot = require("./adapter/kiot");
var sheet = require("./adapter/sheet");
/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { 
    title: 'Báo cáo',
    sales: {}
  });
});

router.get("/sales", async function(req, res){
  var d = new Date()
  if((!req.query.from) || (!req.query.to)){
    res.send({
      message: "ERROR - cannot from or to query"
    })
  } else {
    invoices = await kiot.getFull("https://public.kiotapi.com/invoices?status=3&fromPurchaseDate=" + req.query.from + "T00:00:00&toPurchaseDate=" + req.query.to + "T23:59:59");
    res.send({
      data: invoices
    })    
  }
})

// var s = document.createElement("script");
// s.type = "text/javascript";
// s.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
// $("head").append(s);
router.post("/sheets", async function(req, res){
  console.log(req.body);
  res.send("OK");
})

module.exports = router;