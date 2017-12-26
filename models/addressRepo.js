var mustache = require('mustache'),
q = require('q'),
db = require('../fn/db');
exports.loadaddress = function(id_user) {
    
        var deferred = q.defer();
        var obj={
            id_user: id_user
        }
        var sql =
            mustache.render(
                "select * from public.address where id_user = {{id_user}}",
                obj
            );
        
        db.load(sql).then(function(rows) {
            deferred.resolve(rows);
        });
    
        return deferred.promise;
    }