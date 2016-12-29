var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Import models.
var Site = mongoose.model('Site');
var User = mongoose.model('User');
var Template = mongoose.model('Template');
var PageModel = mongoose.model('PageModel');
var Homepage = mongoose.model('Homepage');
var Menu = mongoose.model('Menu');
var HtmlFragment = mongoose.model('HtmlFragment');
var WikiArticle = mongoose.model('WikiArticle');
var WikiCategory = mongoose.model('WikiCategory');

// Define useful functions.
var siteSlugRequestFunction = function(reqParams) { return {siteSlug: reqParams.site}};
var idRequestFunction = function(reqParams) { return {_id: reqParams.id}};

// Imports controllers.
var authenticationController = require('../controllers/authentication-controller');
var genericCrudController = require('../controllers/generic-crud-controller');
var wikiController = require('../controllers/wiki-controller');

// Declare routes.
// Authentication.
router.post('/authenticate', authenticationController.authenticate);

// Site.
// router.get('/sites', genericCrudController.list(Site, {type: "superadmin", siteSlug: ""}));
// router.get('/sites', genericCrudController.list(Site, {type: "superadmin"}));
router.get('/sites', genericCrudController.list(Site));
// router.post('/sites', genericCrudController.create(Site));
router.post('/sites', genericCrudController.create(Site, [{type: "superadmin"}]));
// router.delete('/sites/:id', genericCrudController.delete(Site));
router.delete('/sites/:id', genericCrudController.delete(Site, [{type: "superadmin"}]));

// User.
// router.get('/users', genericCrudController.list(User));
router.get('/users', genericCrudController.list(User));
router.post('/users', genericCrudController.create(User));
router.delete('/users/:id', genericCrudController.delete(User));

// Template.
router.get('/templates', genericCrudController.list(Template, [{type: "superadmin"}, {type: "admin"}]));
router.post('/templates', genericCrudController.create(Template));
router.delete('/templates/:id', genericCrudController.delete(Template));

// Page model.
router.get('/:site/page-models', genericCrudController.list(PageModel, [{type: "reader"}]));
router.post('/:site/page-models', genericCrudController.create(PageModel));
router.delete('/:site/page-models/:id', genericCrudController.delete(PageModel));

// Homepage.
router.get('/:site/homepages', genericCrudController.list(Homepage));
router.post('/:site/homepages', genericCrudController.create(Homepage));
router.delete('/:site/homepages/:id', genericCrudController.delete(Homepage));

// Menu.
router.get('/:site/menus', genericCrudController.list(Menu, null, siteSlugRequestFunction));
// router.get('/:site/menus', genericCrudController.list(Menu, function(reqParams) { return {siteSlug: reqParams.site}}));
// router.get('/menus', genericCrudController.list(Menu));
router.post('/:site/menus', genericCrudController.create(Menu));
router.delete('/:site/menus/:id', genericCrudController.delete(Menu));
router.put('/:site/menus/:id', genericCrudController.update(Menu));

// Html fragment.
router.get('/:site/html-fragments', genericCrudController.list(HtmlFragment));
router.post('/:site/html-fragments', genericCrudController.create(HtmlFragment));
router.delete('/:site/html-fragments/:id', genericCrudController.delete(HtmlFragment));

// Wiki.
router.get('/:site/wiki-articles', genericCrudController.list(WikiArticle, [{type: "superadmin"}, {type: "admin"}], siteSlugRequestFunction, {htmlContent: 0}));
router.get('/:site/wiki-articles-full', genericCrudController.list(WikiArticle, [{type: "superadmin"}, {type: "admin"}], siteSlugRequestFunction));
router.get('/:site/wiki-articles/:id', genericCrudController.list(WikiArticle, [{type: "superadmin"}, {type: "admin"}], idRequestFunction));
router.post('/:site/wiki-articles', genericCrudController.create(WikiArticle, [{type: "superadmin"}, {type: "admin"}], wikiController.afterCreateArticle));
// router.delete('/:site/wiki-articles/:id', genericCrudController.delete(WikiArticle, [{type: "superadmin"}, {type: "admin"}]));

router.get('/:site/wiki-categories', genericCrudController.list(WikiCategory, [{type: "superadmin"}, {type: "admin"}], siteSlugRequestFunction));
router.get('/:site/wiki-categories/:id', genericCrudController.list(WikiCategory, [{type: "superadmin"}, {type: "admin"}], idRequestFunction));
router.post('/:site/wiki-categories', genericCrudController.create(WikiCategory, [{type: "superadmin"}, {type: "admin"}], wikiController.afterCreateCategory));
// router.delete('/:site/wiki-categories/:id', genericCrudController.delete(WikiCategory, [{type: "superadmin"}, {type: "admin"}]));
router.put('/:site/wiki-categories/:id', genericCrudController.update(WikiCategory, [{type: "superadmin"}, {type: "admin"}], wikiController.beforeUpdateCategory, wikiController.afterUpdateCategory));

// Exports the router.
module.exports = router;
