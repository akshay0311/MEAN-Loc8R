// contain all the api routes

var express = require('express');
var router = express.Router();
/*Including controlller files*/
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

/*Routes for locations api*/
router.get('/locations',ctrlLocations.listLocations);
router.post('/locations',ctrlLocations.newLocation);
router.get('/locations/lid',ctrlLocations.readLocation);
router.put('/locations/lid',ctrlLocations.updateLocation);
router.delete('/locations/lid',ctrlLocations.delLocation);

/* Routes for reviews api*/
router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid',
ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid',
ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid',
ctrlReviews.reviewsDeleteOne);


module.exports = router;