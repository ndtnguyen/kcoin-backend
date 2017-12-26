var mysql = require('mysql'),
    pg = require('pg'),
    q = require('q');

var _HOST = 'baasu.db.elephantsql.com',
    _USER = 'ygbjwpra',
    _PORT ='5432',
    _PWD = 'Ye2G6onOqPbvTZN06FQtj8Xai_zUrNrO',
    _MAX = 10,
    _IDLE =30000,
    _DB = 'ygbjwpra';

exports.load = function(sql) {

    var d = q.defer();

    var config={
        user: _USER ,
        database: _DB ,
        password: _PWD,
        host: _HOST,
        port: _PORT,
        max: _MAX,
        idleTimeoutMillis: _IDLE
    };
    var pool=new pg.Pool(config);

    pool.connect(function(err,client,done){
        done();
        client.query(sql,function(err,result){
              if (err)
                    d.reject(err);
                    // throw error;
                if(result)        
                     d.resolve(result.rows);
                else
                    d.resolve(result);
        });
       
    });

    return d.promise;
}
exports.insert = function(sql) {
    
    var d = q.defer();

   var config={
        user: _USER ,
        database: _DB ,
        password: _PWD,
        host: _HOST,
        port: _PORT,
        max: _MAX,
        idleTimeoutMillis: _IDLE
    };
    var pool=new pg.Pool(config);

    pool.connect(function(err,client,done){
        done();
                client.query(sql,function(err, value){
                if (err) {
                    d.reject(err);
                } else {
                    d.resolve(value.insertId);
                }
            });
        });

    return d.promise;
}

exports.update = function(sql) {
    
    var d = q.defer();

   var config={
        user: _USER ,
        database: _DB ,
        password: _PWD,
        host: _HOST,
        port: _PORT,
        max: _MAX,
        idleTimeoutMillis: _IDLE
    };
    var pool=new pg.Pool(config);

    pool.connect(function(err,client,done){
        done();
        client.query(sql,function(err, value){
        if (err) {
            d.reject(err);
        } else {
            d.resolve(value.changedRows);
        }
    });
    });

    return d.promise;
}

exports.delete = function(sql) {
    
    var d = q.defer();

   var config={
        user: _USER ,
        database: _DB ,
        password: _PWD,
        host: _HOST,
        port: _PORT,
        max: _MAX,
        idleTimeoutMillis: _IDLE
    };
    var pool=new pg.Pool(config);

    pool.connect(function(err,client,done){
        done();
            client.query(sql,function(err, value){
            if (err) {
                d.reject(err);
            } else {
                d.resolve(value.affectedRows);
            }
    });

   });

    return d.promise;
}