var mongoose = require('mongoose');

// MENU COMPONENT.

// Menu schema.
/*
var menuItemSchema = new mongoose.Schema({
  label: String,
  // parent: Schema.ObjectId,
  // children: [Schema.ObjectId],
  anchor: String,
  // order: Number,
  published: Boolean,
  type: String,
  icon: String
});
*/
/*
var menuSchema = new mongoose.Schema({
  siteSlug: String,
  title: String,
  description : String,
  items: [menuItemSchema],
  published: Boolean
});

*/

var menuSchema = new mongoose.Schema({
  siteSlug: {type: String, required: true},
  title: String,
  name: String,
  description : String,
  published: Boolean
  // items: [menuItemSchema],
}, {strict: false});

// All component models.
mongoose.model('Menu', menuSchema, 'menu_list');
