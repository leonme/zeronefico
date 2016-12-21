/**
 * Created by Leon on 2016/12/21.
 */

module.exports={
    // 向前台返回JSON方法的简单封装
    jsonWrite: function (res, ret) {
        if(typeof ret === 'undefined') {
            res.json({
                code:'1',
                msg: '操作失败'
            });
        } else {
            res.json(ret);
        }
    }
};
