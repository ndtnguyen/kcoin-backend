var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');
exports.insert = function(entity) {
    var sql = mustache.render(
        "INSERT INTO public.user(email,password) VALUES('{{email}}','{{password}}') RETURNING *",
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
