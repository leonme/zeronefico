/**
 * Created by Leon on 2016/12/21.
 */
var express = require('express');
var router = express.Router();

var settlementDao = require('../dao/settlementDao');

router.post('/add', function(req, res, next) {
    settlementDao.add(req, res, next);
});

router.get('/queryById', function(req, res, next) {
    settlementDao.queryById(req, res, next);
});

router.get('/delete', function(req, res, next) {
    settlementDao.delete(req, res, next);
});

router.post('/updateStatus', function(req, res, next) {
    settlementDao.updateStatus(req, res, next);
});

module.exports = router;