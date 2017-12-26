var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');
exports.insert = function(entity) {
    var sql = mustache.render(
        "INSERT INTO public.user(email,password) VALUES('{{email}}','{{password}}')",
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