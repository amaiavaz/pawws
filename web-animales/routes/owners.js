var express = require('express');
var router = express.Router();
const ownersControllers = require('../controllers/ownersControllers');
const uploadImage = require('../middlewares/uploadImage');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', ownersControllers.renderSignup);

router.post('/signup', ownersControllers.signup);

router.get('/login', ownersControllers.renderLogin);

router.post('/login', ownersControllers.login);

router.get('/oneOwnerLogin/:id', ownersControllers.oneOwnerLogin);

router.get('/oneOwner/:id', ownersControllers.oneOwner);

router.get('/edit/:id', ownersControllers.renderEdit);

router.post('/edit/:id', uploadImage("owners"), ownersControllers.edit);

module.exports = router;
