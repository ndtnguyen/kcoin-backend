var mustache = require('mustache'),
    q = require('q'),
    db = require('../fn/db');
exports.login = function(entity) {

    var deferred = q.defer();

    var sql =
        mustache.render(
            "select * from public.user where email = '{{email}}' and password = '{{password}}'",
            entity
        );

    db.load(sql).then(function(rows) {
        if (rows.length > 0) {
            var user = {
                id: rows[0].id,
                email: rows[0].email,
                money: rows[0].money
            }
            deferred.resolve(user);
        } else {
            deferred.resolve(null);
        }
    });

    return deferred.promise;
}

