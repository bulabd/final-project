var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let testObj = {
    key1: "one",
    key2: "two",
    key3: "three",
    key4: "four"
  };
  res.json(testObj)
});

module.exports = router;
