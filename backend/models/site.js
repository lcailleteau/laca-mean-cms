var mongoose = require('mongoose');

// SITE.

// Site schema.
var siteSchema = new mongoose.Schema({
  slug: {type: String, required: true},
  title: String,
  description: String,
  defaultSite: Boolean,
  createdOn: {
    type: Date,
    "default": Date.now
  }
});

// All models.
mongoose.model('Site', siteSchema, 'sites');
