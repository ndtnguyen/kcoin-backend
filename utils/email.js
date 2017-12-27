var nodemailer = require('nodemailer');
var emailType = require('../constants/messageType');

let transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "gr2en.step@gmail.com",
        pass: "Greengar9596"
    }
});

exports.sendMail= function(recipient,entity,type) {
    var message = {

        // sender info
        from: 'gr2en.step@gmail.com',

        // Comma separated list of recipients
        to: recipient,

        // Subject of the message
        subject: '[KCOIN] Welcome to KCOIN',

        // plaintext body
        text: 'Hello to myself!',

        // HTML body
        html: '<p><b>Hello</b>'+ recipient+'!, your address is ' + entity.address
            
    };
    switch(type) {
        case emailType.SIGNUP: {
            message.subject = '[KCOIN] Welcome to KCOIN';
            message.html = '<p><b>Hello </b>'+ recipient+'!,<br>Your generated address is <b>' + entity.address
                            +'</b>.<br> Please click this link to activate account '
                            +"<a href='http://localhost:3100/signup/activate/"+entity.token+"'>Activate</a>";
        }
        break;
        default:
            return;
    }

    console.log('Sending Mail...');
    transport.sendMail(message, function (error) {
        if (error) {
            console.log('Error occured');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');

        // if you don't want to use this transport object anymore, uncomment following line
        //transport.close(); // close the connection pool
    });
}



