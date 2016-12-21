/**
 * Created by Leon on 2016/12/21.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $utils = require('../util/utils');
var pool = mysql.createPool( $conf.mysql );
var sql = {
    insert:'INSERT INTO TRADE(user_group_id, user_id, tradeCycleNo, date, itemName, cost, comments) VALUES(?,?,?,?,?,?,?)',
    update:'UPDATE TRADE SET user_group_id=?, user_id=?, tradeCycleNo=?, date=?, itemName=?, cost=?, comments=? WHERE id=?',
    delete: 'DELETE FROM TRADE WHERE id=?',
    queryByUser: 'SELECT * FROM TRADE WHERE user_id=? AND user_group_id=?',
    queryByUserGroup: 'SELECT * FROM TRADE WHERE user_group_id=?'
};
module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;

            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query(sql.insert, [param.user_group_id, param.user_id, param.tradeCycleNo, param.date, param.itemName, param.cost, param.comments],
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
        if(param.id == null) {
            $utils.jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query(sql.update, [param.user_group_id, param.user_id, param.tradeCycleNo, param.date, param.itemName, param.cost, param.comments, param.id], function(err, result) {
                // 使用页面进行跳转提示
                if(result.affectedRows > 0) {
                    result = {
                        code:'1',
                        msg: '更新交易记录成功'
                    };
                    $utils.jsonWrite(res, result);
                } else {
                    result = {
                        code:'0',
                        msg: '更新交易记录失败'
                    };
                    $utils.jsonWrite(res, result);
                }
                connection.release();
            });
        });

    },
    queryByUser: function (req, res, next) {
        var user_id = +req.query.user_id; // 为了拼凑正确的sql语句，这里要转下整数
        var user_group_id = +req.query.user_group_id;
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryByUser, [user_id,user_group_id], function(err, result) {
                $utils.jsonWrite(res, result);
                connection.release();

            });
        });
    },
    queryByUserGroup: function (req, res, next) {
        var user_group_id = req.query.user_group_id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryByUserGroup, user_group_id, function(err, result) {
                $utils.jsonWrite(res, result);
                connection.release();

            });
        });
    }
};

