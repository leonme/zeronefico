/**
 * Created by Leon on 2016/12/21.
 */
var express = require('express');
var router = express.Router();

var budgetBalanceDao = require('../dao/budgetBalanceDao');

router.post('/add', function(req, res, next) {
    budgetBalanceDao.add(req, res, next);
});

router.get('/queryById', function(req, res, next) {
    budgetBalanceDao.queryById(req, res, next);
});

router.get('/delete', function(req, res, next) {
    budgetBalanceDao.delete(req, res, next);
});

router.post('/update', function(req, res, next) {
    budgetBalanceDao.update(req, res, next);
});

module.exports = router;