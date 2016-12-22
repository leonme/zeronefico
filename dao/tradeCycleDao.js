/**
 * Created by Leon on 2016/12/21.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $utils = require('../util/utils');
var pool = mysql.createPool( $conf.mysql );
var sql = {
    insert:'INSERT INTO TRADE_CYCLE(user_group_id, trade_cycle_no, start_date, end_date, state) VALUES(?,?,?,?,?)',
    updateStatus:'UPDATE TRADE_CYCLE SET state=? WHERE id=?',
    updateEndDate:'UPDATE TRADE_CYCLE SET end_date=? WHERE id=?',
    delete: 'DELETE FROM TRADE_CYCLE WHERE id=?',
    queryById: 'SELECT * FROM TRADE_CYCLE WHERE id=?'
};
module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;

            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query(sql.insert, [param.user_group_id, param.trade_cycle_no, param.start_date, param.end_date, param.state],
                function(err, result) {
                    if(result) {
                        result = {
                            code: 200,
                            msg:'增加交易周期成功'
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
                        msg:'删除交易周期成功'
                    };
                } else {
                    result = void 0;
                }
                $utils.jsonWrite(res, result);
                connection.release();
            });
        });
    },
    updateStatus: function (req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        var param = req.body;
        if(param.id == null) {
            $utils.jsonWrite(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query(sql.updateStatus, [param.state, param.id], function(err, result) {
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
    updateEndDate: function (req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        var param = req.body;
        if(param.id == null) {
            $utils.jsonWrite(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query(sql.updateEndDate, [param.end_date, param.id], function(err, result) {
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

