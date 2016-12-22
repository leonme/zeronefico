/**
 * Created by Leon on 2016/12/22.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $utils = require('../util/utils');
var pool = mysql.createPool( $conf.mysql );
var sql = {
    insert:'INSERT INTO BUDGET_BALANCE(user_group_id, date, balance) VALUES(?,?,?)',
    update:'UPDATE BUDGET_BALANCE SET user_group_id=?, date=?, balance=? WHERE id=?',
    delete: 'DELETE FROM BUDGET_BALANCE WHERE id=?',
    queryById: 'SELECT * FROM BUDGET_BALANCE WHERE id=?'
};
module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;

            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query(sql.insert, [param.user_group_id, param.date, param.balance],
                function(err, result) {
                    if(result) {
                        result = {
                            code: 200,
                            msg:'增加余额成功'
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
                        msg:'删除余额成功'
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
        if(param.id == null) {
            $utils.jsonWrite(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query(sql.update, [param.user_group_id, param.date, param.balance, param.id], function(err, result) {
                // 使用页面进行跳转提示
                if(result.affectedRows > 0) {
                    result = {
                        code:'1',
                        msg: '更新余额成功'
                    };
                    $utils.jsonWrite(res, result);
                } else {
                    result = {
                        code:'0',
                        msg: '更新余额失败'
                    };
                    $utils.jsonWrite(res, result);
                }
                connection.release();
            });
        });

    },
    queryById: function (req, res, next) {
        var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryById, id, function (err, result) {
                $utils.jsonWrite(res, result);
                connection.release();
            });
        });
    }
};

