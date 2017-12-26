

var express = require('express'),
    md5= require('md5'),
    signupRepo = require('../models/signupRepo');
;
var r = express.Router();
r.post("/",function(req, res) {
    signupRepo.loadDetail(req.body.email)
        .then(function(pRows) { 
            if(pRows)
            {            
              res.status(409).send();
            }
            else
            {
                req.body.password=md5(req.body.password);
                signupRepo.insert(req.body).then(function(data) {
                    res.status(200).send({email:req.body.email});
                    }).catch(function(err) {
                      res.status(400).send();
                    });
            }
        });
	});
module.exports = r;