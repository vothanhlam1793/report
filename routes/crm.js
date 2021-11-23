var express = require('express');
var router = express.Router();
var kiot = require("./adapter/kiot");
var sheet = require("./adapter/sheet");
/* GET home page. */
router.get('/', async function(req, res, next) {
    console.log("CRM");
    res.render("crm/index",{
        title: "CRM - CRETA v1.0"
    })
});
router.get('/customers', async function(req, res, next) {
    var customers = await kiot.getFullCustomer();
    res.send(customers);
});
router.get('/invoices', async function(req, res, next) {
    var invoices = await kiot.getFullInvoice();
    res.send(invoices);
});
kiot.getFullCustomer(true);
kiot.getFullInvoice(true);
setInterval(function(){
    kiot.getFullCustomer(true);
    kiot.getFullInvoice(true);
}, 3*60000);
module.exports = router;