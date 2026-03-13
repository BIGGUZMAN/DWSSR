var express = require('express');
var router = express.Router();

/* GET author page. */
router.get('/', function (req, res, next) {
    res.render('author', {
        title: 'Este es mi proyecto',
        author: '👤 Guzman Moran Aaron Antonio',
        email: '📧 aaronmoran20148@gmail.com',
        photo: '/images/fotoo.jpg'
    });
});

module.exports = router;
