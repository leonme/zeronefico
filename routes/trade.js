/**
 * Created by Leon on 2016/12/21.
 */
var express = require('express');
var router = express.Router();

var tradeDao = require('../dao/tradeDao');

router.post('/create', function(req, res, next) {
    tradeDao.add(req, res, next);
});

router.get('/queryByUser', function(req, res, next) {
    tradeDao.queryByUser(req, res, next);
});

router.get('/queryByUserGroup', function(req, res, next) {
    tradeDao.queryByUserGroup(req, res, next);
});

router.get('/delete', function(req, res, next) {
    tradeDao.delete(req, res, next);
});

router.post('/update', function(req, res, next) {
    tradeDao.update(req, res, next);
});

module.exports = router;