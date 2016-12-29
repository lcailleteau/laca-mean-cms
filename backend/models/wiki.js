var mongoose = require('mongoose');

// WIKI COMPONENT.

var metadataDisplaySchema = new mongoose.Schema({
  pageModelId: mongoose.Schema.ObjectId
});

// Article schema.
var reviewSchema = new mongoose.Schema({
  author: String,
  rating: {
    type: Number,
    required: false,
    min: 0,
    max: 10
  },
  reviewText: String,
  createdOn: {
    type: Date,
    "default": Date.now
  }
});

var articleSchema = new mongoose.Schema({
  metadataDisplay: metadataDisplaySchema,
  siteSlug: {type: String, required: true},
  slug: {type: String, required: true},
  title: String,
  htmlContent : String,
  author: String,
  category: mongoose.Schema.ObjectId,
  createdOn: {
    type: Date,
    "default": Date.now
  },
  reviews: [reviewSchema]
});

// Category schema.
var categorySchema = new mongoose.Schema({
  metadataDisplay: metadataDisplaySchema,
  siteSlug: {type: String, required: true},
  slug: {type: String, required: true},
  name: String,
  description : String,
  parentCategory: mongoose.Schema.ObjectId,
  childrenCategories: [mongoose.Schema.ObjectId],
  articlesIds: [mongoose.Schema.ObjectId]
});

// All component models.
mongoose.model('WikiArticle', articleSchema, 'wiki_articles');
mongoose.model('WikiCategory', categorySchema, 'wiki_categories');
