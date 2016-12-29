var mongoose = require('mongoose');

var Menu = mongoose.model('Menu');

/**
 * Service to build data.
 */
module.exports.extractDataDisplay = function(parameters, fn) {
  menuId = parameters.id;

  // Let's start by searching the correct WikiCategory.
  Menu.findById(menuId, function(err, menu) {
    // Handle errors or empty response.
    if (! menu) {
      fn([]);
      return;
    } else if (err) {
      fn(null, err);
      return;
    }

    // Let's intrduce an id on every item, they will be used
    // at display time.
    idGenerator = function(itemsArray, indexString) {
      for(var i=0; i<itemsArray.length; i++) {
        currItem = itemsArray[i];
        newIndexString = indexString + '_' + i;
        currItem.id = newIndexString;
        if (currItem.items) {
          idGenerator(currItem.items, newIndexString);
        }
      }
    }
    idGenerator(menu.items, menu.name);

    // Execute the function given as parameter.
    fn(menu);
  }).lean();
}
