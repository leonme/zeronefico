/**
 * Created by Leon on 2016/12/20.
 */
// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    insert:'INSERT INTO USER(name, user_group_id, password, nickname, age, sex, phone, email, idCardNo, state) VALUES(?,?,?,?,?,?,?,?,?,?)',
    update:'UPDATE USER SET name=?, age=?, nickName=?, sex=?, phone=?, email=?, idCardNo=? WHERE id=?',
    delete: 'DELETE FROM USER where id=?',
    queryById: 'SELECT * FROM USER WHERE id=?',
    queryAll: 'SELECT * FROM USER'
};

module.exports = user;