import express from 'express';
const router = express.Router();

/* GET author page. */
//eslint-disable-next-line no-unused-vars 
router.get('/', function (req, res, next) {
    res.render('author', {
        title: 'Este es mi proyecto',
        author: '👤 Guzman Moran Aaron Antonio',
        email: '📧 aaronmoran20148@gmail.com',
        photo: '/images/fotoo.jpg'
    });
});


export default router;