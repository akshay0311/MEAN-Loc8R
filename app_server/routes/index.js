var express = require('express');
var ctrlLocations = require("../controllers/locations");
var ctrlOthers = require("../controllers/others"); 

var router = express.Router();

/* GET home page. */
router.get('/',ctrlLocations.home );
/* GET location page. */
router.get('/location',ctrlLocations.location );
/* GET review page. */
router.get('/location/review/new',ctrlLocations.review );
/* GET about page. */
router.get('/about',ctrlOthers.about );

module.exports = router;
