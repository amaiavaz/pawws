var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers');

router.get('/', indexControllers.renderHome);

router.get('/about', indexControllers.renderAbout);

module.exports = router;
