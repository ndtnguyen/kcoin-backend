

var express = require('express'),
addressRepo = require('../models/addressRepo');
var r = express.Router();
r.get("/:id",function(req, res) {
    addressRepo.loadaddress(req.params.id)
    .then(function(pRows) { 
        var vm={
            address: pRows
        }
        res.status(200).send(vm)
    }).catch(function(err) {
        res.status(400).send();
      });
});
module.exports = r;