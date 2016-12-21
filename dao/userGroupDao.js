/**
 * Created by Leon on 2016/12/21.
 */
// dao/userGroupDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var sql = {
    insert:'INSERT INTO USER_GROUP(name, admin_user_id, budget, threshold) VALUES(?,?,?,?)',
    update:'UPDATE USER_GROUP SET name=?, admin_user_id=?, budget=?, threshold=? WHERE id=?',
    delete: 'DELETE FROM USER_GROUP where id=?',
    queryByName: 'SELECT * FROM USER_GROUP WHERE name=?'
};
// 使用连接池，提升性能
var pool = mysql.createPool( $conf.mysql );
var $utils = require('../util/utils');
module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;

            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query(sql.insert, [param.name, param.admin_user_id, param.budget, param.threshold],
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
        if(param.name == null || param.admin_user_id == null || param.budget == null || param.threshold == null) {
            $utils.jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query(sql.update, [param.name, param.admin_user_id, param.budget, param.threshold, param.id], function(err, result) {
                // 使用页面进行跳转提示
                if(result.affectedRows > 0) {
                    $utils.jsonWrite(res, result);
                    //res.render('suc', {
                    //    result: result
                    //}); // 第二个参数可以直接在jade中使用
                } else {
                    $utils.jsonWrite(res, undefined);
                    //res.render('fail',  {
                    //    result: result
                    //});
                }

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
    }
};
