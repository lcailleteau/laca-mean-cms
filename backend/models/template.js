var mongoose = require('mongoose');

// TEMPLATE.

// Pages schema.
var pagesSchema = new mongoose.Schema({
  pageName: String,
  description: String,
  placeHolders: [String]
});

// Flavours schema.
var flavoursSchema = new mongoose.Schema({
  componentType: String,
  componentFlavours: [String]
});

// Template schema.
var templateSchema = new mongoose.Schema({
  templateName: {type: String, required: true},
  description: String,
  pages: [pagesSchema],
  flavours: [flavoursSchema]
});

// All component models.
mongoose.model('Template', templateSchema, 'templates');
