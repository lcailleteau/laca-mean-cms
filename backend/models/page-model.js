var mongoose = require('mongoose');

// PAGE MODEL.

// PageModel schema.
var pageModelSchema = new mongoose.Schema({
  siteSlug: {type: String, required: true},
  name: String,
  template: String,
  templatePage: String
  // placeHolders: [...],
  }, {strict: false});

// All component models.
mongoose.model('PageModel', pageModelSchema, 'pagemodels');

/*
// Element schema.
var elementSchema = new mongoose.Schema({
  componentType: String,
  elementId: mongoose.Schema.ObjectId,
  templateFlavour: String
  // data: the real component data denormalized here.
  // We try to keep normalize for now...
// }, {strict: false});
});

// Page schema.
var pageSchema = new mongoose.Schema({
  placeHolder: String,
  elements: [elementSchema]
});

// PageModel schema.
var pageModelSchema = new mongoose.Schema({
  siteSlug: {type: String, required: true},
  name: String,
  template: String,
  templatePage: String,
  pages: [pageSchema],
});

// All component models.
mongoose.model('PageModel', pageModelSchema, 'pagemodels');
*/
