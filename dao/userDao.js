/**
 * Created by Leon on 2016/12/20.
 */
// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $utils = require('../util/utils');
var sql = {
    insert:'INSERT INTO USER(name, user_group_id, password, nickname, age, sex, phone, email, idCardNo, state) VALUES(?,?,?,?,?,?,?,?,?,?)',
    update:'UPDATE USER SET name=?, age=?, nickName=?, sex=?, phone=?, email=?, idCardNo=? WHERE id=?',
    delete: 'DELETE FROM USER where id=?',
    queryById: 'SELECT * FROM USER WHERE id=?',
    queryByName: 'SELECT * FROM USER WHERE name=?',
    queryAll: 'SELECT * FROM USER'
};
// 使用连接池，提升性能
var pool = mysql.createPool( $conf.mysql );

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query(sql.insert, [param.name, param.userGroupId, param.password, param.nickname, param.age, param.sex, param.phone, param.email, param.idCardNo, param.state],
                function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };
                }

                // 以json形式，把操作结果返回给前台页面
                $utils.jsonWrite(res, result);

                // 释放连接
                connection.release();
            });
        });
    },
    delete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var id = +req.query.id;
            connection.query(sql.delete, id, function(err, result) {
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = void 0;
                }
                $utils.jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function (req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        var param = req.body;
        if(param.name == null || param.age == null || param.id == null) {
            $utils.jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query(sql.update, [param.name, param.age, param.nickName, param.sex, param.phone, param.email, param.idCardNo, +param.id], function(err, result) {
                // 使用页面进行跳转提示
                if(result.affectedRows > 0) {
                    res.render('suc', {
                        result: result
                    }); // 第二个参数可以直接在jade中使用
                } else {
                    res.render('fail',  {
                        result: result
                    });
                }
                $utils.jsonWrite(res, result);
                connection.release();
            });
        });

    },
    queryById: function (req, res, next) {
        var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryById, id, function(err, result) {
                $utils.jsonWrite(res, result);
                connection.release();

            });
        });
    },
    queryByName: function (req, res, next) {
        var name = req.query.name; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryByName, name, function(err, result) {
                $utils.jsonWrite(res, result);
                connection.release();

            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryAll, function(err, result) {
                $utils.jsonWrite(res, result);
                connection.release();
            });
        });
    }
};
