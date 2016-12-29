var mongoose = require('mongoose');

// HOMEPAGE COMPONENT.

// Homepage schema.
var metadataDisplaySchema = new mongoose.Schema({
  pageModelId: mongoose.Schema.ObjectId
});

var homepageSchema = new mongoose.Schema({
  metadataDisplay: metadataDisplaySchema,
  siteSlug: {type: String, required: true, index: { unique: false }},
  defaultHomepage: Boolean,
  title: String,
  htmlFragmentsIds: [mongoose.Schema.ObjectId]
});

// All component models.
mongoose.model('Homepage', homepageSchema, 'homepages');
