/**
 * Created by Leon on 2016/12/20.
 */
// conf/db.js
// MySQL数据库联接配置
module.exports = {
    mysql: {
        host: '101.200.52.240',
        user: 'leon',
        password: 'leonme',
        database:'fico', // 前面建的user表位于这个数据库中
        port: 3306
    }
};