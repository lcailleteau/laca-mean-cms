var express = require('express');
var router = express.Router();

// Requires the services.
var displayRendererService = require('../../backend/services/generic/display-renderer-service');
var homepageService = require('../../backend/services/components/homepage-service');
var wikiService = require('../../backend/services/components/wiki-service');
var menuService = require('../../backend/services/components/menu-service');

// Requires the controllers.
var controllerDisplay = require('../controllers/display');
//var controllerAdmin = require('../controllers/admin');
/*
var controllerSuperadmin = require('../controllers/superadmin');

var controllerHomepage = require('../controllers/homepage');
var controllerWiki = require('../controllers/wiki');
*/

// Let's register all components display data here.
displayRendererService.registerDisplayRenderer('homepage', homepageService.extractDataDisplay);
displayRendererService.registerDisplayRenderer('wiki_category', wikiService.extractDataDisplayCategory);
displayRendererService.registerDisplayRenderer('menu', menuService.extractDataDisplay);


//displayRendererService.registerDisplayRenderer('wiki_category', homepageService.extractDataDisplayRenderer);

// Superadmin.
//router.get('/admin', controllerSuperadmin.superadmin);

// "Super" homepage.
//router.get('/', controllerHomepage.superhomepage);

// Admin.
//router.get('/:site/admin', controllerAdmin.admin);

// Homepage.
router.get('/:site', controllerDisplay.display('homepage', 'homepage/index'));

// Wiki.
router.get('/:site/wiki/category/:slug', controllerDisplay.display('wiki_category', 'wiki/category'));

//router.get('/:site', controllerDisplay.display('homepage/index', homepageService.extractDataDisplay));


// Exports the router.
module.exports = router;
