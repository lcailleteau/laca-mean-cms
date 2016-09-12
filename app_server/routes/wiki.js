var express = require('express');
var router = express.Router();
var controllerWiki = require('../controllers/wiki');

/* Let's register all routes for our component. */
router.get('/categorylist/:sku', controllerWiki.categoryList);

// router.get('/location', ctrlLocations.locationInfo);
// router.get('/location/review/new', ctrlLocations.addReview);

/* Other pages */
// router.get('/about', ctrlOthers.about);

module.exports = router;
