var express = require('express');
var router = express.Router();
let kw = require('../kw');

/* GET home page. */
router.get('/',kw.mostarPantalla);
router.post('/',kw.calcularKW);

module.exports = router;
