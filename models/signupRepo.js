var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db'),
    hash = require('sha512');

///////////////////////////////////////////////////////////////////////////
exports.insert = function(entity) {
    let hashBuffer= hash(entity.email+entity);
    let hashString = hashBuffer.toString('hex') + entity.password;
    entity.hashtoken = hashString;
    var sql = mustache.render(
        "INSERT INTO public.user(email,password,state,verify_token) VALUES('{{email}}','{{password}}','false','{{hashtoken}}') RETURNING *",
        entity
    );
    return db.insert(sql);
       
}

exports.loadDetail = function(email) {
	var d = q.defer();
    var obj = {
        email: email
    };

    var sql = mustache.render(
        "select * from  public.user where email = '{{email}}'",
        obj
    );

    db.load(sql).then(function(rows) {
        d.resolve(rows[0]);
    
    });

    return d.promise;
}

exports.insertAddress = function(entity) {
    var sql = mustache.render(
        "INSERT INTO public.address(id_address,private_key,public_key,ktc,id_user) VALUES('{{address}}','{{privatekey}}','{{publickey}}','0','{{user}}')",
        entity
    );
    let result = db.insert(sql);
    return result;
}

exports.activateAccount = function(token) {
    var sql = mustache.render(
        "UPDATE public.user SET state='true', verify_token='' WHERE verify_token = '{{token}}'",
        token
    );
    return db.update(sql);
       
}
