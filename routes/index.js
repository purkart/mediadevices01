var express = require('express');
var router = express.Router();

router.use(require('./cart'));
router.use(require('./signup'));
router.use(require('./login'));
router.use(require('./share'));
router.use(require('./shop'));

module.exports = router;
