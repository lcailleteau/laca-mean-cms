/**
 * List all elements.
 */
module.exports.list = function(MongooseModel, fn, query, projection) {
  if (! projection) { projection = {}};
  MongooseModel.find(query, function(err, elements) {
    // Handle errors or empty response.
    if (! elements) {
      fn([]);
      return;
    } else if (err) {
      fn(null, err);
      return;
    }

    // We have a full list.
    fn(elements);
  }).select(projection);
}

/**
 * Create an element.
 */
module.exports.create = function(MongooseModel, elementDetail, fn) {
  // Stores the element.
  MongooseModel.create(elementDetail, function(err, element) {
    if (err) {
      fn(null, err);
      return;
    }
    fn(element);
  });
};

/**
 * Delete an element.
 */
module.exports.delete = function(MongooseModel, elementId, fn) {
  MongooseModel.findByIdAndRemove(elementId, function(err, element) {
    if (err) {
      fn(element, err);
      return;
    }
    fn(element);
  });
};

/**
 * Update an element.
 */
 module.exports.update = function(MongooseModel, elementId, elementDetail, fn) {
   MongooseModel.findById(elementId, function(err, element) {
     if (err) {
       fn(element, err);
       return;
     }
     mergeJavascriptObjects(element, elementDetail);
     element.save(function(err, element) {
       if (err) {
         fn(element, err);
         return;
       }
       fn(element);
     });
   });
 };

/**
 * Private method to merge Javascript objects.
 */
var mergeJavascriptObjects = function(destination, source) {
  for (var attrname in source) {
    destination.set(attrname, source[attrname]);
  }
}
