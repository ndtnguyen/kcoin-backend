var express = require('express'),
    md5= require('md5'),
    loginRepo = require('../models/loginRepo');
;

var r = express.Router();

r.post('/', function(req, res) {
    var ePWD = md5(req.body.password);
    var entity = {
        email: req.body.email,
        password: ePWD,
    };
    console.log(entity.email,req.body.password);
    //var remember = req.body.remember ? true : false;
    var result;
    loginRepo.login(entity)
        .then(function(user) {
            if (user === null) {
                result = { messageCd : 'NG',
                            message: 'User not found'}
                res.status(404).send(result);
               }
             else {
                // console.log(req.session);
                // req.session.isLogged = true;

                // req.session.user = user;
                //req.session.cart = [];
                result = {
                    messageCd : 'OK',
                    message: '',
                    result : user
                }
                res.status(200).send(result);
                // if (remember === true) {
                //     var hour = 1000 * 60 * 60 * 24;
                //     req.session.cookie.expires = new Date(Date.now() + hour);
                //     req.session.cookie.maxAge = hour;
                // }

                // var url = '/home';
                // if (req.query.retUrl) {
                //     url = req.query.retUrl;
                // }
                // res.redirect(url);
            }
        }).catch(function(err) {
                      res.status(400).send();
                    });;
});
module.exports = r;