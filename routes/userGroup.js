/**
 * Created by Leon on 2016/12/21.
 */
var express = require('express');
var router = express.Router();

var userGroupDao = require('../dao/userGroupDao');

router.post('/create', function(req, res, next) {
    userGroupDao.add(req, res, next);
});

router.get('/query', function(req, res, next) {
    userGroupDao.queryByName(req, res, next);
});

router.get('/delete', function(req, res, next) {
    userGroupDao.delete(req, res, next);
});

router.post('/update', function(req, res, next) {
    userGroupDao.update(req, res, next);
});

module.exports = router;