var mongoose = require('mongoose');

// HTML FRAGMENT COMPONENT.

var htmlFragmentSchema = new mongoose.Schema({
  siteSlug: {type: String, required: true},
  title: String,
  description : String,
  published: Boolean,
  htmlContent: String
});

// All component models.
mongoose.model('HtmlFragment', htmlFragmentSchema, 'htmlfragment');
