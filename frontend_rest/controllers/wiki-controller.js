var genericCrudService = require('../../backend/services/generic/generic-crud-service');
var genericCrudController = require('./generic-crud-controller');

var mongoose = require('mongoose');

// Mongoose models.
var WikiCategory = mongoose.model('WikiCategory');

//
// Articles.
//

/**
 * The after article creation method.
 */
module.exports.afterCreateArticle = function(req, res, element, nextCallback) {
  // Let's call the generic method.
  genericCrudController.updateParentElement(req, res, element,
    'category', WikiCategory, 'articlesIds', 'add', nextCallback);
}

//
// Categories.
//

/**
 * The after category creation method.
 */
module.exports.afterCreateCategory = function(req, res, element, nextCallback) {
  // Let's call the generic method.
  genericCrudController.updateParentElement(req, res, element,
    'parentCategory', WikiCategory, 'childrenCategories', 'add', nextCallback);
}


/**
 * The before category update method.
 */
module.exports.beforeUpdateCategory = function(req, res, elementId, nextCallback) {
  // Let's call the generic method.
  genericCrudController.updateParentElementFromId(req, res, elementId, WikiCategory,
    'parentCategory', WikiCategory, 'childrenCategories', 'remove', nextCallback);
}

/**
 * The after category update method.
 */
module.exports.afterUpdateCategory = function(req, res, element, nextCallback) {
  // Let's call the generic method.
  genericCrudController.updateParentElement(req, res, element,
    'parentCategory', WikiCategory, 'childrenCategories', 'add', nextCallback);
}
