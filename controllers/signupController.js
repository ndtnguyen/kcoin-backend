

var express = require('express'),
    md5 = require('md5'),
    signupRepo = require('../models/signupRepo');
;
var request = require('request');
var r = express.Router();
var mailService = require('../utils/email');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
r.post("/", function (req, res) {
    signupRepo.loadDetail(req.body.email)
        .then(function (pRows) {
            if (pRows) {
                console.log(pRows);
                res.status(409).send();
            }
            else {
                var result;
                req.body.password = md5(req.body.password);
                signupRepo.insert(req.body).then(function (data) {
                    request.get(
                        'https://api.kcoin.club/generate-address',
                        function (error, response, body) {
                            if (!error && response.statusCode == 200) {

                                result = {
                                    messageCd: 'OK',
                                    message: '',
                                    result: body.address
                                }
                                let jsonbody = JSON.parse(body);
                                var entity = {
                                    address: jsonbody.address,
                                    privatekey: jsonbody.privateKey,
                                    publickey: jsonbody.publicKey,
                                    user: data[0].id,
                                    token: data[0].verify_token
                                }
                                signupRepo.insertAddress(entity).then(function (address) {
                                    console.log('insert address');
                                    mailService.sendMail(data[0].email, entity, 'SIGNUP');
                                    res.status(200).send(result);
                                });

                            }
                        }
                    );


                }).catch(function (err) {
                    res.status(400).send();
                });
            }
        });
});

r.get('/activate/:id',function(req,res) {
    let activateToken = req.params.id;
    signupRepo.activateAccount({token:activateToken}).then(function(data) {
        if (data == 0) {
            res.status(409).send();
        } else {
            res.status(200).redirect('http://localhost:8080/#/login');
            alert('Account activated!');
        }
    })
})

module.exports = r;