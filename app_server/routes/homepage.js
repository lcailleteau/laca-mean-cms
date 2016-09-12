var express = require('express');
var router = express.Router();
var controllerHomepage = require('../controllers/homepage');

/* Let's register all routes for our component. */
router.get('/', controllerHomepage.homepage);

// router.get('/location', ctrlLocations.locationInfo);
// router.get('/location/review/new', ctrlLocations.addReview);

/* Other pages */
// router.get('/about', ctrlOthers.about);

module.exports = router;
