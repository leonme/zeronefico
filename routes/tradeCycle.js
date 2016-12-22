/**
 * Created by Leon on 2016/12/21.
 */
var express = require('express');
var router = express.Router();

var tradeCycleDao = require('../dao/tradeCycleDao');

router.post('/add', function(req, res, next) {
    tradeCycleDao.add(req, res, next);
});

router.get('/queryById', function(req, res, next) {
    tradeCycleDao.queryById(req, res, next);
});

router.get('/delete', function(req, res, next) {
    tradeCycleDao.delete(req, res, next);
});

router.post('/updateEndDate', function(req, res, next) {
    tradeCycleDao.updateEndDate(req, res, next);
});

router.post('/updateStatus', function(req, res, next) {
    tradeCycleDao.updateStatus(req, res, next);
});

module.exports = router;